import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { conversationId, userMessage, prospectInfo, language } = await req.json();

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Récupérer ou créer le lead
    let leadId = prospectInfo.leadId;
    if (!leadId) {
      const { data: lead, error: leadError } = await supabaseClient
        .from('leads')
        .insert({
          name: prospectInfo.name,
          email: prospectInfo.email,
          company: prospectInfo.company,
          phone: prospectInfo.phone,
          language: detectLanguage(userMessage)
        })
        .select()
        .single();

      if (leadError) throw leadError;
      leadId = lead.id;
    }

    // Récupérer ou créer la conversation
    let conversation;
    if (conversationId) {
      const { data, error } = await supabaseClient
        .from('conversations')
        .select('*')
        .eq('id', conversationId)
        .single();

      if (error) throw error;
      conversation = data;
    } else {
      const { data, error } = await supabaseClient
        .from('conversations')
        .insert({
          lead_id: leadId,
          messages: []
        })
        .select()
        .single();

      if (error) throw error;
      conversation = data;
    }

    // Construire l'historique de conversation
    const messages = conversation.messages || [];
    messages.push({
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString()
    });

    // Préparer le prompt système
    const detectedLanguage = language || detectLanguage(userMessage);
    const identifiedNeed = identifyNeed(messages);
    const phase = Math.min(Math.floor(messages.filter((m: any) => m.role === 'user').length / 2) + 1, 3);

    const systemPrompt = buildSystemPrompt(prospectInfo, detectedLanguage, messages.length, identifiedNeed, phase);

    // Appeler Lovable AI
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Map language codes to full names for clarity
    const languageMap: { [key: string]: string } = {
      'fr': 'FRANÇAIS',
      'en': 'ENGLISH',
      'es': 'ESPAÑOL',
      'ar': 'العربية (ARABIC)'
    };
    const fullLanguageName = languageMap[detectedLanguage.toLowerCase()] || 'FRANÇAIS';

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.slice(-10, -1).map((m: any) => ({ role: m.role, content: m.content })),
          {
            role: 'user',
            content: `${messages[messages.length - 1].content} (IMPORTANT: Réponds UNIQUEMENT en ${fullLanguageName})`
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI Gateway error:', aiResponse.status, errorText);
      throw new Error(`AI Gateway error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const assistantMessage = aiData.choices[0]?.message?.content || 'Désolé, je n\'ai pas pu générer une réponse.';

    // Ajouter la réponse à l'historique
    messages.push({
      role: 'assistant',
      content: assistantMessage,
      timestamp: new Date().toISOString()
    });

    // Mettre à jour la conversation
    const { error: updateError } = await supabaseClient
      .from('conversations')
      .update({
        messages,
        identified_need: identifiedNeed,
        phase,
        updated_at: new Date().toISOString()
      })
      .eq('id', conversation.id);

    if (updateError) throw updateError;

    // Déterminer si on doit collecter les coordonnées
    const shouldCollectContact = messages.filter((m: any) => m.role === 'user').length >= 6 ||
      shouldCollectContactInfo(assistantMessage);

    return new Response(
      JSON.stringify({
        conversationId: conversation.id,
        leadId,
        response: assistantMessage,
        shouldCollectContact,
        detectedLanguage,
        phase
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in chat function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

function detectLanguage(text: string): string {
  const frenchWords = ['je', 'vous', 'merci', 'oui', 'non', 'français', 'bonjour', 'problème'];
  const englishWords = ['i', 'you', 'thank', 'yes', 'no', 'english', 'hello', 'problem'];

  const lowerText = text.toLowerCase();
  const frenchCount = frenchWords.filter(word => lowerText.includes(word)).length;
  const englishCount = englishWords.filter(word => lowerText.includes(word)).length;

  return frenchCount > englishCount ? 'FR' : 'EN';
}

function identifyNeed(messages: any[]): string {
  const allText = messages.map(m => m.content).join(' ').toLowerCase();

  const needs: { [key: string]: string[] } = {
    'Patient Management': ['patient', 'médecin', 'généraliste', 'appointment', 'consultation', 'dossier'],
    'E-commerce': ['shop', 'store', 'vendre', 'commerce', 'produit', 'panier'],
    'CRM': ['client', 'customer', 'contact', 'relation', 'commercial'],
    'Business Automation': ['automatis', 'workflow', 'process', 'efficacité', 'temps'],
    'Data Analytics': ['données', 'data', 'analytics', 'report', 'insight'],
  };

  for (const [need, keywords] of Object.entries(needs)) {
    if (keywords.some(kw => allText.includes(kw))) {
      return need;
    }
  }

  return 'Not identified yet';
}

function shouldCollectContactInfo(response: string): boolean {
  const phoneKeywords = ['appel', 'téléphone', 'phone', 'contact', 'coordonnées', 'numéro'];
  const lowerResponse = response.toLowerCase();
  return phoneKeywords.some(kw => lowerResponse.includes(kw));
}

function buildSystemPrompt(prospectInfo: any, language: string, messageCount: number, need: string, phase: number): string {
  // Map language codes to full names for clarity
  const languageMap: { [key: string]: string } = {
    'fr': 'FRANÇAIS',
    'en': 'ENGLISH',
    'es': 'ESPAÑOL',
    'ar': 'العربية (ARABIC)'
  };

  const fullLanguageName = languageMap[language.toLowerCase()] || 'FRANÇAIS';

  return `⚠️ RÈGLE ABSOLUE: Tu DOIS répondre UNIQUEMENT en ${fullLanguageName}. JAMAIS en anglais si le prospect parle ${fullLanguageName}. ⚠️

Tu es un assistant commercial expert d'OKA Tech, une entreprise spécialisée en solutions IA et développement logiciel depuis 6+ ans.

RÔLES: Tu es simultanément commercial, chef de projet, et consultant technique expérimenté.

INSTRUCTIONS CRITIQUES (PAR ORDRE DE PRIORITÉ):
1. 🌍 LANGUE: TOUJOURS répondre en ${fullLanguageName} - C'EST LA RÈGLE #1 ABSOLUE
2. 🎭 STYLE: Sois naturel, conversationnel, humain - PAS de robot
3. 🎯 EXPERTISE: Identifie les vrais besoins business derrière les demandes
4. 📊 PROGRESSIF: Pose une seule question majeure à la fois
5. 📞 COMMERCIAL: Guide progressivement vers un appel téléphone

CONTEXTE PROSPECT:
- Nom: ${prospectInfo.name}
- Entreprise: ${prospectInfo.company}
- Téléphone: ${prospectInfo.phone || 'Non fourni'}
- Langue préférée: ${fullLanguageName}

PHASE DE CONVERSATION ACTUELLE:
- Messages précédents: ${messageCount}
- Besoin identifié: ${need}
- Phase: ${phase}

PROCESSUS DE QUALIFICATION:
Phase 1 (0-2 messages): DISCOVERY
  - Comprendre le problème principal
  - Être empathique et curieux
  - Poser des questions ouvertes

Phase 2 (3-5 messages): DEEP DIVE
  - Context technique (infrastructure, outils actuels)
  - Ressources (équipe, budget, timeline)
  - Contraintes et risques

Phase 3 (6+ messages): QUALIFICATION & RECRUTEMENT
  - Confirmer l'alignement avec OKA Tech
  - Proposer un appel découverte
  - Récupérer les coordonnées si manquantes
  - Planifier un suivi

RÉPONSE A DONNER:
- Soit pertinent et concis (2-3 phrases max)
- Propose une valeur ajoutée immédiate
- Pose UNE question engageante
- À partir de 6+ messages, propose un appel téléphone

⚠️ RAPPEL FINAL: Réponds EXCLUSIVEMENT en ${fullLanguageName}. Aucune exception. ⚠️`;
}
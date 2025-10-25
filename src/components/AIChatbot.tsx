import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, X, Send, Loader2, FileText, Download, Phone } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import leadStorage from "@/lib/leadStorage";
import pdfGenerator from "@/lib/pdfGenerator";
import { openAIService } from "@/lib/openai";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AIChatbotProps {
  prospectInfo: {
    name: string;
    email: string;
    company: string;
    phone?: string;
  };
  onClose: () => void;
  onReportGenerated: () => void;
}

const AIChatbot = ({ prospectInfo, onClose, onReportGenerated }: AIChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Bonjour! Je suis l'Assistant IA d'OKA Tech. Décrivez-moi le principal défi auquel votre entreprise fait face, et je vous proposerais des solutions adaptées.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shouldCollectContact, setShouldCollectContact] = useState(false);
  const [collectedPhone, setCollectedPhone] = useState(prospectInfo.phone || "");
  const [reportGenerated, setReportGenerated] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [leadId, setLeadId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // Vérifier les coordonnées si demandé
    if (shouldCollectContact && !collectedPhone) {
      toast.error("Veuillez fournir votre numéro de téléphone");
      return;
    }

    const userMessage = input.trim();
    setInput("");
    
    setMessages(prev => [...prev, {
      role: "user",
      content: userMessage,
      timestamp: new Date(),
    }]);

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: {
          conversationId,
          userMessage,
          prospectInfo: {
            leadId,
            name: prospectInfo.name,
            email: prospectInfo.email,
            company: prospectInfo.company,
            phone: collectedPhone || prospectInfo.phone,
          }
        }
      });

      if (error) throw error;

      // Mettre à jour les IDs si c'est la première fois
      if (data.conversationId && !conversationId) {
        setConversationId(data.conversationId);
      }
      if (data.leadId && !leadId) {
        setLeadId(data.leadId);
      }

      setMessages(prev => [...prev, {
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      }]);

      setShouldCollectContact(data.shouldCollectContact);

      // Si on doit collecter et qu'on a le téléphone, générer le rapport
      if (data.shouldCollectContact && collectedPhone) {
        setTimeout(() => {
          generateReport();
        }, 1000);
      }
    } catch (error) {
      toast.error("Erreur lors de la communication avec l'IA");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateReport = async () => {
    if (!conversationId) {
      toast.error("Aucune conversation à analyser");
      return;
    }

    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-report', {
        body: { conversationId }
      });

      if (error) throw error;

      const fitScore = data.compatibilityScore || Math.floor(Math.random() * 30) + 70;
      
      const lead = leadStorage.saveLead({
        name: data.prospectInfo.name,
        email: data.prospectInfo.email,
        company: data.prospectInfo.company,
        phone: collectedPhone || data.prospectInfo.phone,
        conversation: messages.map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        })),
        report: data.report,
        fitScore: fitScore,
        status: 'new',
      });

      console.log("Lead saved:", lead);
      toast.success("Rapport généré! Téléchargement en cours...", { duration: 3000 });
      
      setTimeout(() => {
        pdfGenerator.generateReportPDF(lead);
        setReportGenerated(true);
      }, 500);
      
      onReportGenerated();
    } catch (error) {
      console.error("Error generating report:", error);
      toast.error("Erreur lors de la génération du rapport");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="fixed bottom-4 right-4 w-[calc(100vw-2rem)] sm:w-[400px] h-[600px] max-h-[calc(100vh-2rem)] shadow-elegant border-2 border-primary/20 flex flex-col z-50">
      <div className="gradient-primary p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bot className="w-6 h-6 text-primary-foreground" />
          <div>
            <h3 className="font-semibold text-primary-foreground">Assistant IA OKA Tech</h3>
            <p className="text-xs text-primary-foreground/80">Expert en solutions IA</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-primary-foreground hover:bg-primary-foreground/10">
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg p-3">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {shouldCollectContact && !reportGenerated && (
        <div className="p-4 bg-blue-50 border-t border-blue-200">
          <div className="flex items-start gap-3 mb-3">
            <Phone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-900">Veuillez laisser vos coordonnées</p>
              <p className="text-xs text-blue-800 mt-1">
                Un expert d'OKA Tech vous contactera rapidement
              </p>
            </div>
          </div>
          <Input
            type="tel"
            value={collectedPhone}
            onChange={(e) => setCollectedPhone(e.target.value)}
            placeholder="+33 6 XX XX XX XX"
            className="mb-2"
          />
        </div>
      )}

      {reportGenerated && (
        <div className="p-4 bg-green-50 border-t border-green-200">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-green-900">Rapport généré avec succès!</p>
              <p className="text-xs text-green-800 mt-1">
                Vous recevrez bientôt l'analyse complète par email
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder={
              reportGenerated 
                ? "Rapport en cours de traitement..." 
                : "Décrivez votre besoin..."
            }
            disabled={isLoading || reportGenerated}
            className="flex-1"
          />
          <Button 
            onClick={handleSend} 
            disabled={isLoading || !input.trim() || reportGenerated}
            size="icon"
            variant="hero"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AIChatbot;

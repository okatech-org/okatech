-- Table pour stocker les leads/prospects
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  phone TEXT,
  language TEXT DEFAULT 'FR',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Table pour stocker les conversations
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  identified_need TEXT,
  phase INTEGER DEFAULT 1,
  report TEXT,
  compatibility_score INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index pour les recherches
CREATE INDEX idx_leads_email ON public.leads(email);
CREATE INDEX idx_conversations_lead_id ON public.conversations(lead_id);

-- RLS: Les données sont publiques pour l'instant (chatbot public)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'insertion et la lecture (chatbot public)
CREATE POLICY "Allow public read access to leads" ON public.leads FOR SELECT USING (true);
CREATE POLICY "Allow public insert to leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update to leads" ON public.leads FOR UPDATE USING (true);

CREATE POLICY "Allow public read access to conversations" ON public.conversations FOR SELECT USING (true);
CREATE POLICY "Allow public insert to conversations" ON public.conversations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update to conversations" ON public.conversations FOR UPDATE USING (true);

-- Trigger pour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON public.leads
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON public.conversations
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
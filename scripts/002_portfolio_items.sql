CREATE TABLE IF NOT EXISTS public.portfolio_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "portfolio_items_select_all" ON public.portfolio_items 
  FOR SELECT USING (true);

CREATE POLICY "portfolio_items_insert_all" ON public.portfolio_items 
  FOR INSERT WITH CHECK (true);

CREATE POLICY "portfolio_items_update_all" ON public.portfolio_items 
  FOR UPDATE USING (true);

CREATE POLICY "portfolio_items_delete_all" ON public.portfolio_items 
  FOR DELETE USING (true);

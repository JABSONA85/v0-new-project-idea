-- ARTISAN Studio Database Schema
-- Tables for portfolio, price requests, and pricing

-- Portfolio items table
CREATE TABLE IF NOT EXISTS public.portfolio_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('laminate', 'solidWood', 'granite', 'bedrooms')),
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Price requests table (from calculator)
CREATE TABLE IF NOT EXISTS public.price_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  category TEXT NOT NULL,
  material TEXT NOT NULL,
  width NUMERIC NOT NULL,
  height NUMERIC NOT NULL,
  addons JSONB DEFAULT '[]',
  total_price NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'completed')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Pricing rates table
CREATE TABLE IF NOT EXISTS public.pricing_rates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  material TEXT NOT NULL,
  rate_per_sqm NUMERIC NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(category, material)
);

-- Addon pricing table
CREATE TABLE IF NOT EXISTS public.addon_pricing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_ka TEXT,
  name_en TEXT,
  name_ru TEXT,
  price NUMERIC NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.price_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addon_pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Public read access for portfolio items
CREATE POLICY "portfolio_items_select_all" ON public.portfolio_items 
  FOR SELECT USING (true);

-- Public insert for price requests (customers can submit)
CREATE POLICY "price_requests_insert_all" ON public.price_requests 
  FOR INSERT WITH CHECK (true);

-- Public read for pricing rates
CREATE POLICY "pricing_rates_select_all" ON public.pricing_rates 
  FOR SELECT USING (true);

-- Public read for addon pricing
CREATE POLICY "addon_pricing_select_all" ON public.addon_pricing 
  FOR SELECT USING (true);

-- Public insert for contact messages
CREATE POLICY "contact_messages_insert_all" ON public.contact_messages 
  FOR INSERT WITH CHECK (true);

-- Insert default pricing rates
INSERT INTO public.pricing_rates (category, material, rate_per_sqm) VALUES
  ('laminate', 'standard', 450),
  ('laminate', 'premium', 650),
  ('laminate', 'luxury', 850),
  ('solidWood', 'oak', 1200),
  ('solidWood', 'walnut', 1500),
  ('solidWood', 'cherry', 1350),
  ('granite', 'black', 800),
  ('granite', 'white', 750),
  ('granite', 'gray', 700),
  ('bedrooms', 'standard', 500),
  ('bedrooms', 'premium', 750),
  ('bedrooms', 'luxury', 1000)
ON CONFLICT (category, material) DO NOTHING;

-- Insert default addon pricing
INSERT INTO public.addon_pricing (name, name_ka, name_en, name_ru, price) VALUES
  ('led_lighting', 'LED განათება', 'LED Lighting', 'LED Освещение', 150),
  ('premium_handles', 'პრემიუმ სახელურები', 'Premium Handles', 'Премиум ручки', 200),
  ('soft_close', 'რბილი დახურვა', 'Soft Close', 'Плавное закрывание', 100)
ON CONFLICT DO NOTHING;

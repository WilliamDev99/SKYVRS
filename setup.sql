-- Hapus tabel lama jika ada
DROP TABLE IF EXISTS public.orders;
DROP TABLE IF EXISTS public.products;

-- Buat tabel produk
CREATE TABLE public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  color TEXT NOT NULL,
  category TEXT,
  gradient TEXT NOT NULL,
  hover_gradient TEXT NOT NULL,
  description TEXT NOT NULL,
  top TEXT NOT NULL,
  "left" TEXT NOT NULL,
  mobile_top TEXT NOT NULL,
  mobile_left TEXT NOT NULL,
  width NUMERIC NOT NULL,
  mobile_width NUMERIC NOT NULL,
  depth NUMERIC NOT NULL,
  delay NUMERIC NOT NULL,
  rotate NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Buat tabel pesanan (orders)
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  total_price TEXT NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL,
  items JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Buka akses BACA (READ) untuk publik pada tabel produk (agar website bisa menampilkan produk)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." 
ON public.products FOR SELECT 
USING (true);

-- Buka akses TULIS (INSERT) untuk publik pada tabel orders (agar pembeli bisa checkout)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert an order" 
ON public.orders FOR INSERT 
WITH CHECK (true);

-- Masukkan 18 data produk awal (Initial Seed)
INSERT INTO public.products (id, name, price, color, category, gradient, hover_gradient, description, top, "left", mobile_top, mobile_left, width, mobile_width, depth, delay, rotate) VALUES
('hoodie-lime', 'REVERSE HOODIE / LIME', 'IDR 2,450,000', 'LIME', NULL, 'var(--gradient-lime)', 'var(--gradient-lime)', 'Garment-dyed heavyweight essential. Custom milled fabric with a relaxed, boxy fit. Luminous lime finish.', '5%', '15%', '5%', '10%', 240, 150, 0.5, 1, 0),
('jogger-lime', 'REVERSE JOGGER / LIME', 'IDR 1,890,000', 'LIME', NULL, 'var(--gradient-lime)', 'var(--gradient-lime)', 'Garment-dyed heavyweight essential sweatpants. Custom milled fabric with a relaxed fit.', '13%', '45%', '10%', '50%', 240, 150, 0.5, 1, 0),
('hoodie-black', 'REVERSE HOODIE / CAVE', 'IDR 2,450,000', 'CAVE', NULL, 'var(--gradient-black)', 'var(--gradient-black)', 'Garment-dyed heavyweight essential. Custom milled fabric with a relaxed, boxy fit.', '5%', '75%', '15%', '5%', 240, 150, 0.5, 1, 0),
('beanie-lime', 'BEANIE / LIME', 'IDR 761,000', 'LIME', NULL, 'var(--gradient-lime)', 'var(--gradient-lime)', 'Garment-dyed heavyweight beanie. Custom milled fabric with a snug fit.', '37%', '75%', '45%', '30%', 240, 150, 0.5, 1, 0),
('jogger-iris', 'REVERSE JOGGER / IRIS', 'IDR 1,890,000', 'IRIS', NULL, 'var(--gradient-iris)', 'var(--gradient-iris)', 'Garment-dyed heavyweight essential sweatpants. Custom milled fabric with a relaxed fit. Deep iris purple.', '29%', '45%', '25%', '15%', 240, 150, 0.5, 1, 0),
('denim-jean', 'PLATED DENIM JEAN', 'IDR 3,250,000', 'WASHED', NULL, 'var(--gradient-sky)', 'var(--gradient-sky)', 'Premium plated denim jean with a blanket wash finish.', '21%', '75%', '30%', '45%', 240, 150, 0.5, 1, 0),
('hoodie-pink', 'REVERSE HOODIE / PINK', 'IDR 2,450,000', 'PINK', NULL, 'var(--gradient-pink)', 'var(--gradient-pink)', 'Garment-dyed heavyweight essential. Custom milled fabric with a relaxed, boxy fit. Pink finish.', '37%', '15%', '35%', '10%', 240, 150, 0.5, 1, 0),
('beanie-iris', 'BEANIE / IRIS', 'IDR 761,000', 'IRIS', NULL, 'var(--gradient-iris)', 'var(--gradient-iris)', 'Garment-dyed heavyweight beanie. Custom milled fabric with a snug fit. Deep iris purple.', '45%', '45%', '40%', '55%', 240, 150, 0.5, 1, 0),
('reverse-sweats', 'REVERSE SWEATS / PAPER', 'IDR 1,890,000', 'PAPER', NULL, 'var(--gradient-white)', 'var(--gradient-white)', 'Garment-dyed heavyweight essential sweatpants. Custom milled fabric with a relaxed fit. Paper color.', '21%', '15%', '20%', '60%', 240, 150, 0.5, 1, 0),
('rest-slide-sand', 'REST SLIDE / SAND', 'IDR 1,200,000', 'SAND', NULL, 'var(--gradient-sand)', 'var(--gradient-sand)', 'Comfortable rest slide in Sand.', '53%', '15%', '50%', '15%', 240, 150, 0.5, 1, 0),
('rest-slide-dream', 'REST SLIDE / DREAM', 'IDR 1,200,000', 'DREAM', NULL, 'var(--gradient-sky)', 'var(--gradient-sky)', 'Comfortable rest slide in Dream.', '61%', '45%', '55%', '50%', 240, 150, 0.5, 1, 0),
('rest-slipper-green', 'REST SLIPPER / FRESH GREEN', 'IDR 1,500,000', 'FRESH GREEN', NULL, 'var(--gradient-lime)', 'var(--gradient-lime)', 'Comfortable rest slipper in Fresh Green.', '53%', '75%', '60%', '5%', 240, 150, 0.5, 1, 0),
('rest-slipper-pie', 'REST SLIPPER / PIE', 'IDR 1,500,000', 'PIE', NULL, 'var(--gradient-pie)', 'var(--gradient-pie)', 'Comfortable rest slipper in Pie.', '69%', '15%', '65%', '60%', 240, 150, 0.5, 1, 0),
('rest-slide-onyx', 'REST SLIDE / ONYX', 'IDR 1,200,000', 'ONYX', NULL, 'var(--gradient-grass)', 'var(--gradient-grass)', 'Comfortable rest slide in Onyx.', '77%', '45%', '70%', '15%', 240, 150, 0.5, 1, 0),
('rest-slide-stone', 'REST SLIDE / STONE', 'IDR 1,200,000', 'STONE', NULL, 'var(--gradient-watermelon)', 'var(--gradient-watermelon)', 'Comfortable rest slide in Stone.', '69%', '75%', '75%', '45%', 240, 150, 0.5, 1, 0),
('iphone-17-pro-goo', 'IPHONE 16 PRO CASE / GOO', 'IDR 450,000', 'GOO', 'Case', 'var(--gradient-lime)', 'var(--gradient-lime)', 'Premium protective case for iPhone 17 Pro in GOO colorway. Slim profile with precise cutouts.', '85%', '15%', '80%', '25%', 240, 150, 0.5, 1, 0),
('iphone-16-pro-jelly', 'IPHONE 16 PRO CASE / JELLY', 'IDR 450,000', 'JELLY', 'Case', 'var(--gradient-jelly)', 'var(--gradient-jelly)', 'Premium protective case for iPhone 16 Pro in Jelly colorway. Translucent finish with a soft-touch feel.', '93%', '45%', '85%', '55%', 240, 150, 0.5, 1, 0),
('iphone-16-pro-super-blue', 'IPHONE 16 PRO CASE / SUPER BLUE', 'IDR 450,000', 'SUPER BLUE', 'Case', 'var(--gradient-superblue)', 'var(--gradient-superblue)', 'Premium protective case for iPhone 16 Pro in Super Blue colorway. Bold blue finish with premium grip.', '85%', '75%', '90%', '10%', 240, 150, 0.5, 1, 0);

import hoodieLime from "@/assets/products/hoodie-lime.png";
import hoodieLimeBack from "@/assets/products/REVERSEHOODIE_LIME_BACK.webp";
import hoodieLimeDetail from "@/assets/products/REVERSEHOODIE_LIME_DETAIL.webp";
import joggerLime from "@/assets/products/jogger-lime.png";
import joggerLimeCinchedFront from "@/assets/products/REVERSEJOGGER_LIME_CINCHEDFRONT.webp";
import joggerLimeCinchedBack from "@/assets/products/REVERSEJOGGER_LIME_CINCHEDBACK.webp";
import joggerLimeStraightBack from "@/assets/products/REVERSEJOGGER_LIME_STRAIGHTBACK.webp";
import joggerLimeDetail from "@/assets/products/REVERSEJOGGER_LIME_DETAIL.webp";
import joggerLimeDetailLogo from "@/assets/products/REVERSEJOGGER_LIME_DETAILLOGO.webp";
import hoodieBlack from "@/assets/products/hoodie-black.png";
import beanieLime from "@/assets/products/beanie-lime.png";
import beanieIris from "@/assets/products/beanie-iris.png";
import hoodiePink from "@/assets/products/hoddie-pink.png";
import joggerIris from "@/assets/products/jogger-iris.png";
import denimJean from "@/assets/products/PlatedDenimJean-Blanket Wash.png";
import reverseSweats from "@/assets/products/ReverseSweats-paper.png";
import denimJean2 from "@/assets/products/SLB018-3010-3.webp";
import denimJean3 from "@/assets/products/SLB018-3010-4.webp";
import denimJean4 from "@/assets/products/SLB018-3010-6.webp";
import sweats2 from "@/assets/products/SLB028-0011-2_34316cc0-e66c-4a05-ad10-52b4b7e1d842.webp";
import sweats3 from "@/assets/products/SLB028-0011-3.webp";

import slideSand from "@/assets/products/RestSlide_Sand_Right.webp";
import slideDream from "@/assets/products/Rest_Slide_Dream_Right.webp";
import slipperGreen from "@/assets/products/Rest_Slipper_Fresh_Green_Right_7f002f6b-a39c-4493-a96f-775503a763bc.webp";
import slipperPie from "@/assets/products/Rest_Slipper_Pie_Right_9271afc2-17ab-4aa8-885a-a19336caa57c.webp";
import slide1 from "@/assets/products/46CA72DC-7B4F-49CD-988F-E8420B9102C6.webp";
import slide2 from "@/assets/products/FEF8C1C7-5DE2-4141-9754-2AB8970B93DC.webp";

// iPhone Cases
import iphone17GooBack from "@/assets/products/IPHONE_17_PRO_GOO_BACK_29674_5_jpg.webp";
import iphone17GooDetail from "@/assets/products/IPHONE_17_PRO_GOO_DETAIL_29704_18_jpg.webp";
import iphone17GooDetailTop from "@/assets/products/IPHONE_17_PRO_GOO_DETAIL_TOP_29715_49_jpg.webp";
import iphone17GooFront from "@/assets/products/IPHONE_17_PRO_GOO_FRONT_29673_8_jpg.webp";
import iphone17GooLeft from "@/assets/products/IPHONE_17_PRO_GOO_LEFT_29671_6_jpg.webp";
import iphone17GooRight from "@/assets/products/IPHONE_17_PRO_GOO_RIGHT_29672_7_jpg.webp";

import iphone16JellyBack from "@/assets/products/IPHONE_16_PRO_JELLY_BACK_29683_21_jpg_1bbe714d-1bfc-48b2-8fad-1bb6fe8e0ec2.webp";
import iphone16JellyDetail from "@/assets/products/IPHONE_16_PRO_JELLY_DETAIL_29702_39_jpg.webp";
import iphone16JellyDetailTop from "@/assets/products/IPHONE_16_PRO_JELLY_DETAIL_TOP_29727_61_jpg.webp";
import iphone16JellyFront from "@/assets/products/IPHONE_16_PRO_JELLY_FRONT_29686_24_jpg.webp";
import iphone16JellyLeft from "@/assets/products/IPHONE_16_PRO_JELLY_LEFT_29685_23_jpg.webp";
import iphone16JellyRight from "@/assets/products/IPHONE_16_PRO_JELLY_RIGHT_29684_22_jpg.webp";

import iphone16BlueBack from "@/assets/products/IPHONE_16_PRO_SUPER_BLUE_BACK_29687_25_jpg_1699071a-24b5-4cb8-bb35-b4d48afd74ec.webp";
import iphone16BlueDetail from "@/assets/products/IPHONE_16_PRO_SUPER_BLUE_DETAIL_29700_37_jpg.webp";
import iphone16BlueDetailTop from "@/assets/products/IPHONE_16_PRO_SUPER_BLUE_DETAIL_TOP_29731_65_jpg.webp";
import iphone16BlueFront from "@/assets/products/IPHONE_16_PRO_SUPER_BLUE_FRONT_29690_28_jpg.webp";
import iphone16BlueLeft from "@/assets/products/IPHONE_16_PRO_SUPER_BLUE_LEFT_29688_26_jpg.webp";
import iphone16BlueRight from "@/assets/products/IPHONE_16_PRO_SUPER_BLUE_RIGHT_29689_27.webp";

import { useQuery } from '@tanstack/react-query';
import { supabase } from './supabase';

export const LOCAL_PRODUCT_IMAGES: Record<string, { src: string, images?: string[] }> = {
  "hoodie-lime": { src: hoodieLime, images: [hoodieLime, hoodieLimeBack, hoodieLimeDetail] },
  "jogger-lime": { src: joggerLime, images: [joggerLime, joggerLimeCinchedFront, joggerLimeCinchedBack, joggerLimeStraightBack, joggerLimeDetail, joggerLimeDetailLogo] },
  "hoodie-black": { src: hoodieBlack },
  "beanie-lime": { src: beanieLime },
  "jogger-iris": { src: joggerIris },
  "denim-jean": { src: denimJean, images: [denimJean, denimJean2, denimJean3, denimJean4] },
  "hoodie-pink": { src: hoodiePink },
  "beanie-iris": { src: beanieIris },
  "reverse-sweats": { src: reverseSweats, images: [reverseSweats, sweats2, sweats3] },
  "rest-slide-sand": { src: slideSand },
  "rest-slide-dream": { src: slideDream },
  "rest-slipper-green": { src: slipperGreen },
  "rest-slipper-pie": { src: slipperPie },
  "rest-slide-onyx": { src: slide1 },
  "rest-slide-stone": { src: slide2 },
  "iphone-17-pro-goo": { src: iphone17GooBack, images: [iphone17GooBack, iphone17GooFront, iphone17GooLeft, iphone17GooRight, iphone17GooDetail, iphone17GooDetailTop] },
  "iphone-16-pro-jelly": { src: iphone16JellyBack, images: [iphone16JellyBack, iphone16JellyFront, iphone16JellyLeft, iphone16JellyRight, iphone16JellyDetail, iphone16JellyDetailTop] },
  "iphone-16-pro-super-blue": { src: iphone16BlueBack, images: [iphone16BlueBack, iphone16BlueFront, iphone16BlueLeft, iphone16BlueRight, iphone16BlueDetail, iphone16BlueDetailTop] },
};

export type Product = {
  id: string;
  name: string;
  price: string;
  color: string;
  category: string | null;
  gradient: string;
  hover_gradient: string;
  description: string;
  top: string;
  left: string;
  mobile_top: string;
  mobile_left: string;
  width: number;
  mobile_width: number;
  depth: number;
  delay: number;
  rotate: number;
  // Local mapped properties
  src: string;
  images?: string[];
  // Backwards compatibility aliases
  hoverGradient: string;
  mobileTop: string;
  mobileLeft: string;
  mobileWidth: number;
};

const DEFAULT_PRODUCTS_DATA = [
  { id: 'hoodie-lime', name: 'REVERSE HOODIE / LIME', price: 'IDR 2,450,000', color: 'LIME', category: null, gradient: 'var(--gradient-lime)', hover_gradient: 'var(--gradient-lime)', description: 'Garment-dyed heavyweight essential. Custom milled fabric with a relaxed, boxy fit. Luminous lime finish.', top: '5%', left: '15%', mobile_top: '5%', mobile_left: '10%', width: 240, mobile_width: 150, depth: 0.5, delay: 1, rotate: 0 },
  { id: 'jogger-lime', name: 'REVERSE JOGGER / LIME', price: 'IDR 1,890,000', color: 'LIME', category: null, gradient: 'var(--gradient-lime)', hover_gradient: 'var(--gradient-lime)', description: 'Garment-dyed heavyweight essential sweatpants. Custom milled fabric with a relaxed fit.', top: '13%', left: '45%', mobile_top: '10%', mobile_left: '50%', width: 240, mobile_width: 150, depth: 0.5, delay: 1, rotate: 0 },
  { id: 'hoodie-black', name: 'REVERSE HOODIE / CAVE', price: 'IDR 2,450,000', color: 'CAVE', category: null, gradient: 'var(--gradient-black)', hover_gradient: 'var(--gradient-black)', description: 'Garment-dyed heavyweight essential. Custom milled fabric with a relaxed, boxy fit.', top: '5%', left: '75%', mobile_top: '15%', mobile_left: '5%', width: 240, mobile_width: 150, depth: 0.5, delay: 1, rotate: 0 },
  { id: 'beanie-lime', name: 'BEANIE / LIME', price: 'IDR 761,000', color: 'LIME', category: null, gradient: 'var(--gradient-lime)', hover_gradient: 'var(--gradient-lime)', description: 'Garment-dyed heavyweight beanie. Custom milled fabric with a snug fit.', top: '37%', left: '75%', mobile_top: '45%', mobile_left: '30%', width: 240, mobile_width: 150, depth: 0.5, delay: 1, rotate: 0 },
  { id: 'jogger-iris', name: 'REVERSE JOGGER / IRIS', price: 'IDR 1,890,000', color: 'IRIS', category: null, gradient: 'var(--gradient-iris)', hover_gradient: 'var(--gradient-iris)', description: 'Garment-dyed heavyweight essential sweatpants. Custom milled fabric with a relaxed fit. Deep iris purple.', top: '29%', left: '45%', mobile_top: '25%', mobile_left: '15%', width: 240, mobile_width: 150, depth: 0.5, delay: 1, rotate: 0 },
  { id: 'denim-jean', name: 'PLATED DENIM JEAN', price: 'IDR 3,250,000', color: 'WASHED', category: null, gradient: 'var(--gradient-sky)', hover_gradient: 'var(--gradient-sky)', description: 'Premium plated denim jean with a blanket wash finish.', top: '21%', left: '75%', mobile_top: '30%', mobile_left: '45%', width: 240, mobile_width: 150, depth: 0.5, delay: 1, rotate: 0 },
  { id: 'hoodie-pink', name: 'REVERSE HOODIE / PINK', price: 'IDR 2,450,000', color: 'PINK', category: null, gradient: 'var(--gradient-pink)', hover_gradient: 'var(--gradient-pink)', description: 'Garment-dyed heavyweight essential. Custom milled fabric with a relaxed, boxy fit. Pink finish.', top: '37%', left: '15%', mobile_top: '35%', mobile_left: '10%', width: 240, mobile_width: 150, depth: 0.5, delay: 1, rotate: 0 },
  { id: 'beanie-iris', name: 'BEANIE / IRIS', price: 'IDR 761,000', color: 'IRIS', category: null, gradient: 'var(--gradient-iris)', hover_gradient: 'var(--gradient-iris)', description: 'Garment-dyed heavyweight beanie. Custom milled fabric with a snug fit. Deep iris purple.', top: '45%', left: '45%', mobile_top: '40%', mobile_left: '55%', width: 240, mobile_width: 150, depth: 0.5, delay: 1, rotate: 0 },
  { id: 'reverse-sweats', name: 'REVERSE SWEATS / PAPER', price: 'IDR 1,890,000', color: 'PAPER', category: null, gradient: 'var(--gradient-white)', hover_gradient: 'var(--gradient-white)', description: 'Garment-dyed heavyweight essential sweatpants. Custom milled fabric with a relaxed fit. Paper color.', top: '21%', left: '15%', mobile_top: '20%', mobile_left: '60%', width: 240, mobile_width: 150, depth: 0.5, delay: 1, rotate: 0 },
  { id: 'rest-slide-sand', name: 'REST SLIDE / SAND', price: 'IDR 1,200,000', color: 'SAND', category: null, gradient: 'var(--gradient-sand)', hover_gradient: 'var(--gradient-sand)', description: 'Comfortable rest slide in Sand.', top: '53%', left: '15%', mobile_top: '50%', mobile_left: '15%', width: 240, mobile_width: 150, depth: 0.5, delay: 1, rotate: 0 },
  { id: 'rest-slide-dream', name: 'REST SLIDE / DREAM', price: 'IDR 1,200,000', color: 'DREAM', category: null, gradient: 'var(--gradient-sky)', hover_gradient: 'var(--gradient-sky)', description: 'Comfortable rest slide in Dream.', top: '61%', left: '45%', mobile_top: '55%', mobile_left: '50%', width: 240, mobile_width: 150, depth: 0.5, delay: 1, rotate: 0 },
  { id: 'rest-slipper-green', name: 'REST SLIPPER / FRESH GREEN', price: 'IDR 1,500,000', color: 'FRESH GREEN', category: null, gradient: 'var(--gradient-lime)', hover_gradient: 'var(--gradient-lime)', description: 'Comfortable rest slipper in Fresh Green.', top: '53%', left: '75%', mobile_top: '60%', mobile_left: '5%', width: 240, mobile_width: 150, depth: 0.5, delay: 1, rotate: 0 },
  { id: 'rest-slipper-pie', name: 'REST SLIPPER / PIE', price: 'IDR 1,500,000', color: 'PIE', category: null, gradient: 'var(--gradient-pie)', hover_gradient: 'var(--gradient-pie)', description: 'Comfortable rest slipper in Pie.', top: '69%', left: '15%', mobile_top: '65%', mobile_left: '60%', width: 240, mobile_width: 150, depth: 0.5, delay: 1, rotate: 0 },
  { id: 'rest-slide-onyx', name: 'REST SLIDE / ONYX', price: 'IDR 1,200,000', color: 'ONYX', category: null, gradient: 'var(--gradient-grass)', hover_gradient: 'var(--gradient-grass)', description: 'Comfortable rest slide in Onyx.', top: '77%', left: '45%', mobile_top: '70%', mobile_left: '15%', width: 240, mobile_width: 150, depth: 0.5, delay: 1, rotate: 0 },
  { id: 'rest-slide-stone', name: 'REST SLIDE / STONE', price: 'IDR 1,200,000', color: 'STONE', category: null, gradient: 'var(--gradient-watermelon)', hover_gradient: 'var(--gradient-watermelon)', description: 'Comfortable rest slide in Stone.', top: '69%', left: '75%', mobile_top: '75%', mobile_left: '45%', width: 240, mobile_width: 150, depth: 0.5, delay: 1, rotate: 0 },
  { id: 'iphone-17-pro-goo', name: 'IPHONE 16 PRO CASE / GOO', price: 'IDR 450,000', color: 'GOO', category: 'Case', gradient: 'var(--gradient-lime)', hover_gradient: 'var(--gradient-lime)', description: 'Premium protective case for iPhone 17 Pro in GOO colorway. Slim profile with precise cutouts.', top: '85%', left: '15%', mobile_top: '80%', mobile_left: '25%', width: 240, mobile_width: 150, depth: 0.5, delay: 1, rotate: 0 },
  { id: 'iphone-16-pro-jelly', name: 'IPHONE 16 PRO CASE / JELLY', price: 'IDR 450,000', color: 'JELLY', category: 'Case', gradient: 'var(--gradient-jelly)', hover_gradient: 'var(--gradient-jelly)', description: 'Premium protective case for iPhone 16 Pro in Jelly colorway. Translucent finish with a soft-touch feel.', top: '93%', left: '45%', mobile_top: '85%', mobile_left: '55%', width: 240, mobile_width: 150, depth: 0.5, delay: 1, rotate: 0 },
  { id: 'iphone-16-pro-super-blue', name: 'IPHONE 16 PRO CASE / SUPER BLUE', price: 'IDR 450,000', color: 'SUPER BLUE', category: 'Case', gradient: 'var(--gradient-superblue)', hover_gradient: 'var(--gradient-superblue)', description: 'Premium protective case for iPhone 16 Pro in Super Blue colorway. Bold blue finish with premium grip.', top: '85%', left: '75%', mobile_top: '90%', mobile_left: '10%', width: 240, mobile_width: 150, depth: 0.5, delay: 1, rotate: 0 }
];

const INITIAL_PRODUCTS: Product[] = DEFAULT_PRODUCTS_DATA.map((p: any) => {
  const local = LOCAL_PRODUCT_IMAGES[p.id] || { src: '' };
  return {
    ...p,
    src: local.src,
    images: local.images || [local.src],
    hoverGradient: p.hover_gradient,
    mobileTop: p.mobile_top,
    mobileLeft: p.mobile_left,
    mobileWidth: p.mobile_width,
  };
});

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    initialData: INITIAL_PRODUCTS,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    queryFn: async () => {
      try {
        const { data, error } = await supabase.from('products').select('*');
        
        if (error) {
          console.warn("Supabase fetch failed, using local data:", error.message);
          return INITIAL_PRODUCTS;
        }
        
        if (!data || data.length === 0) {
          return INITIAL_PRODUCTS;
        }

        return data.map((p: any) => {
          const local = LOCAL_PRODUCT_IMAGES[p.id] || { src: '' };
          return {
            ...p,
            src: local.src,
            images: local.images || [local.src],
            hoverGradient: p.hover_gradient,
            mobileTop: p.mobile_top,
            mobileLeft: p.mobile_left,
            mobileWidth: p.mobile_width,
          } as Product;
        });
      } catch (e) {
        console.warn("Supabase unreachable, using local data:", e);
        return INITIAL_PRODUCTS;
      }
    }
  });
}

## Lumvo — Floating Shop Landing Page

Membangun satu halaman shop bergaya SKYLRK: produk-produk melayang di atas background gradient biru-ke-lavender dengan grain, navigation pill di atas, dan tag "[ RPIDR ]" di kanan atas. Cart hanya visual (counter di pill nav).

### Halaman
- `/` (src/routes/index.tsx) — Shop floating products

### Komponen
- `Header` — pill navigation glass/chrome: logo `LUMVO`, lalu pill kedua berisi `(0) SHOP CONTACT POLICIES WALLPAPERS IG ◇`. Kanan atas: `[ RPIDR ]`.
- `FloatingProduct` — kartu produk absolute-positioned dengan gambar PNG transparan, hover: scale + subtle drop-shadow, parallax ringan saat mouse move.
- `GrainOverlay` — overlay noise SVG/PNG untuk tekstur grain.
- `BackgroundGradient` — gradient radial biru langit → navy bawah → highlight lavender bawah-kanan (meniru referensi).

### Produk (floating)
6 item tersebar asimetris di viewport, ukuran & posisi bervariasi:
1. Beanie Lime (kiri-atas)
2. Beanie Iris/Lavender (tengah-atas)
3. Hoodie Sky Blue (kanan-tengah)
4. Sweatpants Lavender (kanan-bawah)
5. Hoodie Lime (tengah-bawah, paling besar — focal)
6. (opsional) Beanie kecil tambahan untuk balance

Semua produk pakai gambar generated PNG transparan (background putih solid prompt) di `src/assets/`, di-generate via imagegen (fast, transparent_background).

### Design tokens (src/styles.css)
- Font: display `Space Grotesk` / mono fallback untuk navigation chip; body `Inter`.
- Palette (oklch):
  - `--background`: deep navy `oklch(0.25 0.06 250)`
  - `--sky`: `oklch(0.78 0.09 230)`
  - `--lavender`: `oklch(0.82 0.06 300)`
  - `--lime`: `oklch(0.88 0.18 115)` (accent produk)
  - `--foreground`: putih
- `--gradient-sky`: radial gradient sky → navy → lavender highlight.
- Border-radius pill besar untuk nav (`9999px`).

### Interaksi
- Mouse-move parallax ringan (translate ±8–15px berdasarkan posisi cursor) pakai `useEffect` + transform.
- Hover produk: scale 1.05, transition 400ms.
- Klik produk → `console.log` placeholder (cart visual saja, counter tidak berubah karena hanya tampilan).
- Klik `IG` → link `#`, lainnya `#`.

### SEO
- `head()` di route: title "LUMVO — Essentials", description singkat brand.

### Teknis
- Semua warna via design tokens, tidak ada hex langsung di komponen.
- File baru: `src/components/Header.tsx`, `src/components/FloatingProduct.tsx`, `src/components/GrainOverlay.tsx`, asset PNG di `src/assets/products/`.
- Edit: `src/routes/index.tsx` (ganti placeholder), `src/styles.css` (tambah tokens + font import via `<link>` di `__root.tsx` head).

# 🎮 Nexus Guild — Website Komunitas Gamer

> **CATATAN PENTING — TENTANG VIDEO `image/hero.mp4`**
>
> File video latar pada halaman utama (**`image/hero.mp4`**, ± 1 MB) **sengaja tidak dimasukkan ke dalam file .zip pengumpulan** karena ukurannya terlalu besar. Mengompres video ke dalam arsip zip tidak akan mengurangi ukurannya secara signifikan (format MP4 sudah terkompresi), sehingga zip bisa membengkak dan gagal diunggah ke portal pengumpulan.
>
> **Dampaknya:** jika video tidak ada, halaman utama tetap tampil normal — hanya latar video hero yang berupa warna/gambar cadangan (fallback) dari CSS. Seluruh konten, navigasi, dan fitur lain tetap berfungsi. Video opsional ini bukan bagian wajib dari penilaian.
>
> Jika tetap ingin menyertakan video, silakan **unggah terpisah** (misalnya via Google Drive / link eksternal) atau **kompres/resize video terlebih dahulu** menjadi resolusi dan durasi lebih kecil sebelum dimasukkan ke zip.

---

## 📌 Deskripsi

**Nexus Guild** adalah website statis bertema komunitas gamer. Pengunjung bisa menjelajahi game yang dimainkan komunitas, melihat jadwal turnamen, mengecek papan peringkat, melihat galeri momen, dan menghubungi pengelola melalui form kontak.

Tampilan menggunakan nuansa *retro/arcade* dengan font **Press Start 2P** dan **Chakra Petch**, serta animasi dan efek ringan yang dibuat tanpa framework.

## ✨ Fitur

- **Beranda** — hero dengan video latar, statistik dengan animasi angka, dan tautan cepat ke tiap halaman.
- **Game** — daftar game populer komunitas (Dota 2, Mobile Legends, Valorant, dll).
- **Turnamen** — jadwal turnamen beserta hitung mundur (*countdown*) dan info hadiah.
- **Leaderboard** — papan peringkat pemain musim ini.
- **Galeri** — kumpulan momen komunitas dengan *lightbox* saat gambar diklik.
- **Kontak** — form pengisian data dengan validasi sederhana.
- **Tentang** — profil singkat komunitas.
- Header/footer dan navigasi dibuat dinamis lewat `script.js`.

## 🗂️ Struktur File

```
.
├── index.html          # Beranda
├── game.html           # Daftar game
├── turnamen.html       # Jadwal & hitung mundur turnamen
├── leaderboard.html    # Papan peringkat
├── galeri.html         # Galeri + lightbox
├── kontak.html         # Form kontak
├── tentang.html        # Tentang komunitas
├── style.css           # Seluruh styling & animasi
├── script.js           # Header/footer dinamis, interaksi & validasi
├── image/              # Aset gambar dan video hero (opsional)
│   └── hero.mp4        # Video latar — TIDAK disertakan dalam zip (lihat catatan)
└── README.md           # Dokumentasi ini
```

## 🚀 Cara Menjalankan

Tidak memerlukan instalasi atau build. Cukup:

1. Unduh / ekstrak folder proyek.
2. Buka `index.html` di browser, **atau** jalankan server lokal:

```bash
# Python
python -m http.server 8000
```

Lalu buka `http://localhost:8000` di browser.

> Jika ingin menampilkan video hero, pastikan file `image/hero.mp4` tersedia di folder `image/` (lihat catatan di atas).

## 🛠️ Teknologi

- HTML5
- CSS3 (custom properties, animasi, responsive layout)
- JavaScript (vanilla, tanpa framework)
- Google Fonts: Press Start 2P & Chakra Petch

## 📝 Catatan Tambahan

- Seluruh konten bersifat **dummy/contoh** untuk keperluan tugas.
- Dibuat oleh **Sendi Maulana** — 2403010088.

---

**Ringkasan pengumpulan:** kumpulkan seluruh file `.html`, `style.css`, `script.js`, dan folder `image/` **kecuali `hero.mp4`** ke dalam satu file `.zip`. Video tidak di-zip karena ukurannya terlalu besar dan tidak akan mengecil secara berarti saat dikompres; sertakan terpisah hanya jika diperlukan.

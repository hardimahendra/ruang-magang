---
version: alpha
name: "Ruang Magang"
description: "Dashboard mahasiswa yang mengubah progres magang menjadi jalur kerja yang mudah dibaca."
colors:
  ink: "#122F38"
  navigation: "#0D2D36"
  paper: "#F5F3ED"
  surface: "#FFFDFA"
  progress: "#C6DCCF"
  action: "#D8EC7E"
  border: "#D8DDD4"
  muted: "#75878A"
typography:
  sans:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace"
rounded:
  sm: "0.25rem"
  DEFAULT: "0.625rem"
  lg: "1.125rem"
spacing:
  page-max: "78.75rem"
  section-gap: "3.5rem"
components:
  button: { radius: "0.625rem" }
  card: { radius: "1.125rem" }
  table: { border: "#D8DDD4" }
  toast: { placement: "bottom-right" }
---

# Ruang Magang Design System

## Overview

### Creative North Star

Ruang Magang terasa seperti meja kerja pembimbing yang tertata: kertas agenda berwarna hangat, tinta biru-hijau, dan penanda stabilo hijau untuk pekerjaan yang bergerak maju. Targetnya mahasiswa Indonesia yang membuka dashboard lewat laptop kampus dan ponsel di sela aktivitas magang.

Register-nya adalah produk. Signature visualnya adalah garis progres dan penanda minggu yang membuat status magang terbaca sebagai perjalanan, bukan deretan kartu statistik. Hindari dashboard neon, gradien dekoratif, dan metrik yang lebih dominan daripada tindakan berikutnya. Token pada frontmatter dipetakan satu-ke-satu ke variabel CSS dalam `app/globals.css`.

## Colors

`ink` dan `navigation` menjaga fokus dan navigasi tenang. `paper` adalah latar aplikasi, `surface` untuk area kerja, dan `action` hanya dipakai untuk navigasi aktif atau progres positif. Status memakai teks dan label, bukan warna saja. Tidak ada dark mode pada rilis frontend ini.

## Typography

Sans sistem membuat antarmuka cepat dan jelas pada perangkat kampus. Heading memakai tracking rapat untuk orientasi, sedangkan data dan label utilitas memakai ukuran yang tenang. Semua copy menggunakan Bahasa Indonesia langsung dan aktif.

## Layout

Sidebar tetap tampil pada desktop dan berubah menjadi drawer pada layar sempit. Konten memakai lebar maksimum `page-max`; tabel mempertahankan relasi kolom melalui scroll horizontal internal. Spasi `section-gap` memisahkan blok kerja tanpa membuat dashboard terasa longgar.

## Elevation & Depth

Hierarki dibuat lewat layer kertas, border halus, dan satu bayangan ringan pada aksi utama. Kartu statis tidak memakai bayangan berat. Toast dan drawer adalah satu-satunya overlay.

## Shapes

Kartu menggunakan `lg`, kontrol memakai `DEFAULT`, dan badge status berbentuk pil. Radius adalah penanda permukaan kerja, bukan dekorasi di setiap elemen.

## Components

Buttons memakai label tindakan yang konsisten, hover yang terlihat, dan fokus berkontras. Field menggunakan kontrol native dengan label nyata. Tabel memiliki status, hasil kosong, dan scroll internal. Toast hanya menjelaskan konsekuensi mode demo dan tidak pernah menyatakan bahwa data tersimpan. Motion dibatasi ke drawer dan hover; reduced motion menonaktifkannya.

## Do's and Don'ts

- **Do:** selalu tampilkan langkah berikutnya untuk program aktif.
- **Do:** pertahankan warna `action` hanya untuk fokus atau progres positif.
- **Don't:** gunakan data mahasiswa nyata pada versi demo.
- **Don't:** sembunyikan relasi data tabel dengan mengubahnya menjadi kartu tanpa label.

# UX Contract

## Product context

- Audience: mahasiswa Indonesia yang memantau proses magang.
- Primary jobs: melihat progres, menemukan program, dan meninjau laporan.
- Active locale: `id-ID`; data tanggal menggunakan gaya Indonesia.
- Accessibility target: WCAG 2.2 AA.
- Business context: source lama di `../sistem-magang-mahasiswa`; versi ini hanya demo frontend dengan data fiktif. Tidak ada kebijakan izin, retensi, atau data pribadi yang diimplementasikan.

## Visual contract

- Project design: `DESIGN.md`.
- Runtime tokens: `app/globals.css` pada `:root`.
- Themes: light only.

## Canonical UI Map

| Capability | Canonical owner | Source of truth | Allowed variants | Verification |
|---|---|---|---|---|
| Table Selection | Tidak diterapkan | `DashboardApp` | Tidak ada bulk action | Tabel tidak memiliki checkbox pemilihan |
| Select/Listbox | Native `select` | `InternshipList` | Status filter | Ganti status dan pastikan hasil langsung berubah |
| Date | Tidak diterapkan | Data demo | Tanggal tampilan statis | Periksa format tanggal Indonesia |
| Form | Tidak diterapkan | `DashboardApp` | Tombol mode demo tanpa penyimpanan | Klik aksi dan periksa toast |
| Scrollbar | `app/globals.css` | `.table-scroll` | Tabel dapat scroll horizontal | Uji viewport sempit |
| Toast | `DashboardApp` | State `notice` | Informasi mode demo | Klik aksi demo dan periksa pengumuman |
| CRUD | Tidak diterapkan | `demo-data.js` | Data hanya-baca | Muat ulang halaman; data tidak berubah |

## Flow ledger

| Operation | Success | Failure / recovery |
|---|---|---|
| Search program | Daftar langsung diperbarui | Reset filter bila tidak ada hasil |
| Filter status | Daftar langsung diperbarui | Reset filter bila tidak ada hasil |
| Aksi pembuatan/unggah | Toast menjelaskan mode demo | Tidak ada data yang berubah |

## Navigation and responsive behavior

- Judul halaman mengikuti metadata produk.
- Sidebar berubah menjadi drawer pada lebar di bawah 900px; scrim menutup drawer.
- Tabel mempertahankan struktur kolom dan memiliki scroll horizontal internal di mobile.

## Verification

- Perintah: `npm run build`.
- Browser: desktop, viewport sempit, pencarian, filter, status kosong, drawer, dan reduced motion.

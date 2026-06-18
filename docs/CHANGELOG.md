# Changelog

Semua perubahan penting pada proyek ini akan dicatat di file ini.

Format terinspirasi dari Keep a Changelog.
Penomoran versi menggunakan Semantic Versioning (MAJOR.MINOR.PATCH).

---

## [2.2.2] - 2026-06-16

### Diperbaiki
- Memperbaiki overlay pada `security.css`, `header.css`, `sidebar.css`, dan `modal.css`
- Mengoptimalkan source code `init.js`
- Mengoptimalkan pemanggilan partials pada `components.js`
- Memperbaiki pemanggilan function pada `sidebar/index.js` agar lebih modular

### Dihapus
- `sidebar/ui.js`

---

## [2.2.1] - 2026-06-15

### Diperbaiki
- Memperbaiki modal pada `login`, `report.js`, `feedback.js`, dan `themes.js`
- Menambahkan modal pada `index.css`
- Menambahkan class baru pada `utility.css` dan variable baru pada `variables.css`
- Menambahkan tag atribut versi pada `index.html`

### Ditambahkan
- Menambahkan sistem modal kustom untuk menggantikan alert dan confirm bawaan browser
- Menambahkan modal pada `modal.css` dan `modal.js`. `helper.js`, `icons.js`, dan`index.js`



---

## [2.2.0] - 2026-06-14

### Diperbaiki
- Memperbaiki load DOM pada `init.js`
- Memperbaiki error handling pada `components.js`
- Memperbaiki masalah class pada `summaryTable.js`
- Memperbaiki script agar tema berfungsi `sidebar.html`, `sidebar-content.html`, `init.js`
- Memperbaiki tampilan `variables.css`, `utility.css`, `main.css`, `summary.css`,`index.css`, `sidebar.css`

### Ditambahkan
- Menambahkan fitur theme pada aplikasi
  - Ditambahkan `themes.css`, `themes.js`


---

## [2.1.9] - 2026-06-13

### Diubah
- Mengganti logo aplikasi (`icon.png`) dan favicon (`favicon.png`) pada `header.html`

### Diperbaiki
- Memperbaiki logika perhitungan pada kalkulator untuk mendukung tipe pekerjaan `per_unit` dan `per_worker` pada `calculator,js`

---

## [2.1.8] - 2026-06-12

### Refactor
- Restrukturisasi direktori menjadi berbasis fitur:
  - `mainTable.js` → `features/payroll/mainTable.js`
  - `summaryTable.js` → `features/payroll/summaryTable.js`
  - `workerList.js` → `features/payroll/workerList.js`
  - `dropdown.js` → `features/period/dropdown.js`
  - `notice.js` → `features/ui/notice.js`
  - `footerVersion.js` → `features/ui/footerVersion.js`
  - `security.js` → `features/auth/login.js`

### Perubahan
- Direktori `data/` diubah menjadi `services/`.

### Penamaan Ulang
- `security.js` diubah menjadi `login.js`.

---

## [2.1.7] - 2026-06-11

### Diperbaiki
  - Memperbaiki periodId pada `dropdown.js`
  - Memperbaiki quantity pada `mainTable.js`
  - Mengoptimalkan source code `sidebar/calculator.js`

### Diubah
  - Menghapus semua key period, karena sudah ada periodId pada semua `period.json`
  - Mengganti semua key totalProduction menjadi quantity pada semua `period.json`
  
---

---

## [2.1.6] - 2026-06-10

### Diperbaiki
- Memperbaiki bug pada halaman security yang tidak dapat diklik setelah login pada perangkat tertentu
  - `base/style.css`
  - `components/security.css`
  - `app/init.js`
  - `ui/security.js`
- Mengoptimalkan halaman sidebar
  - `ui/sidebar.css`

- Memperbaiki bug ukuran sidebar yang tidak sesuai
  - `sidebar/index.js`

- Memperbaiki pemanggilan calculator menggunakan jobs.json
  - `sidebar-content.html`
  - `calculator.js`

### Refactor
- Memecah struktur halaman menjadi beberapa partials
  - `partials/login.html`
  - `partials/header.html`
  - `partials/sidebar.html`
  - `partials/sidebar-content.html`
  - `partials/main.html`
  - `partials/summary.html`

- Menambahkan loader untuk menghubungkan dan memuat seluruh partials HTML
  - `app/components.js`

---

## [2.1.5] - 2026-06-09

### Refactor (Architecture)
- `docs/CHANGELOG.md`
- `docs/README.md`
- `docs/doc.txt`
- `docs/version.txt`

### Diubah
- Mengoptimalkan tampilan
- Mengganti hardcoded color menjadi CSS variables dari variables.css
  - `style.css`
  - `utility.css`
  - `security.css`
  - `header.css`
  - `sidebar.css`
  - `main.css`
  - `summary.css`
  - `notice.css`
  - `footer.css`


### Ditambahkan
- `base/variables.css`
- `ui/footerVersion.js`

---

## [2.1.4] - 2026-06-07

### Refactor (Architecture)
- Migrasi arsitektur aplikasi ke ES Module
- Modularisasi sistem menjadi beberapa modul terpisah:
  - `utils/format.js`
  - `sidebar/index.js`
  - `sidebar/ui.js`
  - `sidebar/calculator.js`
  - `sidebar/feedback.js`
  - `sidebar/report.js`
  - `ui/mainTable.js`
  - `ui/summaryTable.js`
  - `ui/dropdown.js`
  - `ui/notice.js`
  - `ui/workerList.js`
  
- Penyederhanaan dan peningkatan struktur inisialisasi aplikasi di `app/init.js`
- Menggabungkan pemanggilan stylesheet melalui CSS entry point `(index.css)`
- Menyederhanakan asset loading pada `index.html`
- Merapikan struktur folder CSS untuk mendukung arsitektur modular

### Ditambahkan
- `index.css`

---

## [2.1.3] - 2026-06-06

### Diubah
- Mengoptimalkan tampilan HTML
  - `index.html`
  - `style.css`
  - `utility.css`
  - `header.css`
  - `sidebar.css`
  - `main.css`
  - `summary.css`
  - `notice.css`
  - `footer.css`
  - m`ainTable.js`
  - `summaryTable.js`

---

## [2.1.2] - 2026-05-27

### Diubah
- Memperbaiki struktur folder
  - all period.json => 2025/2025-10-18

---

## [2.1.1] - 2026-04-21

### Diubah
- Menambahkan type pekerjaan pada `jobs.json`
  - Pekerjaan "Mencacah"

---

## [2.1.0] - 2026-04-03

### Ditambahkan
- Menambahkan type pada `jobs.json`
- Menambahkan audio-system `index.html`

### Diubah
- Menyesuaikan type pada `jobs.json` dengan `mainTable.js`
- Menyesuaikan audio-system `security.css`
- Menyesuaikan audio-system `security.js`


---

## [2.0.0] - 2026-03-28
### ⚠️ Breaking Changes
- Perubahan besar pada struktur folder
- Pemisahan arsitektur menjadi modular (UI, logic, controller)

### Refactor
- refactor folder
  - `app/init.js`
  - `data/loader.js`
- Memisahkan ui, logic, dan controller
  - `ui/mainTable.js`
  - `ui/summaryTable.js`
  - `ui/workerList.js`
  - `ui/dropdown.js`
  - `ui/notice.js`
  - `ui/security.js`
  - `ui/sidebar.js`
  - `json/periods/all periods`

### Ditambahkan
- Menambahkan file baru
  - `ui/calculator.js`
  - `ui/feedback.js`
  - `ui/report.js`
  - `ui/ui.js`
  - `CHANGELOG.md`
  - `CHANGELOG.js`

---

## [1.3.3] - 2026-03-27
### Ditambahkan
- Menambahkan komentar pada semua file js

---

## [1.3.2] - 2026-03-19
### Diubah
- Menyesuaikan rate pada `app.js`, `mainTable.js`, dan `summaryTable.js` dengan `jobs.json`

### Ditingkatkan
- Mengoptimalkan `app.js`
- Mengoptimalkan `mainTable.js`

---

## [1.3.1] - 2026-03-19
### Ditambahkan
- Menambahkan unit dan rate pada `jobs.json`
- Menambahkan footer pada `index.html` dan `footer.css`

### Diubah
- Menyesuaikan `app.js` dan `mainTable.js` dengan `jobs.json`
- Mengoptimalkan tampilan `main.css`

### Diperbaiki
- Memperbaiki bug tampilan `style.css`, `notice.css`, dan s`idebar.css`

### Dihapus
- Menghapus type pada semua `period.json`

---

## [1.3.0] - 2026-03-19
### Ditambahkan
- Menambahkan `jobs.json`

### Diubah
- Mengubah jobs pada semua period menggunakan id
- Menyesuaikan `app.js`, `mainTable.js`, dan `dropdown.js` dengan `jobs.json`

---

## [1.2.1] - 2026-03-15
### Dihapus
- Menghapus displayDate dan shortDate pada semua `period.json`

### Diperbaiki
- Menyesuaikan `utils.js`, `mainTable.js`, dan `summaryTable.js` dengan `period.json`

---

## [1.2.0] - 2026-03-14
### Ditambahkan
- Menambahkan version dan createdAt pada semua `period.json`
- Menambahkan `workers.json`

### Diubah
- Mengubah `workers.json` pada semua `period.json` menggunakan id
- Menyesuaikan `app.js`, `mainTable.js`, `summaryTable.js`, dan `dropdown.js` dengan `workers.json`

---

## [1.1.0] - 2026-03-13
### Diubah
- Mengubah format tanggal pada JSON (date dan displayDate)
- Menyesuaikan `mainTable.js` dengan date dan displayDate

---

## [1.0.0] - 2025-10-18

### Ditambahkan
- Menampilkan tabel data produksi
- Menampilkan ringkasan produksi
- Manajemen daftar pekerja
- Navigasi sidebar interaktif
- Komponen dropdown UI
- Sistem notifikasi dasar

---
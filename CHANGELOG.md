# Changelog

Semua perubahan penting pada proyek ini akan dicatat di file ini.

Format terinspirasi dari Keep a Changelog.  
Penomoran versi menggunakan Semantic Versioning (MAJOR.MINOR.PATCH).

---

## [2.1.3] - 2026-06-06

### Diubah
- Mengoptimalkan tampilan HTML
  - index.html
  - style.css
  - utility.css
  - header.css
  - sidebar.css
  - main.css
  - summary.css
  - notice.css
  - footer.css
  
  - mainTable.js
  - summaryTable.js

---

## [2.1.2] - 2026-05-27

### Diubah
- Memperbaiki struktur folder
  - all period.json => 2025/2025-10-18

---

## [2.1.1] - 2026-04-21

### Diubah
- Menambahkan type pekerjaan pada jobs.json
  - Pekerjaan "Mencacah"

---

## [2.1.0] - 2026-04-03

### Ditambahkan
- Menambahkan type pada jobs.json
- Menambahkan audio-system index.html

### Diubah
- Menyesuaikan type pada jobs.json dengan mainTable.js
- Menyesuaikan audio-system security.css
- Menyesuaikan audio-system security.js


---

## [2.0.0] - 2026-03-28
### ⚠️ Breaking Changes
- Perubahan besar pada struktur folder
- Pemisahan arsitektur menjadi modular (UI, logic, controller)

### Refactor
- refactor folder
  - app/init.js
  - data/loader.js
- Memisahkan ui, logic, dan controller
  - ui/mainTable.js
  - ui/summaryTable.js
  - ui/workerList.js
  - ui/dropdown.js
  - ui/notice.js
  - ui/security.js
  - ui/sidebar.js
  - json/periods/all periods

### Ditambahkan
- Menambahkan file baru
  - ui/calculator.js
  - ui/feedback.js
  - ui/report.js
  - ui/ui.js
  - CHANGELOG.md
  - CHANGELOG.js

---

## [1.3.3] - 2026-03-27
### Ditambahkan
- Menambahkan komentar pada semua file js

---

## [1.3.2] - 2026-03-19
### Diubah
- Menyesuaikan rate pada app.js, mainTable.js, dan summaryTable.js dengan jobs.json

### Ditingkatkan
- Mengoptimalkan app.js
- Mengoptimalkan mainTable.js

---

## [1.3.1] - 2026-03-19
### Ditambahkan
- Menambahkan unit dan rate pada jobs.json
- Menambahkan footer pada index.html dan footer.css

### Diubah
- Menyesuaikan app.js dan mainTable.js dengan jobs.json
- Mengoptimalkan tampilan main.css

### Diperbaiki
- Memperbaiki bug tampilan style.css, notice.css, dan sidebar.css

### Dihapus
- Menghapus type pada semua period

---

## [1.3.0] - 2026-03-19
### Ditambahkan
- Menambahkan jobs.json

### Diubah
- Mengubah jobs pada semua period menggunakan id
- Menyesuaikan app.js, mainTable.js dan dropdown.js dengan jobs.json

---

## [1.2.1] - 2026-03-15
### Dihapus
- Menghapus displayDate dan shortDate pada JSON

### Diperbaiki
- Menyesuaikan utils.js, mainTable.js dan summaryTable.js dengan period.json

---

## [1.2.0] - 2026-03-14
### Ditambahkan
- Menambahkan version dan createdAt pada JSON
- Menambahkan workers.json

### Diubah
- Mengubah workers pada semua period menggunakan id
- Menyesuaikan app.js, mainTable.js, summaryTable.js, dropdown.js dengan workers.json

---

## [1.1.0] - 2026-03-13
### Diubah
- Mengubah format tanggal pada JSON (date dan displayDate)
- Menyesuaikan mainTable.js dengan date dan displayDate

---

## [1.0.0] - 2025-10-18
### Ditambahkan
- Menampilkan tabel data produksi
- Menampilkan ringkasan produksi
- Manajemen daftar pekerja
- Navigasi sidebar interaktif
- Komponen dropdown UI
- Sistem notifikasi dasar
# Form Contact dengan Google Sheets Database

Project ini adalah form contact sederhana yang menggunakan Google Sheets sebagai database. Form akan di-deploy di Vercel dan data yang di-submit akan otomatis tersimpan di Google Sheets.

## 🚀 Fitur

- ✅ Form contact yang responsif dan modern
- ✅ Validasi form real-time
- ✅ Integrasi dengan Google Sheets API
- ✅ Deploy otomatis di Vercel
- ✅ Loading state dan feedback user
- ✅ Design yang beautiful dan user-friendly

## 📋 Prerequisites

Sebelum menjalankan project ini, Anda perlu:

1. **Google Cloud Console Account**
2. **Google Sheets** (untuk menyimpan data)
3. **Vercel Account** (untuk deployment)
4. **Node.js** (untuk development lokal)

## 🛠️ Setup Google Sheets API

### 1. Buat Google Cloud Project

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru atau pilih project yang sudah ada
3. Enable Google Sheets API:
   - Buka "APIs & Services" > "Library"
   - Cari "Google Sheets API"
   - Klik "Enable"

### 2. Buat Service Account

1. Buka "APIs & Services" > "Credentials"
2. Klik "Create Credentials" > "Service Account"
3. Isi nama service account (misal: "form-submission")
4. Klik "Create and Continue"
5. Skip role assignment, klik "Continue"
6. Klik "Done"

### 3. Generate JSON Key

1. Klik service account yang baru dibuat
2. Buka tab "Keys"
3. Klik "Add Key" > "Create new key"
4. Pilih "JSON"
5. Download file JSON

### 4. Setup Google Sheets

1. Buat Google Sheets baru
2. Share sheet dengan email service account (dari file JSON)
3. Berikan permission "Editor"
4. Copy Sheet ID dari URL (bagian antara /d/ dan /edit)

## 🔧 Setup Environment Variables

Buat file `.env.local` di root project:

```env
GOOGLE_SHEET_ID=your_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
```

## 📦 Install Dependencies

```bash
npm install
```

## 🚀 Development

```bash
npm run dev
```

## 🌐 Deploy ke Vercel

### 1. Push ke GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/repo-name.git
git push -u origin main
```

### 2. Deploy di Vercel

1. Buka [Vercel](https://vercel.com)
2. Import project dari GitHub
3. Tambahkan Environment Variables di Vercel dashboard:
   - `GOOGLE_SHEET_ID`
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
4. Deploy!

## 📊 Struktur Google Sheets

Sheet akan otomatis terisi dengan kolom:
- A: Nama
- B: Email
- C: Telepon
- D: Pesan
- E: Timestamp

## 🔧 Customization

### Mengubah Field Form

Edit file `index.html` untuk menambah/mengurangi field:

```html
<div class="form-group">
    <label for="field_name">Label Field</label>
    <input type="text" id="field_name" name="field_name">
</div>
```

### Mengubah Styling

Edit file `style.css` untuk mengubah tampilan form.

### Mengubah API Response

Edit file `api/submit-form.js` untuk mengubah logika backend.

## 🐛 Troubleshooting

### Error "Invalid Credentials"
- Pastikan service account email dan private key benar
- Pastikan Google Sheets API sudah di-enable

### Error "Permission Denied"
- Pastikan service account sudah di-share dengan Google Sheets
- Berikan permission "Editor"

### Form tidak ter-submit
- Cek browser console untuk error
- Pastikan environment variables sudah benar di Vercel

## 📝 License

MIT License

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
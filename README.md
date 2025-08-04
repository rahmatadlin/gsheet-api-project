# Google Sheets Form - Next.js

Form submission to Google Sheets using Next.js App Router and Vercel deployment.

## 🚀 Features

- ✅ Modern Next.js 14 with App Router
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for beautiful styling
- ✅ Google Sheets API integration
- ✅ Serverless API routes
- ✅ Responsive design
- ✅ Loading states and error handling
- ✅ Automatic deployment on Vercel

## 📋 Prerequisites

Before running this project, you need:

1. **Google Cloud Console Account**
2. **Google Sheets** (for data storage)
3. **Vercel Account** (for deployment)
4. **Node.js** (for local development)

## 🛠️ Setup Google Sheets API

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

### 2. Create Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the service account name (e.g., "form-submission")
4. Click "Create and Continue"
5. Skip role assignment, click "Continue"
6. Click "Done"

### 3. Generate JSON Key

1. Click on the newly created service account
2. Go to the "Keys" tab
3. Click "Add Key" > "Create new key"
4. Select "JSON"
5. Download the JSON file

### 4. Setup Google Sheets

1. Create a new Google Sheet
2. Share the sheet with the service account email (from the JSON file)
3. Give "Editor" permission
4. Copy the Sheet ID from the URL (between /d/ and /edit)

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
GOOGLE_SHEET_ID=your_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
```

## 📦 Installation

```bash
npm install
```

## 🚀 Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🌐 Deploy to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/repo-name.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [Vercel](https://vercel.com)
2. Import your project from GitHub
3. Add environment variables in Vercel dashboard:
   - `GOOGLE_SHEET_ID`
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
4. Deploy!

## 📊 Google Sheets Structure

The sheet will automatically be populated with columns:
- A: Name
- B: Email
- C: Phone
- D: Message
- E: Timestamp

## 🔧 API Endpoints

- `POST /api/submit-form` - Submit form data to Google Sheets
- `GET /api/test` - Test endpoint to verify API is working

## 🎨 Form Fields

The form includes these fields:
- `nama` (required) - Full name
- `email` (required) - Email address
- `telepon` (optional) - Phone number
- `pesan` (required) - Message

## 🐛 Troubleshooting

### Error "Invalid Credentials"
- Make sure the service account email and private key are correct
- Ensure Google Sheets API is enabled

### Error "Permission Denied"
- Make sure the service account is shared with the Google Sheet
- Give "Editor" permission

### Form not submitting
- Check browser console for errors
- Verify environment variables are set correctly in Vercel

### 404 Error on API
- Make sure the API routes are properly deployed
- Test the API endpoint: `https://your-domain.vercel.app/api/test`

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── submit-form/
│   │   │   │   └── route.ts
│   │   │   └── test/
│   │   │       └── route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
├── public/
├── package.json
└── README.md
```

## 🛠️ Customization

### Adding New Form Fields

Edit `src/app/page.tsx` to add new form fields:

```tsx
<div>
  <label htmlFor="newField">New Field</label>
  <input
    type="text"
    id="newField"
    name="newField"
    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
  />
</div>
```

### Modifying API Response

Edit `src/app/api/submit-form/route.ts` to change the backend logic.

### Styling Changes

Edit `src/app/globals.css` or modify Tailwind classes in components.

## 📝 License

MIT License

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

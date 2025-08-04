# Google Sheets Form API

Form submission to Google Sheets using Vercel serverless functions.

## Setup Instructions

### 1. Google Sheets Setup

1. Create a new Google Sheet
2. Go to Google Cloud Console (https://console.cloud.google.com/)
3. Create a new project or select existing one
4. Enable Google Sheets API
5. Create a Service Account
6. Download the JSON key file
7. Share your Google Sheet with the service account email

### 2. Environment Variables

Set these environment variables in your Vercel project:

- `GOOGLE_SHEET_ID`: Your Google Sheet ID (from the URL)
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`: Service account email from JSON key
- `GOOGLE_PRIVATE_KEY`: Private key from JSON key (include the full key with quotes)

### 3. Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set the environment variables in Vercel dashboard
4. Deploy

## Troubleshooting

### 404 Error
If you get a 404 error when submitting the form:

1. Check that your API route is properly deployed
2. Verify environment variables are set in Vercel
3. Test the API endpoint: `https://your-domain.vercel.app/api/test`

### Environment Variables Not Set
If you see "Server configuration error":

1. Go to Vercel dashboard
2. Navigate to your project settings
3. Go to Environment Variables section
4. Add the required variables:
   - `GOOGLE_SHEET_ID`
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`

### Testing the API

You can test if the API is working by visiting:
- `https://your-domain.vercel.app/api/test`

This should return a JSON response indicating the API is working.

## File Structure

```
├── api/
│   ├── submit-form.js    # Main API endpoint
│   └── test.js          # Test endpoint
├── index.html           # Main form page
├── script.js            # Frontend JavaScript
├── style.css            # Styles
├── vercel.json          # Vercel configuration
└── package.json         # Dependencies
```

## API Endpoints

- `POST /api/submit-form` - Submit form data to Google Sheets
- `GET /api/test` - Test endpoint to verify API is working

## Form Fields

The form expects these fields:
- `nama` (required) - Name
- `email` (required) - Email address
- `telepon` (optional) - Phone number
- `pesan` (required) - Message

## Google Sheets Format

Data will be appended to Sheet1 with columns:
A: Name
B: Email
C: Phone
D: Message
E: Timestamp
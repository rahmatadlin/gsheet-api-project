import { google } from 'googleapis';

// Google Sheets API configuration
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { nama, email, telepon, pesan, timestamp } = req.body;

        // Validate required fields
        if (!nama || !email || !pesan) {
            return res.status(400).json({ error: 'Nama, email, dan pesan harus diisi' });
        }

        // Initialize Google Sheets API
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: GOOGLE_PRIVATE_KEY,
            },
            scopes: SCOPES,
        });

        const sheets = google.sheets({ version: 'v4', auth });

        // Prepare data for Google Sheets
        const values = [
            [
                nama,
                email,
                telepon || '',
                pesan,
                new Date(timestamp).toLocaleString('id-ID')
            ]
        ];

        // Append data to Google Sheets
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: SHEET_ID,
            range: 'Sheet1!A:E', // Adjust range as needed
            valueInputOption: 'USER_ENTERED',
            insertDataOption: 'INSERT_ROWS',
            resource: {
                values: values,
            },
        });

        console.log('Data appended successfully:', response.data);

        return res.status(200).json({
            success: true,
            message: 'Data berhasil disimpan ke Google Sheets',
            updatedRange: response.data.updates.updatedRange
        });

    } catch (error) {
        console.error('Error saving to Google Sheets:', error);
        return res.status(500).json({
            error: 'Gagal menyimpan data ke Google Sheets',
            details: error.message
        });
    }
} 
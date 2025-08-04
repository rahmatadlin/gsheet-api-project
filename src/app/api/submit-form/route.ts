import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

// Google Sheets API configuration
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

export async function POST(request: NextRequest) {
  try {
    const { nama, email, telepon, pesan, timestamp } = await request.json();

    // Validate required fields
    if (!nama || !email || !pesan) {
      return NextResponse.json(
        { error: 'Nama, email, dan pesan harus diisi' },
        { status: 400 }
      );
    }

    // Check if environment variables are set
    if (!SHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
      console.error('Environment variables not set properly');
      return NextResponse.json(
        {
          error: 'Server configuration error. Please check environment variables.',
          details: 'GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, and GOOGLE_PRIVATE_KEY must be set'
        },
        { status: 500 }
      );
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
      range: 'Sheet1!A:E',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: values,
      },
    });

    console.log('Data appended successfully:', response.data);

    return NextResponse.json({
      success: true,
      message: 'Data berhasil disimpan ke Google Sheets',
      updatedRange: response.data.updates?.updatedRange
    });

  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    return NextResponse.json(
      {
        error: 'Gagal menyimpan data ke Google Sheets',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200 });
} 
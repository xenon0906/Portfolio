import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Get Google Sheets URL from environment
    const googleSheetsUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL;

    if (!googleSheetsUrl) {
      console.error('Google Sheets URL not configured');
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const payload = JSON.stringify({
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    });

    // Submit to Google Sheets (server-side, no CORS issues)
    // Don't follow redirects - Google Apps Script returns 302 on success
    const response = await fetch(googleSheetsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload).toString(),
      },
      body: payload,
      redirect: 'manual', // Don't follow redirects
    });

    // Google Apps Script returns 302 redirect on success
    if (response.status === 302 || response.status === 303) {
      const location = response.headers.get('location');
      // If redirect contains 'echo' or 'user_content_key', it's a success response
      if (location && (location.includes('echo') || location.includes('user_content_key'))) {
        return NextResponse.json({ success: true });
      }
    }

    // If we get a 200 OK, check the response
    if (response.ok) {
      const responseText = await response.text();

      // Check for error pages
      if (responseText.includes('Script function not found') ||
          responseText.includes('Access denied') ||
          responseText.includes('You need access')) {
        console.error('Google Sheets access error');
        return NextResponse.json(
          { success: false, error: 'Form service unavailable. Please try again later.' },
          { status: 503 }
        );
      }

      // Try to parse as JSON
      try {
        const data = JSON.parse(responseText);
        if (data.result === 'success' || data.result === 'error') {
          if (data.result === 'success') {
            return NextResponse.json({ success: true });
          } else {
            return NextResponse.json(
              { success: false, error: data.error || 'Submission failed' },
              { status: 500 }
            );
          }
        }
      } catch {
        // Not JSON but response was OK - consider success
        return NextResponse.json({ success: true });
      }
    }

    // Handle error responses
    const errorText = await response.text().catch(() => '');

    if (errorText.includes('Script function not found')) {
      return NextResponse.json(
        { success: false, error: 'Form service configuration error.' },
        { status: 503 }
      );
    }

    if (errorText.includes('Access denied') || errorText.includes('You need access')) {
      return NextResponse.json(
        { success: false, error: 'Form service unavailable.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to submit form. Please try again.' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

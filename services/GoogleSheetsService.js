// Google Sheets Service for Contact Form
const GOOGLE_SHEETS_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL || '';
const FALLBACK_EMAIL = 'siddhanthkunwar@gmail.com';

const googleSheetsService = {
  // Submit form data to Google Sheets
  async submitForm(formData) {
    if (!GOOGLE_SHEETS_URL) {
      throw new Error('Google Sheets URL not configured');
    }

    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        timestamp: new Date().toISOString(),
      }),
    });

    return { success: true };
  },

  // Fallback to mailto link
  fallbackSubmit(formData) {
    const { name, email, message } = formData;
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${body}`;
  },

  // Check if Google Sheets is configured
  isConfigured() {
    return !!GOOGLE_SHEETS_URL;
  }
};

export default googleSheetsService;

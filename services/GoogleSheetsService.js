// Google Sheets Service for Contact Form
// Uses the /api/contact route for server-side submission

const googleSheetsService = {
  // Submit form data via API route
  async submitForm(formData) {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Failed to submit form');
    }

    return data;
  },
};

export default googleSheetsService;

/**
 * Google Sheets Integration Service
 *
 * Setup Instructions:
 * 1. Create a Google Apps Script Web App:
 *    - Go to https://script.google.com
 *    - Create a new project
 *    - Paste the following code:
 *
 * ```javascript
 * function doPost(e) {
 *   try {
 *     var sheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID').getActiveSheet();
 *     var data = JSON.parse(e.postData.contents);
 *
 *     sheet.appendRow([
 *       new Date(),
 *       data.name,
 *       data.email,
 *       data.message
 *     ]);
 *
 *     return ContentService
 *       .createTextOutput(JSON.stringify({ success: true }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   } catch (error) {
 *     return ContentService
 *       .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   }
 * }
 * ```
 *
 * 2. Deploy the script:
 *    - Click "Deploy" > "New deployment"
 *    - Select type: "Web app"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 *    - Copy the deployment URL
 *
 * 3. Add the URL to your .env file:
 *    VITE_GOOGLE_SHEETS_URL=your_deployment_url_here
 *
 * 4. Create a Google Sheet with columns: Timestamp, Name, Email, Message
 */

class GoogleSheetsService {
  constructor() {
    this.scriptUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;
    this.fallbackEmail = import.meta.env.VITE_FALLBACK_EMAIL || 'mailto:siddhanth.kunwar2015@gmail.com';
  }

  /**
   * Submit form data to Google Sheets
   * @param {Object} formData - Form data to submit
   * @param {string} formData.name - Sender's name
   * @param {string} formData.email - Sender's email
   * @param {string} formData.message - Message content
   * @returns {Promise<Object>} Response object
   */
  async submitForm(formData) {
    // Validate form data
    if (!formData.name || !formData.email || !formData.message) {
      throw new Error('All fields are required');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      throw new Error('Invalid email format');
    }

    // If no Google Sheets URL is configured, use fallback
    if (!this.scriptUrl) {
      console.warn('Google Sheets URL not configured. Using fallback method.');
      return this.fallbackSubmit(formData);
    }

    try {
      const response = await fetch(this.scriptUrl, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
        }),
      });

      // Due to no-cors mode, we can't read the response
      // Assume success if no error was thrown
      console.log('Form submitted to Google Sheets successfully');

      // Also save to localStorage as backup
      this.saveToLocalStorage(formData);

      return {
        success: true,
        message: 'Form submitted successfully!',
      };
    } catch (error) {
      console.error('Error submitting to Google Sheets:', error);

      // Save to localStorage as backup
      this.saveToLocalStorage(formData);

      throw new Error('Failed to submit form. Please try again later.');
    }
  }

  /**
   * Fallback method when Google Sheets is not configured
   * Opens default email client
   */
  fallbackSubmit(formData) {
    const subject = encodeURIComponent(`Portfolio Contact: ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );

    // Save to localStorage
    this.saveToLocalStorage(formData);

    // Open email client
    window.location.href = `${this.fallbackEmail}?subject=${subject}&body=${body}`;

    return {
      success: true,
      message: 'Opening email client...',
      fallback: true,
    };
  }

  /**
   * Save form submission to localStorage as backup
   */
  saveToLocalStorage(formData) {
    try {
      const submissions = this.getSubmissions();
      submissions.push({
        ...formData,
        timestamp: new Date().toISOString(),
      });

      // Keep only last 50 submissions
      if (submissions.length > 50) {
        submissions.shift();
      }

      localStorage.setItem('contact_submissions', JSON.stringify(submissions));
      console.log('Form data saved to localStorage');
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  /**
   * Get all submissions from localStorage
   */
  getSubmissions() {
    try {
      const stored = localStorage.getItem('contact_submissions');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  }

  /**
   * Clear all submissions from localStorage
   */
  clearSubmissions() {
    try {
      localStorage.removeItem('contact_submissions');
      console.log('Submissions cleared from localStorage');
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  /**
   * Check if Google Sheets integration is configured
   */
  isConfigured() {
    return !!this.scriptUrl;
  }
}

// Export singleton instance
export const googleSheetsService = new GoogleSheetsService();
export default googleSheetsService;

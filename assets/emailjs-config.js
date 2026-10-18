/*
 * EmailJS configuration for the "Forgot password" flow.
 *
 * Setup (https://www.emailjs.com):
 *  1. Add an Email Service (e.g. Gmail) and copy its Service ID.
 *  2. Create an Email Template. Set "To Email" to {{to_email}} and use
 *     {{passcode}} for the 6-digit code, {{to_name}} for the name and
 *     {{expires_in}} for the expiry (minutes) inside the message body.
 *  3. Copy your Public Key from Account > General.
 *  4. Paste the three values below.
 *
 * Note: the EmailJS public key is designed to be exposed in browser code.
 */
window.EMAILJS_CONFIG = {
  publicKey: '',
  serviceId: '',
  templateId: ''
};

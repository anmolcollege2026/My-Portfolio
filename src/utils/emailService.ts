// import emailjs from '@emailjs/browser'; // [EmailJS Disabled - Using Web3Forms]

export interface SendEmailParams {
  name: string;
  email: string;
  message: string;
}

export interface SendEmailResult {
  success: boolean;
  message?: string;
}

/**
 * Sends contact email via Web3Forms API Key
 */
export async function sendContactEmail(params: SendEmailParams): Promise<SendEmailResult> {
  const web3formsKey = import.meta.env.VITE_EMAIL_API_KEY || import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  /*
  // --- [EmailJS Code Commented Out] ---
  const emailJsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const emailJsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const emailJsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (emailJsServiceId && emailJsTemplateId && emailJsPublicKey) {
    try {
      const response = await emailjs.send(
        emailJsServiceId,
        emailJsTemplateId,
        {
          name: params.name,
          from_name: params.name,
          user_name: params.name,
          email: params.email,
          from_email: params.email,
          user_email: params.email,
          reply_to: params.email,
          message: params.message,
          to_name: 'Anmol Verma',
        },
        emailJsPublicKey
      );

      if (response.status === 200) {
        return { success: true };
      }
      return { success: false, message: `EmailJS responded with status: ${response.status}` };
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : String(error);
      return { success: false, message: errMsg || 'Failed to send via EmailJS' };
    }
  }
  */

  // 2. Check if Web3Forms API Key is provided
  if (web3formsKey) {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: web3formsKey,
          name: params.name,
          email: params.email,
          message: params.message,
          subject: `Portfolio Transmission from ${params.name}`,
          from_name: `${params.name} (Portfolio Inquiry)`,
        }),
      });

      const data = await response.json();
      if (data.success) {
        return { success: true };
      }
      return { success: false, message: data.message || 'Transmission could not be delivered.' };
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : String(error);
      return { success: false, message: errMsg || 'Network error while contacting mail relay.' };
    }
  }

  // 3. If neither API key is set, log instructions and notify user
  console.warn(
    '[EMAIL CONFIG MISSING] Neither EmailJS nor Web3Forms API key was found in .env.\n' +
    'Please set VITE_EMAIL_API_KEY (for Web3Forms) or VITE_EMAILJS_PUBLIC_KEY in your .env file.'
  );

  return {
    success: false,
    message: 'API Key not configured. Please add your VITE_EMAIL_API_KEY to the .env file.'
  };
}
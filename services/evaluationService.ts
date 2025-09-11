
import { User, EvaluationResult } from '../types.ts';

// IMPORTANT: This is the correct URL provided by the user.
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyyrswCypKJexmG8g7yt0m89IANEhmV1CgZ5kI9UbH3kkJ4gdimKJqaoC96ZroVkFVQ/exec';

/**
 * Saves the evaluation results to Google Sheets.
 * This function sends a payload containing the user object and an array of evaluation
 * results. The corresponding Google Apps Script is expected to loop through the
 * evaluation array and create a new row for each item.
 * @param {User} user The user object.
 * @param {EvaluationResult[]} evaluation The array of evaluation results.
 */
export const saveEvaluation = async (user: User, evaluation: EvaluationResult[]): Promise<void> => {
  if (!GOOGLE_SCRIPT_URL) {
    console.warn('Evaluation not saved: Google Apps Script URL is not set.');
    return;
  }

  // This payload matches the "long" format required by the Google Sheet and the updated Apps Script.
  const payload = {
    user: {
      id: user.id,
      name: user.name,
      charge: user.charge,
      level: user.level,
      companyName: user.companyName,
    },
    evaluation: evaluation.map(result => ({
      behavior: result.behavior,
      score: result.score,
      option: result.option,
      justification: result.justification,
    })),
  };

  const body = JSON.stringify(payload);

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body,
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Script returned a non-OK response:', response.status, response.statusText);
      console.error('Response body:', errorText);
      throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const responseData = await response.json();
      console.log('Successfully saved evaluation:', responseData);
    } else {
      const responseText = await response.text();
      console.warn('Response was not JSON. This often indicates an error in the Google Apps Script.');
      console.log('Raw response from server:', responseText);
    }

  } catch (error) {
    console.error(
      'Failed to send evaluation results. Check CORS, network, or the Google Apps Script endpoint.',
      error
    );
  }
};

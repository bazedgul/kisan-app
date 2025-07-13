import twilio from 'twilio';

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

export const sendWhatsApp = async (messageBody) => {
  try {
    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP,
      to: process.env.ADMIN_PHONE,
      body: messageBody
    });
    console.log('✅ WhatsApp message sent');
  } catch (err) {
    console.error('❌ Failed to send WhatsApp', err.message);
  }
};

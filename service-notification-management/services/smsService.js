const axios = require('axios');
const {sanitizeObject} = require('./sanitization_functions')

const sendSMS = async (recipientPhoneNo, message) => {
  try {
    const response = await axios.post('https://app.notify.lk/api/v1/send', {
        api_key: 'YzyPFtft2NttEqZIsgjX',
        user_id:"27151",
        sender_id:"NotifyDEMO",
        message:message,
        to: `94${recipientPhoneNo.slice(-9)}`
    });
    console.log(sanitizeObject(response.data));
    return response.data; // Return the response from Notify.lk
  } catch (error) {
    console.error(sanitizeObject(error.response.data));
    res.status(500).send('Failed to send notification');
}
};

module.exports = {sendSMS };

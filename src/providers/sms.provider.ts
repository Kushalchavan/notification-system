export const sendSMS = async (
  phone: string,
  message: string
) => {
  console.log("SMS sent", {
    phone,
    message,
  });
};
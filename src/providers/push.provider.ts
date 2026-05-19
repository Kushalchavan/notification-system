export const sendPush = async (
  deviceId: string,
  message: string
) => {
  console.log("Push sent", {
    deviceId,
    message,
  });
};
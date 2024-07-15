const crypto = require("crypto");

exports.checkClickSignature = (data, signString) => {
  const {
    transId,
    serviceId,
    userId,
    merchantPrepareId,
    amount,
    action,
    signTime,
  } = data;

  const CLICK_SECRET_KEY = process.env.CLICK_SECRET_KEY;

  const prepareId = merchantPrepareId || "";

  const signature = `${transId}${serviceId}${CLICK_SECRET_KEY}${userId}${prepareId}${amount}${action}${signTime}`;

  const signatureHash = crypto
    .createHash("md5")
    .update(signature)
    .digest("hex");

  return signatureHash === signString;
};

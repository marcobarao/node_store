const config = require("../config");
const sendgrid = require("sendgrid")(config.sendGridKey);

exports.send = async (to, subject, html) => {
  sendgrid.send({
    to,
    from: "noreply@nodestore.com",
    subject,
    html
  });
};

const util = require("../helpers/utils/util");
const auth = require("../helpers/utils/auth");

exports.verify = (requestBody) => {
  const username = requestBody.username;
  const token = requestBody.token;
  if (!username || !token) {
    return util.buildResponse(401, {
      verified: false,
      message: "Incorrect request body",
    });
  }

  const verification = auth.verifyToken(username, token);

  if (!verification.verified) {
    return util.buildResponse(401, verification);
  }

  return util.buildResponse(200, {
    verified: true,
    message: "success",
    username: username,
    token: token,
  });
};

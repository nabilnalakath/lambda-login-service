const util = require("../helpers/utils/util");

const userDB = require("../helpers/dbHelpers/users");

const bcrypt = require("bcryptjs");

exports.register = async (userInfo) => {
  const username = userInfo.username;
  const name = userInfo.name;
  const password = userInfo.password;

  if (!username || !password || !name) {
    return util.buildResponse(401, {
      message: "All fields are required",
    });
  }

  const dynamoUser = await userDB.getUser(username);
  if (dynamoUser && dynamoUser.username) {
    return util.buildResponse(401, {
      message: "User already exists",
    });
  }

  const encryptedPassword = bcrypt.hashSync(password.trim(), 10);
  const user = {
    name: name,
    username: username.toLowerCase(),
    password: encryptedPassword,
  };

  const savedUserResponse = await userDB.saveUser(user);
  if (!savedUserResponse) {
    return util.buildResponse(503, { message: "server error" });
  }

  return util.buildResponse(200, { username: username });
};


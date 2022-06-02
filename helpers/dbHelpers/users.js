const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });

const dynamoDB = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });

const userTable = "user-table";

exports.getUser = async (username) => {
  const params = {
    TableName: userTable,
    Key: {
      username: username,
    },
  };
  return await dynamoDB
    .get(params)
    .promise()
    .then(
      (response) => {
        return response.Item;
      },
      (error) => {
        console.log("Error fetching user", error);
      }
    );
};

exports.saveUser = async (user) => {
  const params = {
    TableName: userTable,
    Key: {
      username: user.username,
    },
    Item: user,
  };

  return await dynamoDB
    .put(params)
    .promise()
    .then(
      (response) => {
        return true;
      },
      (error) => {
        console.log("Error saving user", error);
      }
    );
};

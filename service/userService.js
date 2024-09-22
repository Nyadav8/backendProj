const PgConnection = require("../database/database");
const LoginResponse = require("../models/response/LoginResponse");
const VerifyUser = require("../models/other/VerifyUser");
const UserDetails = require("../models/other/UserDetails");

module.exports.loginUser = function loginUser(loginRequest) {
  const pgConnection = PgConnection.getInstance();
  return new Promise(async (resolve, reject) => {
    try {
      const email = loginRequest.email;
      const password = loginRequest.password;
      let query = `SELECT * FROM users u WHERE u.email = '${email}' AND u.password = '${password}' `;
      const param = [email, password];
      const rows = await pgConnection.query(query);
      let loginResponse = new LoginResponse("FAILURE");
      if (rows !== null && typeof rows !== "undefined") {
        const user = rows[0];
        loginResponse.status = "SUCCESS";
        loginResponse.id = user.id;
        loginResponse.firstName = user.first_name;
        loginResponse.lastName = user.last_name;
        loginResponse.email = user.email;
        loginResponse.designation = user.designation;
      }
      resolve(loginResponse);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports.verifyUser = function verifyUser(userData) {
  const pgConnection = PgConnection.getInstance();
  return new Promise(async (resolve, reject) => {
    try {
      const userId = userData.userId;
      let query = `SELECT * FROM users u WHERE u.id = ${userId} AND u.status = 'ACTIVE' `;
      const param = [userId];
      const rows = await pgConnection.query(query);
      let verifyUser = new VerifyUser();
      if (rows !== null && typeof rows !== "undefined") {
        const user = rows[0];
        verifyUser.status = "SUCCESS";
        verifyUser.id = rows[0].id;
        verifyUser.firstName = rows[0].first_name;
        verifyUser.lastName = rows[0].last_name;
        verifyUser.designation = rows[0].designation;
      } else {
        verifyUser.status = "FAILURE";
        verifyUser.responseMessage = "Invalid User";
      }
      resolve(verifyUser);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports.getUserByEmailId = function getUserByEmailId(email) {
  const pgConnection = PgConnection.getInstance();
  return new Promise(async (resolve, reject) => {
    try {
      let query = `SELECT * FROM users u WHERE u.email = '${email}' `;
      const param = [email];
      const rows = await pgConnection.query(query);
      let userDetails;
      if (rows !== null && typeof rows !== "undefined") {
        userDetails = new UserDetails();
        userDetails.id = rows[0].id;
        userDetails.email = rows[0].email;
        userDetails.firstName = rows[0].first_name;
        userDetails.lastName = rows[0].last_name;
        userDetails.designation = rows[0].designation;
      }
      resolve(userDetails);
    } catch (error) {
      reject(error);
    }
  });
};

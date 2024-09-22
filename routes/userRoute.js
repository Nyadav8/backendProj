const express = require("express");
const router = express.Router();
const ApiResponse = require("../_helper/apiResponse");
const LoginRequest = require("../models/request/LoginRequest");
const UserService = require("../service/userService");

router.post("/login", async (req, res) => {
  const loginRequest = new LoginRequest(req.body);
  let loginResponse = await UserService.loginUser(loginRequest);
  res.send(new ApiResponse(loginResponse));
});

module.exports = router;

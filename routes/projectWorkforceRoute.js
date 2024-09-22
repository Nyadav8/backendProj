const express = require("express");
const router = express.Router();
const ApiResponse = require("../_helper/apiResponse");
const CreateProjectWorkforceRequest = require("../models/request/CreateProjectWorkforceRequest");
const ProjectWorkForceMappingService = require("../service/projectWorkForceMappingService");
const UserDetails = require("../models/request/UserDataRequest");

router.post("/create", async (req, res) => {
  const userData = new UserDetails(JSON.parse(req.headers.userdata));
  console.log(userData, req.headers.userdata);
  const createProjectWorkforceRequest = new CreateProjectWorkforceRequest(
    req.body
  );
  let createProjectWorkforceResponse =
    await ProjectWorkForceMappingService.createProjectWorkforceRequest(
      userData,
      createProjectWorkforceRequest
    );
  res.send(new ApiResponse(createProjectWorkforceResponse));
});

router.post("/list/:projectId", async (req, res) => {
  const userData = new UserDetails(JSON.parse(req.headers.userdata));
  const projectId = req.params.projectId;
  const limit = req.body.limit;
  const offset = req.body.offset;
  let projectWorkforceListRespose =
    await ProjectWorkForceMappingService.getProjectWorkforceList(
      userData,
      projectId,
      limit,
      offset
    );
  console.log(projectWorkforceListRespose);
  res.send(new ApiResponse(projectWorkforceListRespose));
});

module.exports = router;

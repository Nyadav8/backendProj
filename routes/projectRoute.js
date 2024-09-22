const express = require("express");
const router = express.Router();
const ApiResponse = require("../_helper/apiResponse");
const UserDetails = require("../models/request/UserDataRequest");
const ProjectService = require("../service/projectService");
const CreateProjectRequest = require("../models/request/CreateProjectRequest");
const EditBudgetRequest = require("../models/request/EditBudgetRequest");

router.post("/getProjectList", async (req, res) => {
  const userData = new UserDetails(JSON.parse(req.headers.userdata));
  let projectListResponse = await ProjectService.getProjectList(userData);
  res.send(new ApiResponse(projectListResponse));
});

router.post("/create", async (req, res) => {
  console.log(req.headers.userdata, "123");
  const userData = new UserDetails(JSON.parse(req.headers.userdata));
  console.log(userData);
  const createProjectRequest = new CreateProjectRequest(req.body);
  let response = await ProjectService.createProject(
    userData,
    createProjectRequest
  );
  res.send(new ApiResponse(response));
});

router.post("/editBudget", async (req, res) => {
  const userData = new UserDetails(JSON.parse(req.headers.userdata));
  const editBudgetRequest = new EditBudgetRequest(req.body);
  let editBudgetResponse = await ProjectService.editBudget(
    userData,
    editBudgetRequest
  );
  res.send(new ApiResponse(editBudgetResponse));
});

module.exports = router;

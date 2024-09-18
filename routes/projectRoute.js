const express = require("express");
const router = express.Router();
const ApiResponse = require("../_helper/apiResponse");
const ProjectService = require("../service/projectService");
const [
  ProjectCreateRequest,
  ProjectListRequest,
] = require("../models/projectRequest");

router.get("/getProjectList", async (req, res) => {
  let projectListRes = await ProjectService.productList();
  res.send(new ApiResponse(projectListRes));
});

router.post("/createProject", async (req, res) => {
  console.log(req.headers);
  let ProjectCreateReq = new ProjectCreateRequest(req.body);
  try {
    let projectListRes = await ProjectService.createProject(ProjectCreateReq);
    res.send(new ApiResponse(projectListRes));
  } catch (err) {
    res.send(new ApiResponse(err));
  }
});

module.exports = router;

const PgConnection = require("../database/database");
const UserService = require("./userService");
const CreateProjectWorkforceResponse = require("../models/response/CreateProjectWorkforceResponse");
const ProjectWorkforceListResponse = require("../models/response/ProjectWorkforceListResponse");
const ProjectWorkforceDetail = require("../models/other/ProjectWorkforceDetail");

module.exports.createProjectWorkforceRequest =
  function createProjectWorkforceRequest(
    userData,
    createProjectWorkforceRequest
  ) {
    return new Promise(async (resolve, reject) => {
      const verifyUser = await UserService.verifyUser(userData);
      let createProjectWorkforceResponse = new CreateProjectWorkforceResponse();
      if (verifyUser.status === "FAILURE") {
        createProjectWorkforceResponse.status = verifyUser.status;
        createProjectWorkforceResponse.responseMessage =
          verifyUser.responseMessage;
        resolve(createProjectWorkforceResponse);
      }
      try {
        const pgConnection = PgConnection.getInstance();
        const projectId = createProjectWorkforceRequest.projectId;
        const memberName = createProjectWorkforceRequest.memberName;
        const designation = createProjectWorkforceRequest.designation;
        const department = createProjectWorkforceRequest.department;
        const budget = createProjectWorkforceRequest.budget;
        const location = createProjectWorkforceRequest.location;

        let query = `INSERT INTO project_workforce_mapping (project_id, name, designation, department, budget, location, status) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
        const param = [
          projectId,
          memberName,
          designation,
          department,
          budget,
          location,
          "ACTIVE",
        ];
        const rows = await pgConnection.query(query, ...param);
        createProjectWorkforceResponse.status = "SUCCESS";
        resolve(createProjectWorkforceResponse);
      } catch (error) {
        reject(error);
      }
    });
  };

module.exports.getProjectWorkforceList = function getProjectWorkforceList(
  userData,
  projectId,
  limit,
  offset
) {
  return new Promise(async (resolve, reject) => {
    const verifyUser = await UserService.verifyUser(userData);
    let projectWorkforceListResponse = new ProjectWorkforceListResponse();
    if (verifyUser.status === "FAILURE") {
      projectWorkforceListResponse.status = verifyUser.status;
      projectWorkforceListResponse.responseMessage = verifyUser.responseMessage;
      resolve(projectWorkforceListResponse);
    }
    try {
      const pgConnection = PgConnection.getInstance();
      let query =
        "SELECT pwm.id as workforceId, pwm.name as name, pwm.designation as designation, pwm.department as department, pwm.budget as budget, pwm.location as location FROM project_workforce_mapping pwm WHERE pwm.project_id = $1 AND pwm.status = $2 LIMIT $3 OFFSET $4";
      const param = [projectId, "ACTIVE", limit, offset];
      const rows = await pgConnection.query(query, ...param);
      let query2 =
        "SELECT pwm.id as workforceId, pwm.name as name, pwm.designation as designation, pwm.department as department, pwm.budget as budget, pwm.location as location FROM project_workforce_mapping pwm WHERE pwm.project_id = $1 AND pwm.status = $2";
      const param2 = [projectId, "ACTIVE"];
      let query3 = "SELECT budget FROM project WHERE id = $1";
      const param3 = [projectId];
      const rows3 = await pgConnection.query(query3, ...param3);
      console.log(rows3, "idgaf");
      const rows2 = await pgConnection.query(query2, ...param2);
      let data = {};
      let budgett = 0;
      if (rows !== null && typeof rows !== "undefined") {
        for (let i = 0; i < rows2.length; i++) {
          console.log(Number(rows2[i].budget));

          data[rows2[i].department]
            ? (data[rows2[i].department] += parseFloat(rows2[i].budget))
            : (data[rows2[i].department] = parseFloat(rows2[i].budget));
        }
      }
      for (const value of Object.values(data)) {
        budgett += parseFloat(value);
      }
      projectWorkforceListResponse.total = rows3[0].budget;
      projectWorkforceListResponse.totalBudget = budgett;
      projectWorkforceListResponse.data = data;
      projectWorkforceListResponse.totalRecords = rows.length || 0;
      console.log(rows);
      projectWorkforceListResponse.status = "SUCCESS";
      if (rows !== null && typeof rows !== "undefined") {
        for (let i = 0; i < rows.length; i++) {
          let workforceId = rows[i].workforceid;
          let name = rows[i].name;
          let budget = rows[i].budget;
          let designation = rows[i].designation;
          let department = rows[i].department;
          let location = rows[i].location;
          let createTime = rows[i].createTime;
          let projectWorkforceDetails = new ProjectWorkforceDetail(
            workforceId,
            name,
            designation,
            department,
            budget,
            location,
            createTime
          );
          console.log(projectWorkforceDetails);

          projectWorkforceListResponse.projectWorkforceDetail.push(
            projectWorkforceDetails
          );
        }
      }
      console.log(projectWorkforceListResponse);
      resolve(projectWorkforceListResponse);
    } catch (error) {
      reject(error);
    }
  });
};

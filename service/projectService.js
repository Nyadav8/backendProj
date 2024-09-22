const PgConnection = require("../database/database");
const UserService = require("./userService");
const ProjectListResponse = require("../models/response/ProjectDetailsListResponse");
const ProjectDetails = require("../models/other/ProjectDetails");
const CreateProjectResponse = require("../models/response/CreateProjectResponse");
const EditBudgetResponse = require("../models/response/EditBudgetResponse");

module.exports.getProjectList = function getProjectList(userData) {
  return new Promise(async (resolve, reject) => {
    const verifyUser = await UserService.verifyUser(userData);
    let projectListResponse = new ProjectListResponse();
    if (verifyUser.status === "FAILURE") {
      projectListResponse.status = verifyUser.status;
      projectListResponse.responseMessage = verifyUser.responseMessage;
      resolve(projectListResponse);
    }
    try {
      const pgConnection = PgConnection.getInstance();
      const userId = userData.userId;
      let query = `SELECT p.id as project_id, p.project_name, p.budget as budget , count(pwm.*) as total_no_of_position, CONCAT(u.first_name, u.last_name) as coplaner FROM project p LEFT JOIN project_workforce_mapping pwm ON p.id = pwm.project_id LEFT JOIN users u ON p.coplanner_id = u.id WHERE (p.planner_id = $1 OR p.coplanner_id = $2) GROUP BY p.id, p.project_name, p.budget, u.first_name, u.last_name; `;
      const param = [userId, userId];
      const rows = await pgConnection.query(query, ...param);
      if (rows !== null && typeof rows !== "undefined") {
        for (let i = 0; i < rows.length; i++) {
          let projectId = rows[i].project_id;
          let projectName = rows[i].project_name;
          let budget = rows[i].budget;
          let totalNoOfPosition = rows[i].total_no_of_position;
          let coplaner = rows[i].coplaner;
          const projectDetails = new ProjectDetails(
            projectId,
            projectName,
            budget,
            totalNoOfPosition,
            coplaner
          );
          projectListResponse.projectDetailsList.push(projectDetails);
        }
      }
      projectListResponse.status = verifyUser.status;
      resolve(projectListResponse);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports.createProject = function createProject(
  userData,
  createProjectRequest
) {
  return new Promise(async (resolve, reject) => {
    const verifyUser = await UserService.verifyUser(userData);
    let createProjectResponse = new CreateProjectResponse();
    if (verifyUser.status === "FAILURE") {
      createProjectResponse.status = verifyUser.status;
      createProjectResponse.responseMessage = verifyUser.responseMessage;
      resolve(createProjectResponse);
    }
    try {
      const pgConnection = PgConnection.getInstance();
      const projectName = createProjectRequest.projectName;
      const projectDescription = createProjectRequest.projectDescription;
      const budget = createProjectRequest.budget;
      const plannerId = userData.userId;
      const coplaner = await UserService.getUserByEmailId(
        createProjectRequest.coplannerEmail
      );
      let coplanerId;
      if (coplaner !== null && typeof coplaner !== "undefined") {
        coplanerId = coplaner.id;
      }
      let query = `INSERT INTO project (project_name, project_description, budget, planner_id, coplanner_id, status) VALUES ($1, $2, $3, $4, $5, $6)`;
      const param = [
        projectName,
        projectDescription,
        budget,
        plannerId,
        coplanerId,
        "ACTIVE",
      ];
      const rows = await pgConnection.query(query, ...param);
      createProjectResponse.status = "SUCCESS";
      resolve(createProjectResponse);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports.editBudget = function editBudget(userData, editBudgetRequest) {
  return new Promise(async (resolve, reject) => {
    const verifyUser = await UserService.verifyUser(userData);
    let editBudgetResponse = new EditBudgetResponse();
    if (verifyUser.status === "FAILURE") {
      editBudgetResponse.status = verifyUser.status;
      editBudgetResponse.responseMessage = verifyUser.responseMessage;
      resolve(editBudgetResponse);
    }
    try {
      const pgConnection = PgConnection.getInstance();
      const projectId = editBudgetRequest.projectId;
      const budget = editBudgetRequest.budget;
      let query = `SELECT p.budget FROM project p WHERE p.id = $1 `;
      const param1 = [projectId];
      const rows1 = await pgConnection.query(query, ...param1);
      if (rows1 !== null && typeof rows1 !== "undefined") {
        console.log(parseFloat(rows1[0].budget), parseFloat(budget));
        if (parseFloat(rows1[0].budget) > parseFloat(budget)) {
          editBudgetResponse.status = "FAILURE";
          editBudgetResponse.responseMessage =
            "Budget should be more than prev!";
          resolve(editBudgetResponse);
        }
      } else {
        editBudgetResponse.status = "FAILURE";
        editBudgetResponse.responseMessage = "Project Not Found!";
        resolve(editBudgetResponse);
      }
      query = `UPDATE project SET budget = $1 WHERE id = $2`;
      const param = [budget, projectId];
      const rows = await pgConnection.query(query, ...param);
      editBudgetResponse.status = "SUCCESS";
      resolve(editBudgetResponse);
    } catch (error) {
      reject(error);
    }
  });
};

// module.exports.productList = function productList() {
//   //   const pgConnection = PgConnection.getInstance();
//   return new Promise(async (resolve, reject) => {
//     try {
//       let query = `SELECT projectName ,projDesc,coPlanner,SUM(cost) budget,COUNT(dept) as totalEmp FROM PROJECTS AS p LEFT JOIN PROJECT_DETAILS AS d ON p.projectName = d.projectName`;
//       //   const rows = await pgConnection.query(query);

//       let projectList = [];
//       for (let i = 0; i < rows.length; i++) {
//         projectList.push(new ProjectListResponse(rows[i]));
//       }
//       console.log(query);
//       resolve("ok");
//     } catch (error) {
//       reject(error);
//     } finally {
//     }
//   });
// };

// module.exports.createProject = function productList(body) {
//   //   const pgConnection = PgConnection.getInstance();
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (body) {
//         console.log(body);
//         if (!body.projectName || body.projectName.length === 0) {
//           return reject({
//             statusCode: 500,
//             status: "Project Name is required",
//           });
//         }
//         if (!body.projDesc || body.projDesc.length === 0) {
//           return reject({
//             statusCode: 500,
//             status: "Project Description is required",
//           });
//         }
//       }

//       let query = `INSERT INTO projects (projectName, projDesc, coPlanner) VALUES (
//         '${body.projectName}',
//         '${body.projDesc}',
//         '${body.coPlanner ? body.coPlanner+','+ : }'
//       )`;

//       //   const rows = await pgConnection.query(query);
//       console.log(query);
//       resolve();
//     } catch (error) {
//       reject(error);
//     } finally {
//     }
//   });
// };

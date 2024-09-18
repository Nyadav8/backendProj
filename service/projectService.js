module.exports.productList = function productList() {
  //   const pgConnection = PgConnection.getInstance();
  return new Promise(async (resolve, reject) => {
    try {
      let query = `SELECT projectName ,projDesc,coPlanner,SUM(cost) budget,COUNT(dept) as totalEmp FROM PROJECTS AS p LEFT JOIN PROJECT_DETAILS AS d ON p.projectName = d.projectName`;
      //   const rows = await pgConnection.query(query);

      let projectList = [];
      for (let i = 0; i < rows.length; i++) {
        projectList.push(new ProjectListResponse(rows[i]));
      }
      console.log(query);
      resolve("ok");
    } catch (error) {
      reject(error);
    } finally {
    }
  });
};

module.exports.createProject = function productList(body) {
  //   const pgConnection = PgConnection.getInstance();
  return new Promise(async (resolve, reject) => {
    try {
      if (body) {
        console.log(body);
        if (!body.projectName || body.projectName.length === 0) {
          return reject({
            statusCode: 500,
            status: "Project Name is required",
          });
        }
        if (!body.projDesc || body.projDesc.length === 0) {
          return reject({
            statusCode: 500,
            status: "Project Description is required",
          });
        }
      }

      let query = `INSERT INTO projects (projectName, projDesc, coPlanner) VALUES (
        '${body.projectName}', 
        '${body.projDesc}', 
        '${body.coPlanner ? body.coPlanner : "NULL"}'
      )`;

      //   const rows = await pgConnection.query(query);
      console.log(query);
      resolve();
    } catch (error) {
      reject(error);
    } finally {
    }
  });
};

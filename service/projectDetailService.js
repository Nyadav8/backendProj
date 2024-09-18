module.exports.projectPeersList = function projectPeersList(body) {
  //   const pgConnection = PgConnection.getInstance();
  return new Promise(async (resolve, reject) => {
    try {
      let query = `SELECT * from projectPeers WHERE projName = '${body.projectName}' AND department LIKE '${body.limit}%' LIMIT ${body.limit} OFFSET ${body.offset}`;

      let query2 = `SELECT COUNT(*) FROM projectPeers WHERE projName = '${body.projectName}`;

      let projectPeersList = [];
      for (let i = 0; i < rows.length; i++) {
        projectPeersList.push(rows[i]);
      }
      console.log(query);
      resolve(projectPeersList);
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

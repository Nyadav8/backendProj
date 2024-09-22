const { Pool } = require("pg");

// prod
let dbConfig = {
  user: "postgres",
  host: "127.0.0.1",
  database: "project",
  password: "Satsahib1!",
  port: 5432,
  connectionLimit: 5,
};

class PgConnection {
  constructor() {
    console.log("constructing connection");
    if (!this.pool) this.pool = new Pool(dbConfig);
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new PgConnection();
    }
    return this.instance;
  }
  query(sql, ...params) {
    return new Promise(async (resolve, reject) => {
      try {
        if (this.pool.totalCount > 5) {
          this.pool.end();
          this.pool = null;
        }
        if (!this.pool) this.pool = new Pool(dbConfig);
        console.log("pool started", this.pool.idleCount);
        console.log("pool started", this.pool.totalCount);
        console.log("pool started", this.pool.waitingCount);

        {
          const client = await this.pool.connect();
          try {
            console.log(params, sql);
            let result = await client.query(sql, params);
            const { rowCount, rows } = result;
            resolve(rowCount ? rows : []);
          } catch (error) {
            console.log("error", error);
          } finally {
            client.release();
          }
        }
      } catch (error) {
        console.log("error", error);
        reject(error);
      } finally {
        // this.disconnect();
      }
    });
  }

  disconnect() {
    if (this.pool) {
      this.pool.end();
      this.pool = null;
    }
  }
}

module.exports = PgConnection;

const express = require("express");
const app = express();
const path = require("path");
const bodyParse = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const projectRoute = require("./routes/projectRoute");

app.use(cors());
app.use(express.json());
app.use(bodyParse.urlencoded({ extended: false }));

app.use("/projects", projectRoute);

app.listen(8080, function () {
  console.log("Server is running on PORT:", 8080);
});

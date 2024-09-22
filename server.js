const express = require("express");
const app = express();
const path = require("path");
const bodyParse = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const projectRoute = require("./routes/projectRoute");
const userRoute = require("./routes/userRoute");
const projectWorkforceRoute = require("./routes/projectWorkforceRoute");

app.use(
  cors({
    origin: "http://localhost:4200", // Allow your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify the methods you want to allow
    credentials: true, // If you need to allow cookies or authentication
  })
);
app.use(express.json());
app.use(bodyParse.urlencoded({ extended: false }));

app.use("/project", projectRoute);
app.use("/users", userRoute);
app.use("/projectWorkforceRoute", projectWorkforceRoute);

app.listen(8080, function () {
  console.log("Server is running on PORT:", 8080);
});

const express = require("express");
const app = express();
const connectionDB = require("./db/connect");
const tasks = require("./routes/taskRoute");
const project = require("./routes/projectRoute");
const cors = require("cors");
require("dotenv").config();

const auth = require("./routes/authRoute");
app.use(express.json());
app.use(express.static("./public"));

app.use(cors());
const port = 3500;

app.use("/api/v1/projects", project);
app.use("/api/v1/tasks", tasks);
app.use("/api/v1/auth", auth);

console.log(process.env.MONGO_URI);
const start = async () => {
  try {
    await connectionDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening to port ${port}....`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

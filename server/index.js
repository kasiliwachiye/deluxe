const express = require("express");
const dbConnect = require("./startup/dbConnect");

const users = require("./routes/users.routes");
const auth = require("./routes/auth.routes");

const app = express();

dbConnect();

app.use(express.json());
app.use("/api/auth", auth);
app.use("/api/users", users);


app.listen(8080, () => {
  console.log("App is running on port 8080");
});

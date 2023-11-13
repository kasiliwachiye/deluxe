const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Configure CORS options
const corsOptions = {
  origin: ["http://localhost:3000"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const dbConnect = require("./startup/dbConnect");

dbConnect();

const users = require("./routes/users.routes");
const auth = require("./routes/auth.routes");
const makes = require("./routes/makes.routes");
const models = require("./routes/models.routes");
const bts = require("./routes/bodyTypes.routes");

// Apply middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/makes", makes);
app.use("/api/models", models);
app.use("/api/body-types", bts);

app.listen(8080, () => {
  console.log("App is running on port 8080");
});

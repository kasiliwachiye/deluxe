const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const dbConnect = require("./startup/dbConnect");

const users = require("./routes/users.routes");
const auth = require("./routes/auth.routes");
const make = require("./routes/make.routes");

const app = express();

dbConnect();

// Configure CORS options
const corsOptions = {
  origin: ["http://localhost:3000"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Apply middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/make", make);

app.listen(8080, () => {
  console.log("App is running on port 8080");
});

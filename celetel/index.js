const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const entryRoute = require("./routes/entry");
require("./database");

const app = express();
const PORT = process.env.PORT || 5001;
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "frontend", "build")));
// ...
// Right before your app.listen(), add this:

app.use("/api/", authRoute);
app.use("/api/", userRoute);
app.use("/api/", entryRoute);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});
const server = app.listen(PORT, () => {
  console.log("Server running on port ", PORT);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

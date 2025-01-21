const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const cors = require("cors");

// Middleware
app.use(cors());
app.use(express.json()); // Middleware untuk parsing JSON
app.use(express.urlencoded({ extended: true })); // Middleware untuk parsing form data
app.use(express.static(path.join(__dirname, "publics")));

// View engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Routing
app.get("/", (req, res) => {
  res.render("home");
});

const UserRouters = require("./routers/userRouters");
app.use("/api/users", UserRouters);

// Start server
app.listen(PORT, () => {
  console.log(`Server is up and running on http://localhost:${PORT}`);
});

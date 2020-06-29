const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const members = require("./Members");
const logger = require("./middleware/logger");

const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Homepage
app.get("/", (req, res) =>
  res.render("index", {
    title: "Members App",
    members,
  })
);
// Init middleware
app.use(logger);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Members API Routes
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on ${PORT}`));

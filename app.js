import express from "express";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get(
  "/",
  (req, res, next) => {
    res.locals.simulator = "active";
    res.locals.theory = "";
    res.locals.procedure = "";
    res.locals.quiz = "";
    res.locals.assignment = "";
    res.locals.activity = "";

    next();
  },
  (req, res) => {
    res.render("home.ejs");
  }
);

app.get(
  "/quiz",
  (req, res, next) => {
    res.locals.simulator = "";
    res.locals.theory = "";
    res.locals.procedure = "";
    res.locals.quiz = "active";
    res.locals.assignment = "";
    res.locals.activity = "";

    next();
  },
  (req, res) => {
    res.render("quiz.ejs");
  }
);

app.get(
  "/theory",
  (req, res, next) => {
    res.locals.simulator = "";
    res.locals.theory = "active";
    res.locals.procedure = "";
    res.locals.quiz = "";
    res.locals.assignment = "";
    res.locals.activity = "";

    next();
  },
  (req, res) => {
    res.render("theory.ejs");
  }
);

app.get(
  "/procedure",
  (req, res, next) => {
    res.locals.simulator = "";
    res.locals.theory = "";
    res.locals.procedure = "active";
    res.locals.quiz = "";
    res.locals.assignment = "";
    res.locals.activity = "";
    next();
  },
  (req, res) => {
    res.render("procedure.ejs");
  }
);

app.get(
  "/assignment",
  (req, res, next) => {
    res.locals.simulator = "";
    res.locals.theory = "";
    res.locals.procedure = "";
    res.locals.quiz = "";
    res.locals.assignment = "active";
    res.locals.activity = "";
    next();
  },
  (req, res) => {
    res.render("assignment.ejs");
  }
);

app.get(
  "/activity",
  (req, res, next) => {
    res.locals.simulator = "";
    res.locals.theory = "";
    res.locals.procedure = "";
    res.locals.quiz = "";
    res.locals.assignment = "";
    res.locals.activity = "active";
    next();
  },
  (req, res) => {
    res.render("activity.ejs");
  }
);

app.listen(port, () => {
  console.log("server is running on port " + port);
});

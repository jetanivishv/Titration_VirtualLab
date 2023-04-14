import express from "express";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/quiz", (req, res) => {
  res.render("quiz.ejs");
});

app.get("/theory", (req, res) => {
  res.render("theory.ejs");
});

app.get("/procedure", (req, res) => {
  res.render("procedure.ejs");
});

app.listen(port, () => {
  console.log("server is running on port " + port);
});

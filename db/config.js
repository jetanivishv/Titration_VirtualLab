import mongoose from "mongoose";

const dbUrl = "mongodb://localhost:27017/virtualLab";

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected with database");
  })
  .catch((err) => {
    console.log("Error while connecting with database");
    console.log(("Errror >> ", err));
  });

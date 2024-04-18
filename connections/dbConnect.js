const mongoose = require("mongoose");
const dotenv = require("dotenv");
// DB 設定
dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect("mongodb://127.0.0.1:27017/post")
  .then(() => {
    console.log("connect success");
  })
  .catch((e) => {
    console.log(e);
  });

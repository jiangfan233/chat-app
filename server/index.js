const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);

// 连接 Mongo DB 并用promose 接收返回值
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successful!");
  })
  .catch((err) => {
    console.log(er.message);
  });

const server = app.listen(process.env.PORT, () => {
  // console.log(process.env.PORT);
  console.log(`Server Started on Port ${process.env.PORT}`);
});

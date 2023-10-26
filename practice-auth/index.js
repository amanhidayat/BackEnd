const express = require("express");
const PORT = 2000;
// const cors = require("cors")
const db = require("./models");

const app = express();
app.use(express.json());
// app.use(cors())

app.get("/api", (req, res) => {
  res.send("this is my API");
});

const { userRouter } = require("./routers");
app.use("/users", userRouter);


app.listen(PORT, () => {
// db.sequelize.sync({ alter: true })
  console.log(`server running on port : ${PORT}`);
});


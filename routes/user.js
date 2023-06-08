const jwt = require("jsonwebtoken");
const userRouter = require("express").Router();
const authRequired = require("./utils");
const { getuserbyusername } = require("../DB/adapters/users");
const { getpublicroutinesbyuser } = require("../DB/adapters/routines");

userRouter.use((req, res, next) => {
  console.log("-----A REQUEST HAS BEEN MADE TO /user-----");
  next();
});

userRouter.get("/me", authRequired, async (req, res, next) => {
  res.send(req.user);
});

userRouter.get("/:username/routines", async (req, res, next) => {
  console.log("results?", await getpublicroutinesbyuser("frank"));
  const usersroutines = await getpublicroutinesbyuser(req.params.username);
  res.send(usersroutines);
});
module.exports = userRouter;

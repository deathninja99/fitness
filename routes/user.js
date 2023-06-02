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
  const token = req.signedCookies.token;
  const user = jwt.verify(token, process.env.JWT_TOKEN);
  console.log("req.user", user);
  console.log("user.id,", user.id);

  //this is probably so unsecure
  res.send(await getuserbyusername(user.username));
});

userRouter.get("/:username/routines", async (req, res, next) => {
  console.log("results?", await getpublicroutinesbyuser("frank"));
  res.send(await getpublicroutinesbyuser(req.params.username));
});
module.exports = userRouter;

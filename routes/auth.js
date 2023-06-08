const jwt = require("jsonwebtoken");
const authRouter = require("express").Router();
const authRequired = require("./utils");

const {
  createuser,
  getuser,
  getuserbyusername,
} = require("../DB/adapters/users");

authRouter.use((req, res, next) => {
  console.log("-----A REQUEST HAS BEEN MADE TO /AUTH-----");
  next();
});

authRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body.user;
    const taken = await getuserbyusername(username);
    console.log("Taken: ", taken);
    if (taken) {
      next({
        message: "username already taken",
        name: "auth error",
      });
      return;
    }
    console.log("before creatuser");
    const user = await createuser({ username, password });
    console.log("after createuser");
    delete user.password;
    const token = jwt.sign(user, process.env.JWT_TOKEN);
    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    delete user.password;
    res.send(user);
  } catch (error) {
    next(error);
  }
});

authRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const match = await getuser({ username, password });
    if (match) {
      delete user.password;
      const token = jwt.sign({ username }, process.env.JWT_TOKEN);
      res.cookie("token", token, {
        sameSite: "strict",
        httpOnly: true,
        signed: true,
      });
      res.send(user);
    }
  } catch (error) {
    next(error);
  }
});

authRouter.get("/logout", async (req, res, next) => {
  res.clearCookie("token", {
    sameSite: "strict",
    httpOnly: true,
    signed: true,
  });
  res.send({
    loggeding: false,
    message: "logged out!",
  });
});
authRouter.get("/me", authRequired, (req, res, next) => {
  res.send({ success: true, message: "you are athorized", user: req.uesr });
});

module.exports = authRouter;
//

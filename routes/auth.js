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
    console.log("req", req.body);
    const { username, password } = req.body;
    const taken = await getuserbyusername(username);
    console.log("Taken: ", taken);
    if (taken) {
      next({
        message: "username already taken",
        name: "auth error",
      });
      return;
    }

    const user = await createuser({ username, password });
    delete user.password;
    const token = jwt.sign(user, process.env.JWT_TOKEN);
    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    delete user.password;
    const success = true;
    res.send({ success, data: user, message: "registry successfull" });
  } catch (error) {
    next(error);
  }
});

authRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log("body in login function", req.body);
    const match = await getuser({ username, password });
    if (match) {
      console.log(match);
      delete match.user.password;
      const token = jwt.sign({ username }, process.env.JWT_TOKEN);
      res.cookie("token", token, {
        sameSite: "strict",
        httpOnly: true,
        signed: true,
      });
      const data = match.user;
      const success = true;
      console.log("in login .post?");
      console.log("in /login", user, success);
      res.send({ data, success });
    } else {
      res.status(401);
      next({ message: "invalid credientals" });
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
  try {
    console.log("/me", req.user);
    res.send({ success: true, message: "you are athorized", user: req.user });
  } catch (error) {
    next(error);
  }
});

module.exports = authRouter;
//

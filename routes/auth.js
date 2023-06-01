const authRouter = require("express").Router();

const jwt = require("jsonwebtoken");
const {
  createuser,
  getuser,
  getuserbyusername,
} = require("../DB/adapters/users");

authRouter.use((req, res, next) => {
  console.log("-----A REQUEST HAS BEEN MADE TO /AUTH-----");
  next();
});
authRouter.get("/test", async (req, res, next) => {
  res.send("Auth router test!");
});

authRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const taken = await getuserbyusername(username);
    console.log("Taken: ", taken);
    if (taken) {
      console.log("About to send error");
      next({
        message: "username already taken",
        name: "auth error",
      });
      return;
    }

    const user = await createuser({ username, password });
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
      const token = jwt.sign(username, process.env.JWT_TOKEN);
      res.cookie("token", token, "id", match.id, {
        sameSite: "strict",
        httpOnly: true,
        signed: true,
      });
      res.send();
    }
  } catch (error) {
    next(error);
  }
});

authRouter.get("./logout", async (req, res, next) => {
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

module.exports = authRouter;

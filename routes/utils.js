const jwt = require("jsonwebtoken");

const authRequired = (req, res, next) => {
  try {
    const token = req.signedCookies.token;
    req.user = jwt.verify(token, process.env.JWT_TOKEN);
    console.log("req", req.user);
  } catch (error) {
    console.log(error);
    res.sendStatus(401).send({
      loggedin: false,
      message: "you are not logged in.",
    });
    return;
  }
  next();
};

module.exports = authRequired;

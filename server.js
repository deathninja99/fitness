require("dotenv").config();
const express = require("express");
const server = express();
const cookieParser = require("cookie-parser");
const PORT = 3030;
const morgan = require("morgan");

const { client } = require("./DB/client");
client.connect();

server.use(morgan("dev"));
server.use(express.json());
server.use(cookieParser(process.env.cookie_secret));

server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});

server.use("/api", require("./routes"));

server.use((error, req, res, next) => {
  res.send({
    name: error.name,
    message: error.message,
  });
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

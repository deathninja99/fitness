const http = require("http");
const { PORT = 4000 } = process.env;
// const app = require("./app");

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`App listening on Port ${PORT}`);
});

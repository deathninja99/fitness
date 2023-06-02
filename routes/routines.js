const {
  destroyroutines_activity,
} = require("../DB/adapters/routines_activities");
const {
  getallpublicroutines,
  createroutine,
  destroyroutine,
  updateroutine,
  getroutinebyid,
} = require("../DB/adapters/routines");
const authRequired = require("./utils");
const creatorRequired = require("./utils");
const jwt = require("jsonwebtoken");
const routinesRouter = require("express").Router();

routinesRouter.get("/routines", async (req, res, next) => {
  res.send(await getallpublicroutines());
});
routinesRouter.post("/routines", authRequired, async (req, res, next) => {
  const post = req.body;
  req.body.id = req.user.id;
  console.log("post", post);
  res.send(console.log(await createroutine(post)));
});
routinesRouter.patch(
  "/routines/:routineid",
  authRequired,
  async (req, res, next) => {
    try {
      Number(req.params.routineid);
      console.log("number?", Number(req.params.routineid));
      const results = await getroutinebyid(req.params.routineid);
      console.log("user", req.user.id, "result.creator", results[0].creator);
      if ((req.user.id = results[0].creator)) {
        console.log("params", req.params.routineid);
        const post = req.body;
        req.body.creator_id = req.user.id;
        req.body.id = Number(req.params.routineid);
        console.log("fullrequest", post);
        await updateroutine(post);
        res.send("post updated!");
      } else {
        res.sendStatus(401);
        res.send("you are not authorized");
      }
    } catch {
      throw console.error(error);
    }
    return;
  }
);
routinesRouter.delete(
  "/routines/:routineid",
  authRequired,
  async (req, res, next) => {
    const results = await getroutinebyid(req.params.routineid);
    if ((req.user.id = results[0].creator)) {
      await destroyroutines_activity(req.params.routineid);
      await destroyroutine(req.params.routineid);
      res.send("routine deleted!");
    } else {
      res.sendStatus(401);
      res.send("you are not authorized");
    }
    return;
  }
);
module.exports = routinesRouter;
//

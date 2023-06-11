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

routinesRouter.get("/", async (req, res, next) => {
  try {
    const allRoutines = await getallpublicroutines();
    res.send(allRoutines);
  } catch (error) {
    next(error);
  }
});
routinesRouter.post("/", authRequired, async (req, res, next) => {
  try {
    const post = req.body;
    post.creator_id = req.user.id;
    const createdRoutine = await createroutine(post);
    res.send(createdRoutine);
  } catch (error) {
    next(error);
  }
});

routinesRouter.patch("/:routineid", authRequired, async (req, res, next) => {
  const { routineid } = req.params;
  const { is_public, name, goal } = req.body;
  try {
    const routine = await getroutinebyid(+req.params.routineid);
    console.log("user", req.user.id, "result.creator", routine.creator);
    if (req.user.id === routine.creator) {
      const updatedRoutine = await updateroutine(+routineid, req.body);
      res.send(updatedRoutine);
    } else {
      res.status(401);
      next({
        message: "You didn't create this routine",
      });
    }
  } catch (error) {
    next(error);
  }
});

routinesRouter.delete("/:routineid", authRequired, async (req, res, next) => {
  try {
    const routine = await getroutinebyid(+req.params.routineid);
    console.log(routine);
    if ((req.user.id = routine.creator)) {
      await destroyroutines_activity(req.params.routineid);
      await destroyroutine(req.params.routineid);
      res.send("routine deleted!");
    } else {
      next({
        message: "You cant delete that routine!!!",
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = routinesRouter;
//

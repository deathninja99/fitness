const {
  addactivitytoroutine,
  updateroutineactivity,
  destroyroutineactivity,
} = require("../DB/adapters/routines_activities");
const authRequired = require("./utils");

const routine_activitiesRouter = require("express").Router();

routine_activitiesRouter.post("/", async (req, res, next) => {
  const post = req.body;
  const cookiedough = await addactivitytoroutine(post);
  res.send(cookiedough);
});

routine_activitiesRouter.patch(
  "/:daparams",
  authRequired,
  async (req, res, next) => {
    try {
      const post = req.body;
      console.log(post);
      const maplesyrup = await updateroutineactivity(req.params.daparams, post);
      res.send(maplesyrup);
    } catch (error) {
      next(error);
    }
  }
);
routine_activitiesRouter.delete(
  "/:daparams/delete",
  authRequired,
  async (req, res, next) => {
    const waagh = await destroyroutineactivity(req.params.daparams);
    res.send(waagh);
  }
);

module.exports = routine_activitiesRouter;

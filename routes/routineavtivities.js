const authRequired = require("./utils");

const routine_activitiesRouter = require("express").Router();

routine_activitiesRouter.post(
  "/routines_activities",
  async (req, res, next) => {
    res.send(console.log(req.user));
  }
);
routine_activitiesRouter.patch(
  "/routines_activities/:rt-at-id",
  authRequired,
  async (req, res, next) => {
    try {
      const results = await getroutinebyid(req.params.rt - at - id);
      if ((req.user.id = results[0].creator)) {
        console.log(true);
        console.log(req.params);
        console.log(req.user);
      }
    } catch {
      console.log(console.error(error));
    }
  }
);
routine_activitiesRouter.delete(
  "/routines_activities/:rt-at-id",
  authRequired,
  async (req, res, next) => {}
);

module.exports = routine_activitiesRouter;

const authRequired = require("./utils");

const routine_activitiesRouter = require("express").Router();

routine_activitiesRouter.post(
  "/routines_activities",
  async (req, res, next) => {
    res.send(console.log(req.user));
  }
);
routine_activitiesRouter.patch(
  "/routines_activities/rt-at-id",
  authRequired,
  async (req, res, next) => {}
);
routine_activitiesRouter.delete(
  "/routines_activities/rt-at-id",
  authRequired,
  async (req, res, next) => {}
);

module.exports = routine_activitiesRouter;

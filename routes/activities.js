const activitiesRouter = require("express").Router();
const {
  getallactivities,
  createactivity,
  updateactivity,
} = require("../DB/adapters/activities");
const { getpublicroutinesbyactivity } = require("../DB/adapters/routines");
const authRequired = require("./utils");

activitiesRouter.get("/activities", async (req, res, next) => {
  res.send(await getallactivities());
});
activitiesRouter.post("/activities", authRequired, async (req, res, next) => {
  const post = req.body;
  res.send(await createactivity(post));
});
activitiesRouter.patch(
  "/activities/:activityid",
  authRequired,
  async (req, res, next) => {
    const post = req.body;
    const activityid = req.params.activityid;
    res.send(await updateactivity(activityid, post));
  }
);
activitiesRouter.get(
  "/activities/:activity/routines",
  async (req, res, next) => {
    const activity = req.params.activity;
    res.send(await getpublicroutinesbyactivity(activity));
  }
);
module.exports = activitiesRouter;

const activitiesRouter = require("express").Router();
const {
  createactivity,
  updateactivity,
  getallactivitites,
} = require("../DB/adapters/activities");
const { getpublicroutinesbyactivity } = require("../DB/adapters/routines");
const {
  getroutineactiviesbyroutine,
} = require("../DB/adapters/routines_activities");
const authRequired = require("./utils");

activitiesRouter.get("/", async (req, res, next) => {
  const allactivities = await getallactivitites();
  res.send(allactivities);
});
activitiesRouter.post("/", authRequired, async (req, res, next) => {
  const post = req.body;
  const createactivityresults = await createactivity(post);
  console.log("express level", createactivityresults);
  res.send(createactivityresults);
});
activitiesRouter.patch("/:activityid", authRequired, async (req, res, next) => {
  const post = req.body;
  const activityid = req.params.activityid;
  const updateactivityresults = await updateactivity(activityid, post);
  res.send(updateactivityresults);
});
activitiesRouter.get("/:activity/routines", async (req, res, next) => {
  //g-r-b-a = get routine by activity
  const activity = req.params.activity;
  const G_R_B_A = await getpublicroutinesbyactivity(activity);
  res.send(G_R_B_A);
});
module.exports = activitiesRouter;

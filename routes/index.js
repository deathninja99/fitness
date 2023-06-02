const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/user", require("./user"));
router.use("/routines", require("./routines"));
router.use("/activities", require("./activities"));
router.use("/routine_activities", require("./routineavtivities"));
module.exports = router;

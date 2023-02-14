const express = require("express");
const router = express();

router.use("/api/users", require("./UserRoutes"));
router.use("/api/tasks", require("./TaskRoutes"));

// test route
router.get("/", (req, res) => {
  res.send("API working!");
});

module.exports = router;

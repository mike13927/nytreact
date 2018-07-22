const router = require("express").Router();
const articleRoutes = require("./articles");
router.use("/articles", articleRoutes);
const loginRoutes = require("./login");
router.use("/login", loginRoutes);

module.exports = router;

const express = require("express")
const router = express.Router()

const authRoute = require("./auth.routes");
const projectRoute = require("./project.route")
const authMiddleware = require("../middlewares/auth.middlware");

console.log('hi')
router.use("/auth", authRoute);
router.use("/projects", authMiddleware, projectRoute);


module.exports = router 
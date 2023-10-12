const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/Authmiddleware");
const Controller = require("../controller/UserController");


//add a user to database ( for devlopment purpose )
router.post("/", Controller.addUser)

//user login
router.post("/login", Controller.loginUser)

// tocken verification
router.get("/auth",validateToken, Controller.authUser)
  

module.exports = router;


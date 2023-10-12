const express = require("express");
const router = express.Router();
const { User } = require("../models");
const Controller = require("../controller/UserController");


//register a user and add to database ( for both user and login tables)
router.post("/userReg", Controller.regUser);

//get all users from database
router.get("/all", Controller.getAllUsers);

//get analyzed data for dashboard
router.get("/userData",Controller.GetData);

//update user data by id
router.put("/upd/:UserId",Controller.UpdateData);

//get user data by UserId
router.get("/user/:UserId",Controller.getUser);

//get user data by UserName ( for OTP verification)
router.get("/userOtp/:UserName",Controller.getUserByName);

//update Password by UserName
router.put("/updPass/:UserName",Controller.UpdatePassword);

//Check username and password for Edit Password option
router.post("/checkUser",Controller.checkUser);

module.exports = router;

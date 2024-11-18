const express = require("express");
const {
  loginController,
  registerController,
  authController,
  userAppointmentsController,
  bookAppointment,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

//Auth || POST
router.post("/getUserData", authMiddleware, authController);

//Appointments List
router.get("/user-appointments", authMiddleware, userAppointmentsController);

// Book Appointment
router.post("/book-appointment", bookAppointment)

module.exports = router;

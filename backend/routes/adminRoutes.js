const express = require("express");
const {
  getAllUsersController,
  getAdminProfile,
  getAllBookings,
  changeAppointmentStatus
} = require("../controllers/adminCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//GET METHOD || USERS
router.get("/getAllUsers", authMiddleware, getAllUsersController);

// GET ADMIN PROFILE
router.get("/profile/:id", getAdminProfile)

// GET ALL USERS BOOKINGS
router.get("/bookings", authMiddleware, getAllBookings)

// CHANGE APPOINTMENT STATUS
router.post("/change-appointment-status", changeAppointmentStatus)

module.exports = router;

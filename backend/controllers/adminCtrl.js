const appointmentModel = require("../models/appointmentModel");
const userModel = require("../models/userModels");

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "users data list",
      data: users,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "erorr while fetching users",
      error,
    });
  }
};

const getAdminProfile = async (req, res) => {
  const userId = req.params.id;
  const user = await userModel.findById(userId)
  user.password = undefined
  if (user) {
    res.status(200).send({
      success: true,
      message: "Profile fetched",
      data: user,
    });
  }
  else {
    res.status(401).send({
      success: false,
      message: "Error in fetching the user",
      error
    });
  }
}

const getAllBookings = async (req, res) => {
  try {
    const bookings = await appointmentModel.find({});
    res.status(200).send({
      success: true,
      message: "List of all bookings",
      data: bookings,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error while getting all bookings data",
      error,
    });
  }
}

const changeAppointmentStatus = async (req, res) => {
  try {
    const booking = await appointmentModel.findOne( {_id:req.body.bookingId });
    booking.status = "Complete"
    await booking.save()
    const user = await userModel.findById( req.body.userId );
    if(user){
      for (let i = 0; i < user.appointments.length; i++) {
        if (user.appointments[i].bookingId == req.body.bookingId) {
          user.appointments[i].status = "Completed"
        }
      }
      await user.save()
    }
    res.status(200).send({
      success: true,
      message: "Bookings updated",
      data: booking,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error while updating bookings data",
      error,
    });
  }
}

module.exports = {
  getAllUsersController,
  getAdminProfile,
  getAllBookings,
  changeAppointmentStatus
};

const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const appointmentModel = require("../models/appointmentModel");
const { ObjectId } = require('bson');
//register user
const registerController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register Sucessfully", success: true });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

// login user
const loginController = async (req, res) => {
  try {
    console.log("in login cntroller req = ", req)
    const user = await userModel.findOne({ email: req.body.email });
    console.log("user = ", user)
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invlid EMail or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};

const userAppointmentsController = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({
      userId: req.body.userId,
    });
    res.status(200).send({
      success: true,
      message: "Users Appointments Fetch SUccessfully",
      data: appointments,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error In User Appointments",
    });
  }
};

// book appointment
const bookAppointment = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    const bookingId = new ObjectId().toHexString();
    if (!user) {
      const appointment = new appointmentModel({
        _id: `${bookingId}`,
        userId: new ObjectId().toHexString(),
        patientName: req.body.name,
        phone: req.body.phone,
        email: req.body.email ? req.body.email : "",
        service: req.body.service,
        address: req.body.address ? req.body.address : "",
        time: `${new Date().getDate()}/${(new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1}/${new Date().getFullYear()}`
      })
      await appointment.save()
      return res.status(200).send({
        success: true,
        message: "Appointment booked succesfully",
      });
    }
    const appointment = new appointmentModel({
      _id: bookingId,
      userId: user._id,
      patientName: req.body.name,
      phone: req.body.phone,
      email: req.body.email ? req.body.email : "",
      service: req.body.service,
      address: req.body.address ? req.body.address : "",
      time: `${new Date().getDate()}/${(new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1}/${new Date().getFullYear()}`
    })
    await appointment.save()

    user.appointments.push({
      bookingId: bookingId,
      userId: req.body.userId,
      patientName: req.body.name,
      service: req.body.service,
      bookingDate: `${new Date().getDate()}/${(new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1}/${new Date().getFullYear()}`,
      status: "Pending"
    });
    await user.save()
    return res.status(200).send({
      success: true,
      message: "Appointment booked succesfully and added to your appointments",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error While Booking Appointment",
    });
  }
}

module.exports = {
  loginController,
  registerController,
  authController,
  userAppointmentsController,
  bookAppointment
};

const express = require("express");
const colors = require("colors");
const moragan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require('path')
const cors = require('cors');

//dotenv conig
dotenv.config();

//mongodb connection
connectDB();

//rest obejct
const app = express();

app.use(cors(
  {
    origin: ["https://srijan-appoint.vercel.app/"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
  }
));

//middlewares
app.use(express.json());
app.use(moragan("dev"));

//routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));

//port
const port = process.env.PORT || 8080;

// static files
app.use(express.static(path.join(__dirname, './client/build')))
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'))
})

//listen port
app.listen(port, () => {
});

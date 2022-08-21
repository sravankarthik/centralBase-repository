const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express()
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStrorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");

//Middlewares
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(cors());

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const jobRoutes = require("./routes/job");
const assignmentRoutes = require("./routes/assignment");

//Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", jobRoutes);
app.use("/api", assignmentRoutes);



//DB connection
const port = 8000
mongoose.connect('mongodb://localhost:27017/test1')
    .then(() => { console.log("DB connected...") });
//Server connection
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})

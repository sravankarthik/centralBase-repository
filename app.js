const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express()
const cookieParser = require("cookie-parser");
const cors = require("cors");

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

//Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);



//DB connection
const port = 8000
mongoose.connect('mongodb://localhost:27017/test')
    .then(() => { console.log("DB connected...") });
//Server connection
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
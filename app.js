const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const GridFsStrorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");

//Middlewares
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(cors());

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const jobRoutes = require("./routes/job");
const assignmentRoutes = require("./routes/assignment");

//file uploads.
const mongoURI = "mongodb://localhost:27017/test1";
const conn = mongoose.createConnection(mongoURI);
let gfs;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  //collection name
  gfs.collection("uploads");
});

const storage = new GridFsStrorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          //collection name to be specified in bucketName
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  //to me modified later. This is for single file.
  res.json({ file: req.file });
});

//Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", jobRoutes);
app.use("/api", assignmentRoutes);

//DB connection
const port = 8000;
mongoose.connect("mongodb://localhost:27017/test1").then(() => {
  console.log("DB connected...");
});
//Server connection
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

//hello world.

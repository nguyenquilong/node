const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session')(session);
const User = require('./models/user');
// const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const cateRoutes = require("./routes/cate");
const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()); // for parsing application/json
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("imageUrl")
);
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));
// app.use('/images', express.static('images'));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// app.use("/feed", feedRoutes);
app.use('/admin', adminRoutes);
app.use("/auth", authRoutes);
app.use("/post", postRoutes);
app.use("/api/cate", cateRoutes);
app.use(shopRoutes);

const store = new MongoDBStore({
  uri: "mongodb://127.0.0.1:27017/shop",
  collection: 'sessions'
});

// app.use(
//   session({
//     secret: 'my secret',
//     resave: false,
//     saveUninitialized: false,
//     store: store
//   })
// );

// app.use((req, res, next) => {
//   User.findById('63a07432ce8b7302d9fa02f8')
//     .then(user => {
//       req.user = user;
//       next();
//     })
//     .catch(err => console.log(err));
// });

// app.use((req, res, next) => {
//   if (!req.session.user) {
//     return next();
//   }
//   User.findById(req.session.user._id)
//     .then(user => {
//       req.user = user;
//       next();
//     })
//     .catch(err => console.log(err));
// });


app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/shop").then(() => {
  app.listen(8000);
  console.log("connected !");
});

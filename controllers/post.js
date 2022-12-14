const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Post = require("../models/post");



exports.createPost = (req, res, next) => {
  const imageUrl =  req.file

  console.log('imageUrl',imageUrl )

  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   const error = new Error('Validation failed, entered data is incorrect.');
  //   error.statusCode = 422;
  //   throw error;
  // }
  // if (!req.file) {
  //   const error = new Error('No image provided.');
  //   error.statusCode = 422;
  //   throw error;
  // }

  // console.log(' req.file',  req.file)

  // const createPostData = {
  //   // name : req.body.name,
  //   // category: req.body.category,
  //   // price: req.body.price,
  //   // quantity: req.body.quantity,
  //   imageUrl : req.file
  // }

  // console.log(createPostData)
  // const post = new Post(createPostData)




  // const imageUrl = req.file.path;
  // const title = req.body.title;
  // const content = req.body.content;
  // const post = new Post({
  //   title: title,
  //   content: content,
  //   imageUrl: imageUrl,
  //   creator: { name: 'Maximilian' }
  // });
  // post
  //   .save()
  //   .then(result => {
  //     res.status(201).json({
  //       message: 'Post created successfully!',
  //       post: result
  //     });
  //   })
  //   .catch(err => {
  //     if (!err.statusCode) {
  //       err.statusCode = 500;
  //     }
  //     next(err);
  //   });
};



// exports.create = async (req, res, next) => {
//   console.log("req", JSON.stringify(req.body));

//   const createPostData = {
//     name : req.body.name,
//     cate: req.body.cate,
//     price: req.body.price,
//     quantity: req.body.quantity,
//   }

//   const post = new Post(createPostData)




//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     const error = new Error("Validation failed.");
//     error.statusCode = 422;
//     error.data = errors.array();
//     throw error;
//   }
//   const email = req.body.email;
//   const name = req.body.name;
//   const password = req.body.password;
//   try {
//     const hashedPw = await bcrypt.hash(password, 12);

//     const user = new User({
//       email: email,
//       password: hashedPw,
//       name: name,
//     });
//     const result = await user.save();
//     res.status(201).json({ message: "User created!", userId: result._id });
//   } catch (err) {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// };

// exports.getPosts = async (req, res, next) => {
//   const cate = req.body.cate;

//   let loadedPost;
//   try {
//     const post = await Post.findOne({ cate: cate });
//     if (!user) {
//       const error = new Error("Post not found.");
//       error.statusCode = 401;
//       throw error;
//     }
//     loadedPost = user;
//     const isEqual = await bcrypt.compare(password, user.password);
//     if (!isEqual) {
//       const error = new Error("Wrong password!");
//       error.statusCode = 401;
//       throw error;
//     }
//     const token = jwt.sign(
//       {
//         email: loadedPost.email,
//         userId: loadedPost._id.toString(),
//       },
//       "somesupersecretsecret",
//       { expiresIn: "1h" }
//     );
//     res.status(200).json({ token: token, userId: loadedPost._id.toString() });
//   } catch (err) {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// };

// exports.getUserStatus = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.userId);
//     if (!user) {
//       const error = new Error("User not found.");
//       error.statusCode = 404;
//       throw error;
//     }
//     res.status(200).json({ status: user.status });
//   } catch (err) {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// };

// exports.update = async (req, res, next) => {
//   const newStatus = req.body.status;
//   try {
//     const user = await User.findById(req.userId);
//     if (!user) {
//       const error = new Error("User not found.");
//       error.statusCode = 404;
//       throw error;
//     }
//     user.status = newStatus;
//     await user.save();
//     res.status(200).json({ message: "User updated." });
//   } catch (err) {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// };

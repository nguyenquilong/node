const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Order = require("../models/order");

exports.postOrder = async (req, res, next) => {
    console.log('items', req.body )

    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        userId: req.body.userId,
        items: req.body.data.items.map(item => {
            return {
                _id: new mongoose.Types.ObjectId(),
                productId: item.productId,
                quantity: item.quantity,
                productImage: item.productImage,
                productName: item.productName,
                productPrice: item.productPrice
            }
        }),
        address: req.body.address,
        note: req.body.note,
        phone: req.body.phone,
        username: req.body.username,
    });
        order
    .save()
        .then((result) => {
            res.status(200).json({
                message: "Confirm order success!",
                orders: result,
                status: 1,
            });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

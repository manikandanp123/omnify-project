const mongoose = require("mongoose");
const express = require("express")
const router = express.Router();
const users = require("../model/userModel")
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const SECRET = "scheduleTime";
const jwt = require("jsonwebtoken");
const mysqlConnection = require("../database");

// router.use(bodyParser());
router.use(express.json());


router.post("/login", async (req, res) => {
    try {
        mysqlConnection.query("SELECT * FROM users WHERE email=?", [req.body.emailORphone], (error, results, fields) => {
            if (results.length == 0) {
                mysqlConnection.query("SELECT * FROM users WHERE phone=?", [req.body.emailORphone], (error, results, fields) => {
                    if (results.length > 0) {
                        // res.send("phone sucess")
                        bcrypt.compare(req.body.password, results[0].password, (err, result) => {
                            if (result) {
                                var token = jwt.sign({
                                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                                    data: results[0].userid
                                }, SECRET);
                                return res.status(200).json({
                                    success: true,
                                    message: "Logged in phone successfully",
                                    token
                                })
                            } else {
                                return res.status(404).json(
                                    {
                                        success: false,
                                        message: "wrong password"
                                    }
                                );
                            }
                        })
                    } else {
                        res.send("enter correct  details")
                    }
                })
            } else {
                bcrypt.compare(req.body.password, results[0].password, (err, result) => {
                    if (result) {
                        var token = jwt.sign({
                            exp: Math.floor(Date.now() / 1000) + (60 * 60),
                            data: results[0].userid
                        }, SECRET);
                        return res.status(200).json({
                            success: true,
                            message: "Logged in Email successfully",
                            token
                        })
                    } else {
                        return res.status(404).json(
                            {
                                success: false,
                                message: "wrong password"
                            }
                        );
                    }
                })
            }
        })
    } catch (e) {

    }
})


router.post('/register', async (req, res) => {
    try {

        // console.log(req.body);

        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (hash) {
                // const user = await users.insertMany({
                //     first_name: req.body.first_name,
                //     last_name: req.body.last_name,
                //     email: req.body.email,
                //     phone: req.body.phone,
                //     password: hash
                // })
                // console.log(req.body.first_name);
                let data = { first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, phone: req.body.phone, password: hash };
                console.log(data);
                mysqlConnection.query("INSERT INTO users SET?", data, (error, results, fields) => {
                    // console.log(results)
                    if (results.affectedRows>0) {
                        return res.send({
                            success: true,
                            message: "Registered  successfully",
                            data
                        })
                    } 
                    else {
                        console.log("not registered");
                        return res.send("Not registered")
                    }
                })
                // console.log(user)
            }
        })
    } catch (e) {
        return res.status(404).json({
            success: false,
            message: e.message
        })
    }
})
module.exports = router;

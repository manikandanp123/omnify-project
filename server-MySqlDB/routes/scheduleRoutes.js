const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const schedules = require('../model/schedules');
const mysqlConnection = require("../database");
router.use(bodyParser());

// router.get("/get",(req,res)=>{
//     res.send("ok");
// })

router.post("/add", async (req, res) => {
    console.log(req.body);
    let st_time = req.body.start_time.split("T");
    let en_time = req.body.end_time.split("T");
    console.log(st_time[1]);
    // console.log(en_time);
    let month = req.body.start_time.split("-");
    console.log(month[1]);
    let currentDay = month[2].split("T");
    // currentDay=parseInt(currentDay[0]);
    let array = [];
    let obj = { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec" };

    let firstDay = parseInt(currentDay[0]) + " " + obj[parseInt(month[1])];
    array.push(firstDay);
    let countDays = 0;
    let nextDay = parseInt(currentDay[0]);
    let nextMonth = parseInt(month[1]);
    console.log(nextMonth, typeof (nextMonth));
    while (countDays <= 90) {
        if (parseInt(nextMonth) % 2 == 0) {
            if (nextDay > 30) {
                nextDay %= 30;
                nextMonth += 1;
            } else {
                nextDay += 7;
                countDays += 7;
                array.push(nextDay + ' ' + obj[nextMonth]);
            }
        } else if (parseInt(nextMonth == 2)) {
            if (nextDay > 29) {
                nextDay %= 29;
                nextMonth += 1;
            } else {
                nextDay += 7;
                countDays += 7;
                array.push(nextDay + ' ' + obj[nextMonth]);
            }
        } else {
            if (nextDay > 31) {
                nextDay %= 31;
                nextMonth += 1;
            } else {
                nextDay += 7;
                countDays += 7;
                array.push(nextDay + ' ' + obj[nextMonth]);
            }
        }
    }
    console.log(array);

    const data = {
        user: req.user,
        name: req.body.name,
        description: req.body.description,
        start_time: st_time[1],
        end_time: en_time[1],
        day: req.body.day
    }
    mysqlConnection.query("INSERT INTO schedules SET?", data, (error, results, fields) => {
        if (results.affectedRows > 0) {
            return res.status(200).json({
                success: true,
                message: "order stored in cart"
            })
        } else {
            return res.send("not added to cart");
        }
    })
    // const schedule=await schedules.insertMany({
    //     user:req.user,
    //     name:req.body.name,
    //     description:req.body.description,
    //     start_time:st_time[1],
    //     end_time:en_time[1],
    //     day:req.body.day,
    //     date:array      
    // });
    // return res.status(200).json({
    //     success:true,
    //     message:"order stored in cart"
    // })
})


router.get("/get", async (req, res) => {
    // const data=await schedules.find({user:req.user})
    id = req.user
    id = id.toString()
    console.log(req.user, typeof (req.user));
    console.log(id, typeof (id));
    mysqlConnection.query("SELECT * FROM schedules WHERE user=?", [id], (err, results, fields) => {


        console.log(results);
        if (results.length > 0) {
            return res.status(200).json({
                success: true,
                message: "ordered data fetched",
                results
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "not fetched"
            })
        }
    })
    // console.log(data)
    // if(data){
    //     return res.status(200).json({
    //         success:true,
    //         message:"ordered data fetched",
    //         data
    //     })
    // }else{
    //     return res.status(404).json({
    //         success:false,
    //         message:"not fetched"
    //     })
    // }
})


router.delete("/delete/:id", async (req, res) => {
    console.log(req.params.id)
    // const scheduleDelete=await schedules.deleteOne({_id:req.params.id,user:req.user});
    mysqlConnection.query("DELETE FROM schedules WHERE id=? and user=?", [req.params.id, req.user], (error, results, fields) => {
        // console.log(results);
        if (results.affectedRows > 0) {
            res.status(200).json({
                success: true,
                message: "deleted successfully"
            })
        } else {
            res.status(404).json({
                success: false,
                message: "not deleted"
            })
        }
    })
    // console.log(scheduleDelete);
    // if(scheduleDelete.deletedCount===1){
    //     res.status(200).json({
    //         success:true,
    //         message:"deleted successfully"
    //     })
    // }else{
    //     res.status(404).json({
    //         success:false,
    //         message:"not deleted"
    //     })
    // }
})

module.exports = router;

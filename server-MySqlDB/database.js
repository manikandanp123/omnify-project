const mysql =require("mysql")

const mysqlConnection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Mani@100",
    database:"schedule",
    multipleStatements:true
})

mysqlConnection.connect((err)=>{
    if(err){
        console.log("Not Connected to MYSQLDB");
    }else{
        console.log("Connected to MYSQLDB");
    }
})

module.exports=mysqlConnection;
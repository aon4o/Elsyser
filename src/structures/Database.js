const mysql = require('mysql');

//CREATING CONNECTION TO MYSQL
const con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
});

//CONNECTING TO MYSQL
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MySQL!");
});


con.query("CREATE DATABASE IF NOT EXISTS elsyser", function (err, result) {
    if (err) throw err;
    if (result.warningCount > 0)
    {
        console.log("Database 'elsyser' already exists!");
        con.query('use elsyser', function (err, result) {
            if (err) throw err;
        })
    }
    else
    {
        //CREATING DATABASE TABLES
        console.log("Database 'elsyser' created!");
        con.query("use elsyser", function (err, result) {
            if (err) throw err;
        })

        con.query(
            "create table schedule (" +
            "id int primary key auto_increment not null," +
            "guild_id varchar(18) not null," +
            "day enum('mon', 'tue', 'wed', 'thu', 'fri') not null," +
            "number tinyint," +
            "start time not null," +
            "end time not null," +
            "name char(100) not null," +
            "week enum('even', 'odd') default null" +
            ")",
            function (err, result) {
                if (err) throw err;
                console.log("Table 'schedule' created!");
            })
    }
});

module.exports = con
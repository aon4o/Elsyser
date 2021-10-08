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

        con.query(
            "create table week (" +
            "id int primary key auto_increment not null," +
            "guild_id varchar(18) not null unique," +
            "week_offset bool not null" +
            ")",
            function (err, result) {
                if (err) throw err;
                console.log("Table 'week' created!");
            })

        con.query(
            "create table class (" +
            "id int primary key auto_increment not null," +
            "guild_id varchar(18) not null," +
            "name varchar(50) not null," +
            "unique (guild_id, name)" +
            ")",
            function (err, result) {
                if (err) throw err;
                console.log("Table 'class' created!");
            })
    }
});

module.exports = con
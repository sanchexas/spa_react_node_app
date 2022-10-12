'use strict';
const express = require('express');
const con = require('mysql');
const app = express();

app.get("/", (req, res)=>{
    res.send("<h1>hello serg</h1>");
});

const db = con.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'remeslo',
});

//чтобы запустить сервер, необходимо ввести в консоль node index.js
app.listen(3001, ()=>{
    const sqlTest = "INSERT INTO user (name) VALUES ('Carlos');";
    db.query(sqlTest);
    
});
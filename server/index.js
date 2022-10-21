'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const con = require('mysql');
const app = express();

const session = require('express-session');
const cookieParser = require('cookie-parser');


app.get("/", (req, res)=>{
    res.send("<h1>hello serg</h1>");
});
// настройки подключения к БД
const db = con.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'remeslo',
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));


//запаковываем get запрос и отправляем на фронт. Фронт, по желанию, может распаковать его через
// useEffect и Axios.get("http://localhost:3001/signup"). 
app.get("/signup", (req, res)=>{
    const selectQuery = "SELECT * FROM users";
    db.query(selectQuery, (err, result)=>{
        res.send(result);
    })
})
app.post("/signup", (req, res)=>{
    const fio = req.body.fio;
    const email = req.body.email;
    const telNum = req.body.tel;
    const password = req.body.password;
    const insertQuery = "INSERT INTO users VALUES (null, ?, ?, ?, ?)";
    db.query(insertQuery, [fio, email, telNum, password], (err, result)=>{
        console.log(result);
    });
});

app.listen(3001, ()=>{
    console.log("сервер работает на порте 3001")
});
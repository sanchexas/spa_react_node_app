'use strict';
//import Cookies from 'universal-cookie';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const con = require('mysql');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

const saltRounds = 10;


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
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    key: "userId",
    secret: "remeslo",
    resave: false,
    saveUninitialized: false,
    cookie: {
        path: '/',
        expires: 60 * 60 * 24,
    }
}));
// app.get("/account",(req, res)=>{

// });
app.get("/account", (req, res)=>{
    const selectQuery = "SELECT * FROM users WHERE id = ?";
    db.query(selectQuery, req.cookies.idUser, (err, result)=>{
        res.send(result);
    });
});
//запаковываем get запрос и отправляем на фронт. Фронт, по желанию, может распаковать его через
// useEffect и Axios.get("http://localhost:3001/signup"). 
app.get("/signup", (req, res)=>{
    const selectQuery = "SELECT * FROM users";
    db.query(selectQuery, (err, result)=>{
        res.send(result);
    });
});
app.post("/signup", (req, res)=>{
    const fio = req.body.fio;
    const email = req.body.email;
    const telNum = req.body.tel;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, (err, hash)=>{
        if(err){
            res.send({ err: err});
        }
        const insertQuery = "INSERT INTO users VALUES (null, ?, ?, ?, ?);";
        db.query(insertQuery, [fio, email, telNum, hash], (err, result)=>{
            console.log(result);
        });
    });
    
});


app.get("/signin", (req, res)=>{
     // ПОЛУЧЕНИЕ COOKIE
    const selectQuery = "SELECT * FROM users WHERE id = ?;";
    db.query(selectQuery, req.cookies.idUser, (err, result)=>{ 
        if(err){
            res.send({ err: err});
        }
        if(result){
            res.send({message: result[0].fio})
        }
    })
});

//ОБЯЗАТЕЛЬНО СДЕЛАТЬ ПРОВЕРКУ В БУДУЩЕМ
app.post("/signin", (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const selectQuery = "SELECT * FROM users WHERE ? = email;";
        db.query(selectQuery, email, (err, result)=>{
            if(err){
                res.send({ err: err});
            }

            if(result.length > 0){
                bcrypt.compare(password, result[0].password, (error, response)=>{
                    if(error){
                        res.send({error: error});
                    }
                    if(response){
                        res.cookie('idUser', result[0].id); // id пользователя в куки должно соответствовать названию колонки id в бд.
                        //req.session.cookie.value = result[0].id;  
                        // console.log(req.cookies);
                        //res.send(result);
                        res.send({message: result[0].fio});
                    }else{
                        res.send({message: "Некорректные данные"});
                    }
                });
            }else{
                res.send({message: "Пользователя не существует"});
            }
        });
    
});


app.listen(3001, ()=>{
    console.log("сервер работает на порте 3001")
});
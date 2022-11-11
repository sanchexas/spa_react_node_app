const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const con = require('mysql');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const multer = require('multer');


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
//загрузка файла в папку, дальнейшее использование upload в post запросе "/workshop"
let myFile ='';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/src/pictures');
    },
    filename : function (req, file, cb) {
        cb(null, myFile = Date.now() + '-' +file.originalname );
    }
});

const upload = multer({storage: storage}).single('productImage');

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
app.get("/account", (req, res)=>{
    const selectQuery = "SELECT * FROM users WHERE id_user = ?";
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
    const selectQuery = "SELECT * FROM users WHERE id_user = ?;";
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
    const selectQuery = "SELECT * FROM users WHERE email = ?;";
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
                        res.cookie('idUser', result[0].id_user); // id пользователя в куки должно соответствовать названию колонки id в бд.
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
app.post('/workshop',upload,(req, res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const adress = req.body.adress;
    const productImage = myFile;
    const price = req.body.price;
    const shortDescription = req.body.shortDescription;
    const authorId = req.cookies.idUser;

    const insertQuery = "INSERT INTO products VALUES (null, ?, ?, ?, ?, ?, ?, ?);";
    db.query(insertQuery, [title, description, adress, productImage, Number(price), shortDescription, authorId], (err, result)=>{
        if(err){
            res.send({ err: err});
            console.log({err: err});
        }
        if(result){
            res.send(result)
        }
    });
});
app.get('/workshop', (req, res)=>{
    const authorId = req.cookies.idUser;
    const selectQuery = "SELECT * FROM products WHERE author_id = ?;";
    db.query(selectQuery, authorId, (err, result)=>{
        if(err){
            res.send({ err: err});
            console.log({err: err});
        }
        if(result){
            res.send({message: result});
        }
    });
});
app.post('/account/change', (req, res)=>{
    const authorId = req.cookies.idUser;
    const fio = req.body.fio;
    const tel = req.body.tel;
    const email = req.body.email;

    updateQuery = "UPDATE users SET fio = ?, tel = ?, email = ? WHERE id_user = ?;";
    db.query(updateQuery, [fio, tel, email, authorId], (err, result)=>{
        if(err){
            res.send({ err: err});
            console.log({err: err});
        }
        if(result){
            res.send({message: result});
        }
    });
});
app.get('/newspage',(req, res)=>{
    const selectQuery = "SELECT * FROM products";
    db.query(selectQuery, (err, result)=>{
        if(err){
            res.send({ err: err});
            console.log({err: err});
        }
        if(result){
            res.send({message: result});
        }
    } );
});
let id;
//ПОЛУЧЕНИЕ ПАРАМЕТРА ИЗ GET ЗАПРОСА. ("http://localhost:3001/productinfo/?id=${curentId}")
app.get(`/productinfo`, (req, res)=>{
    let productId = req.query.id;
    const selectQuery = "SELECT * FROM products WHERE id_product=?;";
    db.query(selectQuery, productId, (err, result)=>{
        if(err){
            res.send({ err: err});
            console.log({err: err});
        }
        if(result){
            res.send({message: result});
        }
    });
});

app.post('/sendorder',(req, res)=>{
    let products = req.body.products;
    let generalPrice = req.body.general_price;
    let buyerId = req.body.buyer_id;
    let date = req.body.date;
    const insertQuery = "INSERT INTO orders VALUES (null, ?, ?, ?, ?);";
    db.query(insertQuery, [products, generalPrice, buyerId, date], (err, result)=>{
        if(err){
            res.send({ err: err});
            console.log({err: err});
        }
        if(result){
            res.send({message: result});
        }
    });
});
app.listen(3001, ()=>{
    console.log("сервер работает на порте 3001")
});
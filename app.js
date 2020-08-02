const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password', //본인 root계정 비밀번호작성
    database: 'node_crud'
}); 

connection.connect( (err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', (req,res)=>{
    let sql = "select * from users";
    let query = connection.query(sql,(err,rows)=>{ 
        if(err) throw err;
        res.render("user_index", {
            title: "CRUD operation using node, express, mysql",
            users : rows
        });
    });
});

app.get('/add',(req,res)=>{
    res.render("user_add", {
        title: "CRUD operation using node, express, mysql",
    });
})

app.post('/save',(req,res)=>{
    let data = {name : req.body.name, email : req.body.email, phone_no : req.body.phone_no};
    let sql = "insert into users SET ?";
    let query = connection.query(sql, data,(err, results)=>{
        if(err) throw err;
        res.redirect('/');
    });
});

app.get('/edit/:userid',(req,res)=>{
    const userId = req.params.userid;
    let sql = `select *from users where id=${userId}`;
    let query = connection.query(sql, (err,result)=>{
        if(err) throw err;
        res.render('user_edit',{
            title:'CRup Operation using nodejs express mysql',
            user : result[0]
        });
    });
});

app.post('/update', (req, res) => {
    const userId = req.body.id;
    let sql = "update users SET name='" + req.body.name + "', email='" + req.body.email + "', phone_no='" + req.body.phone_no +"' where id="+userId;
    let query = connection.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});

app.get('/delete/:userid', (req, res) => {
    const userId = req.params.userid;
    let sql = `DELETE from users where id=${userId}`;
    let query = connection.query(sql, (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});


//Server Listening
app.listen(3000,()=>{
    console.log('Server is running at port 3000');
});
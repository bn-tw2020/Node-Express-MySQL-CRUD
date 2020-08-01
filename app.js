const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '80968096',
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
    console.log('hahaha');
    let query = connection.query(sql,(err,rows)=>{ 
        if(err) throw err;
        res.render("user_index", {
            title: "CRUD operation using node, express, mysql",
            users : rows
        });
    });
});


//Server Listening
app.listen(3000,()=>{
    console.log('Server is running at port 3000');
});
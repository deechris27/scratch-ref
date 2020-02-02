const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const uuid = require('uuid/v4');
const pg = require('pg');
const cors = require('cors');

let pool = new pg.Pool({
    port: process.env.DB_PORT,
    password: process.env.Password,
    database: process.env.Datebase,
    host: 'localhost',
    user: process.env.Username
});

let fromDB = [];

pool.connect((err, db, done)=>{
    if(err){
        throw err;
    }else{
        db.query(`select * from counter`)
        .then(res=> fromDB.push(res.data))
        .catch(e=>console.trace(e));
    }
});

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan('dev'));

app.use((req, res, next)=>{
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
   next();
});

app.get('/', (req, res)=>{
    res.status(200).json("Default page")
 });

app.get('/test', (req, res)=>{
   res.status(200).json("Hello Deepak")
});

app.get('/counters', (req, resp, next)=>{
    pool.query(`select * from counter`)
    .then(res=>resp.status(200).json({counter: res.rows}))
    .catch(e=>e);
});

app.post('/counter', (req, resp, next)=>{
   const counter = JSON.parse(req.body.body).counter;
   console.log(counter);
   const id = Math.random().toFixed(3);
//    if(request.counter===0){
//       return resp.status(422).json({message: "Invalid counter value"});
//    }else{
//        pool.query(`insert into counter (id, count) values (${id}, ${request})`)
//        .then(res=>resp.json({status: "successfully updated the counter into DB"}))
//        .catch(e=> e);
//    }
pool.query(`insert into counter (id, count) values (${id}, ${counter})`)
    .then(res=>resp.status(200).json({status: "successfully updated the counter into DB"}))
    .catch(e=>e);
});

if(process.env.NODE_ENV === "production"){
    app.use(express.static('../dist'));

    app.get("*", (req, res)=>{
       res.sendFile(path.resolve(__dirname, "../dist", 'index.html'))
    });
}

app.listen(3000 || process.env.PORT, ()=>{
    console.log("Server running on port 3k");
});
import express from "express";
import mysql from "mysql"
import cors from "cors"

const app = express()

app.use((req,res,next)=>{
     res.setHeader('Content-Type', 'text/html; charset=utf-8');
     next();
})

const db = mysql.createConnection({
    host:"sql7.freesqldatabase.com",
    user:"sql7762232",
    password:"FPfuQeVDs8",
     database:"sql7762232",
     charset:"utf8mb4",
  

})

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.json("hello this is the backendd!")
})

app.get("/books",(req,res)=>{
    const q ="SELECT * FROM books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err);
            return res.json(data);
    })
})

app.post("/books",(req,res)=>{
    const q = "INSERT INTO books (`title`,`desc`,`cover`,`price`) VALUES (?)"
    // const values = ["title from backend", "desc from backend", "cover pick from backend"];
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price,
    ];

    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been created successfully");
    })
})

const port = process.env.PORT;

app.listen(port, ()=>{
    console.log(`Connected to backendd ${port}`);
})
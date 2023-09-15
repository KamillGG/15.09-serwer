const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
const mysql = require('mysql')
var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"serwer"
})
con.connect((err)=>{
    if(err) console.log(err)
    console.log("connected")
})
app.get('/',(req,res)=>{
    res.send('ok')
})
app.get('/imie',(req,res)=>{
    const json = {imie:"Kamil", Nazwisko:"Gmitrzuk"}
    res.json(json)
})
app.get('/sum/:one/:two',(req,res)=>{
    const jedna =  parseInt(req.params.one)
    const dwa =  parseInt(req.params.two)
    const suma = jedna+dwa
    console.log(suma)
    res.send(`${suma}`)
    
})
app.get('/sql',(req,res)=>{
    const sql = `SELECT * FROM oceny`
    con.query(sql,function(err,result,fields){
        if(err) console.log(err)
        res.send(result)
    })
    
})
app.get("/sql/add/:imie/:nazwisko/:ocena",(req,res)=>{
    const imie = req.params.imie
    const nazwisko = req.params.nazwisko
    const ocena = req.params.ocena
    const sql = `INSERT INTO oceny(imie, nazwisko, ocena) VALUES ('${imie}','${nazwisko}','${ocena}')`
    con.query(sql, function(err,result,fields){
        if(err){ console.log(err)
            res.send('nie dodano')
        }
        else{
            res.send('dodano')
        }
    })
    res.send('dodano')
})
app.listen(3000)
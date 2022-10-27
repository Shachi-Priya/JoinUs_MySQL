const express=require('express');
const mysql=require('mysql');
const ejs=require('ejs');// npm i --save ejs
const bodyparser=require('body-parser');// npm i --save body-parser

const app = express();
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/"));

let connection=mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"Sntkrt4621.@",
    database:"MailingList"  
});

app.get("/", function(req, res){
    connection.query("SELECT count(*) as count FROM users", function(error, results){
        if(error) throw error;
        var count=results[0].count;
        // res.send("We have "+ count +" users in our DB.");
        res.render("home", {data:count});
    });    
    //connection.end();
});

app.post("/register", function(req, res){
    let person={
        email:req.body.email
    };
    connection.query("Insert into users set?", person, function(error, results){
        if(error) throw error;
        res.redirect("/");
    });
    //console.log("post request sent to /register email is : " + req.body.email);
});


app.listen(8080,function(){
    console.log("server running on port 8080");
});
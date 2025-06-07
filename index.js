const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));


app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));


let posts = [
    {
        id : uuidv4(),
        username : "prashant soni",
        content : "i love coding"
    },
    {
        id : uuidv4(),
        username : "priyanka soni",
        content : "i love crying"
    },
    {
        id : uuidv4(),
        username : "praveen soni",
        content : "i love eating"
    }
]

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})


app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})

app.post("/posts",(req,res)=>{
    res.redirect("/posts");
    let { username , content } = req.body;
    let id = uuidv4();
    posts.push({ id,username , content });
})

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    
    let post = posts.find((p)=> id === p.id);
    res.render("show.ejs",{post});
    // console.log(post);
})
app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newcontent = req.body.content;
    let post = posts.find((p)=> id === p.id);
    post.content = newcontent;
    // res.send("patch req working")
    res.redirect("/posts");
    
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("edit.ejs",{post});
})

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=> id !== p.id);
    res.redirect("/posts");
})
app.listen(port,()=>{
    console.log("app listening at port : 8080");
})

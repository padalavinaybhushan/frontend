const express=require("express")
const path=require("path")
const app=express()
const port=process.env.PORT||5000;
app.set('view engine','ejs')


//load static assets

app.use('/static',express.static(path.join(__dirname,'css')));

//mainhome route
app.get('/',(req,res)=>{
    res.render('mainhome',{title:"mainhome"});
})

app.listen(port,()=>{console.log("listening to the server http://localhost:4000")});
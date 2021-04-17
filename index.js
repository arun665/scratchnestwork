const mongoose=require('mongoose');
const express=require("express");
const bodyparser=require("body-parser");

const port=3000;
const path=require("path");
const {json} = require("express");
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }

mongoose.connect("mongodb+srv://mongodb:Arun1117@cluster0.spwl1.mongodb.net/scratchnestwork?retryWrites=true&w=majority",{useNewUrlParser:true , useUnifiedTopology:true,useFindAndModify:false})
.then(function(){
    console.log(" this is running successfully");
})
.catch(function(error){
    console.log(error);

});

const playlist=new mongoose.Schema({

    task:{
        type:String,
         
        
    },
    date:{
        type:String
    },
    info:{
        type:String
    },
    status:{
        type:String
    }
});

const Temp=new mongoose.model("Temp",playlist);


const static_path=path.join(__dirname,"/public");

const app=express();
app.use(express.static(static_path));
app.set("view engine","ejs");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyparser.urlencoded({extended:true}));





        
app.get("/",async function(req,res){


    const result=await Temp.find({});

    res.render("demo.ejs",{datas:result});
          
})


app.get("/getdata",async function(req,res){

    const result=await Temp.find({});

    res.render("data.ejs",{datas:result});
          
})




app.get("/deletetask/:id", async function(req,res){
try{
    if(localStorage.getItem("email")===null){
        res.redirect("/");
    }

    const _id=req.params.id;
    console.log(_id);

            const result= await Temp.deleteOne({_id},function(err,res1){

                res.redirect("/");
            });

        
}
catch(error){
    res.send(error);
}
})


app.get("/donetask/:id", async function(req,res){
    try{
        if(localStorage.getItem("email")===null){
            res.redirect("/");
        }
    
        
        const _id=req.params.id;
        console.log(_id);
    
                const result= await Temp.updateOne({_id},{
                   $set: {status:"Completed"}

                },function(err,res1){
    if(err){
        res.send(err);
    }
    console.log("done task");
                    res.redirect("/");

                });
    
            
    }
    catch(error){
        res.send(error);
    }
    })
    


    app.post("/addtask", async function(req,res){
        try{
        
        
            if(req.body.task!=""){
            var employee=new Temp({
    
             task:req.body.task,
             date:req.body.date,
info:req.body.info,
             status:"incomplete"
               })
        
        
            
         
          employee.save(function(err,res1){
              if(err){
                  res.send(err);
              }

              console.log(" added successfully");
          });

          const result=await Temp.find();
        
    
          res.render("demo.ejs",{datas:result});
                         
                  
        
        }
        else{
            const result=await Temp.find();
        
    
          res.render("demo.ejs",{datas:result});
              
            res.render("demo.ejs",{datas:result});
        }
        
            }
            catch(error){
                res.send(error);
        
            }
        
        })
        
        


app.listen(process.env.PORT || 8000);




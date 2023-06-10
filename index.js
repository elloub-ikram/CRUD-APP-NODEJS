const express = require('express');
const app = express();
const mongoose = require("mongoose");

const Plante = require("./models/plante");
const bodyParser = require("body-parser");

app.set('views' , './views');
app.set('view engine' , 'ejs');

const path = require('path')
app.use(
    express.static(
        path.join(__dirname,'assets')
    )
);

app.use(express.json());
app.use(express.urlencoded());
var http = require('http').Server(app);
//parse application
app.use(bodyParser.urlencoded({extended: false}));
//middleware
app.use(bodyParser.json());
//connect to MongoDB
mongoose.connect('mongodb+srv://ikram:ikram@cluster0.m1fjqki.mongodb.net/stock?retryWrites=true&w=majority' ,(err,db)=> {
if(err){
    console.log(err)
} 
if(db){
    console.log('Base de données connecté avec succes')
}   

});




//les routes
// app.get('/stock',(req,res)=>{
   
//     res.sendFile(__dirname + '/views/tableau.ejs');
// });

app.get('/dashboard',(req,res)=>{
    res.render('navbar');
});
app.get('/ajout',(req,res)=>{
    res.render('Ajouter');
});
// ___________________________________________________Users___________________________________________________________
///////////affichage
app.get('/allPlantes',async (req,res)=>{
    let Data;
await Plante.find({})//affiche tous Plantes
.then(result=>{
    Data=result;
    // res.send(result)
});

res.render('tableau',{Data:Data});
});

// 
app.get('/Plante/:id',async (req,res)=>{
    try{
        let plante;

    await Plante.find({_id: req.params.id  })//affiche one user
    .then(result=>{
        plante=result;
    }); 
    // res.send(plante[0].name);

    res.render('page',{plante:plante[0].name});
}catch (err) {console.log(err);}
    });
////////Insertion
app.post('/ajouter_plante',async (req,res)=>{
    try{
    let new_plante = new Plante({
        name:req.body.name,
        color:req.body.color,
        size:req.body.size,
        quantity:req.body.quantity,
        price:req.body.price
    });
    await new_plante.save();
    // res.sendFile(__dirname + '/views/stock.ejs');
    res.render('Ajouter');
}catch(err){console.log(err);
}
});
  
    // delete
    
app.post('/supp_plate',async (req,res)=>{
    try{
    await Plante.findOneAndDelete({_id: req.body.id });
    ////////:
    let Data;
await Plante.find({})//affiche tous Plantes
.then(result=>{
    Data=result;
});

res.render('tableau',{Data:Data});
}catch(err){console.log(err);
}
});
//Update
app.post('/modify_plate',async (req,res)=>{
    try{
    await Plante.findOneAndUpdate({_id: req.body.id},{ 
        name: req.body.name,
        size: req.body.size,
        quantity: req.body.quantity,
        price: req.body.price,
        color: req.body.color

    });
    
    let Data;
await Plante.find({})//affiche tous Plantes
.then(result=>{
    Data=result;
});

res.render('tableau',{Data:Data});
}catch(err){console.log(err);
}
});


//mongodb+srv://ikram:<ikram>@cluster0.m1fjqki.mongodb.net/?retryWrites=true&w=majority
app.listen(5000 , () => {
    console.log('listen to 3000');
})
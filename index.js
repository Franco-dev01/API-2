const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const multer=require('multer');
const upload=multer();
const port=3000;
let frenchMouvies=[];
//middelwear 
// mon fichier css
app.use('/public',express.static('public'))



//parametrer notre ejs apres installation
app.set('views','./views');
app.set('view engine','ejs');

// app.get('/mouvies',(req,res)=>{
//     //res.send('les films seront bientot disponible');
//     //res.render('mouvies-details')
// })


app.get('/mouvies',(req,res)=>{
    const title='film francais des 30 derniers années '

     frenchMouvies=[
        
            {title:'le fabuleux destin d\'amerie poulin',year:2001 },
            {title:'buffet froid',year:1979},
            {title:'le diner de cons',year:1908},
            {title:'Do rouille et d\'os',year:2012 }]

    res.render('mouvies',{mouvies:frenchMouvies,title:title});
})
//poster des element du formulaire
var urlencodeParser=bodyparser.urlencoded({extented:false});
/* 

app.post('/mouvies',urlencodeParser,(req,res)=>{
    console.log('titre:',req.body.title)
    res.sendStatus(201)




    const newmouvies={title:req.body.title,year:req.body.year }
    frenchMouvies=[...frenchMouvies,newmouvies]
    console.log(frenchMouvies)


    console.log('annee:',req.body.year)
    
})
 */


 app.post('/mouvies',upload.fields([]),(req,res)=>{
     if(!req.body){
         return res.sendStatus(500)
     }else{
         const formData=req.body;
         console.log('formData:',formData);
         const newmouvies={title:req.body.title,year:req.body.year }
         frenchMouvies=[...frenchMouvies,newmouvies]
         res.sendStatus(201);
     }
 })

app.get('/mouvies/form',(req,res)=>{
    res.send(`vous etes sur la plateforme des formulaires de connexion hgyug`)
});


app.get('/mouvies/movies-seach',(req,res)=>{
    res.render('movies-seach');
});



app.get('/mouvies/:id',(req,res)=>{

    const id=req.params.id;
    res.render('mouvies-details',{mouviesid:id})
})


//appel de notre page
app.get('/',(req,res)=>{
   // res.send('hello word <b>i am francis</b><br> Desole pour vous les piqtac. bah je blague un peu quoi !');
   const title='vous etes sur mon index '
        res.render('index',{title:title});
    
});






//demarrer le server
app.listen(port,()=>{
    console.log(`listen on port ${port}`);
})
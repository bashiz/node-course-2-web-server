const express=require('express');
const hbs=require('hbs');
const fs=require('fs');


var app=express();

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getcurrentyear',()=>{
  return new Date().getFullYear()
})
app.set('view engine','hbs');
app.use((req,res,next)=>{
  var now= new Date().toString();
  var log= `${now}:${req.url}`;
  fs.appendFile('server.log',log + '\n',(err)=>{
    if (err){
      console.log('unable to append');
    }
  });
next();
});

app.use(express.static(__dirname+'/public'));
app.get('/',(req,res)=>{
  res.send('hello');

});
app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    ex:'about bashi'
  });
});

app.listen(3000);

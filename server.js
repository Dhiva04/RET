var express =require('express');
var app=express();
var port=process.env.PORT||8000;
var morgan=require('morgan');
var mongoose=require('mongoose');
var bodyParser = require('body-parser');
var router=express.Router();
var appRoutes=require('./app/routes/api')(router);
var path=require('path');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/api',appRoutes);

mongoose.connect('mongodb://localhost:27017/ems',function (err) {
    if(err){
        console.log("not connect to db"+err);
    }else
    {
        console.log("Successfully Connected to Mongodb")
    }
});
app.get('/home',function (req,res){
    res.sendFile(path.join(__dirname+'/public/app/views/index.html'));
});

app.use('/resetpassword/:token',require('./app/routes/reset')(router));

app.use(function(req, res, next){
  res.status(404);


  // respond with html page
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname+'/public/app/views/pages/pageNotFound.html'));
    return;
  }
});

app.listen(port ,function () {
console.log('server Runing on port '+port);
});
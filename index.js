const express=require('express');
const app=express();
const cors=require('cors');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const socket = require('./socket/chat')(io,server);
const path=require('path');
const port=process.env.PORT||8000;



server.listen(port);
//const morgan=require('morgan');



app.use(cors({origin:'http://localhost:4200'}));

//app.use(morgan('dev'));

app.use(express.static(__dirname+'/public'));

app.get('*',(req,res)=>{
res.sendFile(path.join(__dirname+'/public/index.html'));

});













//import express
const express = require('express');
//instantiate express
const app = express();

app.use(express.urlencoded());
//tell express what files to serve
app.use(express.static('./server/public'));

//set port number
let port = 5001;

//connect to server
app.listen(port, () => {
    console.log('listening on port', port);
});

//setup route
let taskRouter = require('./routes/task_router');
app.use('/tasks', taskRouter);
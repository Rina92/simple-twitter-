const express=require("express");
let http = require('http');
let app =express();
var path = require("path");


const router = express.Router();

router.get('/hello', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/hello.html'));    
});



app.use('/', router);
const port=3000;

let httpServer = http.createServer(app);
httpServer.listen(port, (r, e) => {
    console.log("listining on port 3000");
   
});
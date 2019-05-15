const express=require("express");
let http = require('http');
let app =express();
var path = require("path");


const router = express.Router();

router.get('/hello', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/hello.html'));    
});

router.get('/quick', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/quick.html'));
   });

app.get('/api/text', (req, res) => {
    if (req.query.text) {
        res.status(200).send({
            message: req.query.text.toUpperCase()
        });
    }
    else
    {
        res.status(401).send();
    }
   
});




app.use('/', router);
const port=3000;

let httpServer = http.createServer(app);
httpServer.listen(port, (r, e) => {
    console.log("listining on port 3000");
   
});
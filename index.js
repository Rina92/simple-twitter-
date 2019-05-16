const express=require("express");
let http = require('http');
let app =express();
let path = require("path");
let repo = require("./repository/repo");
let fs=require("fs");
let https = require('https');


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
router.get('/messages', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/messages.html'));
});

app.get('/api/NewMessage', async (req, res) => {

    console.log("Calling database function");

    var post = await repo.InsertUserPost(req.query.username, req.query.post,req.query.city);

    console.log(post);
    console.log("DB function called");
    res.status(200).send(
        post);
});

app.get('/api/Reply', async (req, res) => {

    console.log("Calling database function");
    console.log(req.query);
    var post = await repo.InsertUserPostComment(req.query.id, req.query.reply);
    console.log(post);
    console.log("DB function called");
    res.status(200).send(
         post);
    
});


var privateKey = fs.readFileSync('server.key');
var certificate = fs.readFileSync('server.cert');
var credentials = { key: privateKey, cert: certificate };

app.use('/', router);
const port=3000;
const ports=3001;

let httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(port, (r, e) => {
    console.log("listining on port 3000");
   
});

httpsServer.listen(ports, (r, e) => {
    console.log("listining on port 3001");
   
});

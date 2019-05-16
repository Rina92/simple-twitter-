const express=require("express");
let http = require('http');
let app =express();
let path = require("path");
let repo = require("./repository/repo");
let fs=require("fs");


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




app.use('/', router);
const port=3000;

let httpServer = http.createServer(app);
httpServer.listen(port, (r, e) => {
    console.log("listining on port 3000");
   
});
var MongoClient = require('mongodb').MongoClient;

var ObjectID = require('mongodb').ObjectID;


var url = "mongodb://localhost:27017/Express";



async function getDb() {
    
    try {

        var con = await MongoClient.connect(url);



        return con;
    } catch (error) {

    }
}

module.exports.InsertSimple = async function InsertDb(text) {


    var db = await MongoClient.connect(url);
    try {
        if (err) throw err;
        var dbo = db.db("Express");
        var myobj = { text: text, TimeStamp: Date.now() };
        var data = await dbo.collection("Entries").insertOne(myobj);
        db.close();
        return data;
    }
    catch (err) {

    }


}
module.exports.InsertUserPost = async function InsertUserPost(user, post,city) {


    var db = await MongoClient.connect(url);
    try {
        var dbo = con.db("Express");
        var myobj = { user: user,city :city, post: post, TimeStamp: Date.now(), comments: [] };

        myobj = await dbo.collection("Posts").insertOne(myobj);

        con.close();
        return myobj.ops[0];
    }
    catch (err) {
        return null;
    }
}

module.exports.InsertUserPostComment = async function InsertUserPostComment(id, comment) {


    var db = await MongoClient.connect(url);
    try {
        var dbo = db.db("Express");

        console.log("reply saving");

        var data = await dbo.collection("Posts").updateOne({ _id: ObjectID(id) },
         { $push: { comments: comment } });
        db.close();
        return data.ops[0];
    }
    catch (err) {
        console.log(err);
    }

}
module.exports.getAllPosts = async function getAllPosts(user) {


    var db = await MongoClient.connect(url);
    try {
        var dbo = db.db("Express");

        var myobj = post;
        var data = await dbo.collection("Posts").find({ user: user });
        db.close();
        return data;
    }
    catch (err) {

    }

}



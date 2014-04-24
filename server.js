var MongoClient = require('mongodb').MongoClient;
var restify = require('restify');


function addContact(req, res, next) {
    console.log("adding contact");
    //var contact = JSON.parse(req.body);
    var contact = req.body;
    MongoClient.connect('mongodb://127.0.0.1:27017/katas', function(err, db) {
        if(err) throw err;

        db.collection('contacts').insert(contact, {w:1}, function(err, objects) {
            if (err) console.warn(err.message);
            if (err && err.message.indexOf('E11000 ') !== -1) {
                res.send(500,err);
            } else {
                res.send(200,contact);
            }
        });

    });

    return next();
}

function updateContact(req, res, next) {
    console.log("updating contact");
    var contact = req.body;
    var id = req.params.email;
    MongoClient.connect('mongodb://127.0.0.1:27017/katas', function(err, db) {
        if(err) throw err;
        db.collection('contacts').update({'email': id}, contact, {safe:true}, function(err, object) {
            if (err) {
                console.warn(err);
            }
            else {
            res.send(200,object);
        }
        });
    });

    return next();
}

function removeContact(req, res, next) {
    console.log("removing contact");
    var id = req.params.email;
    MongoClient.connect('mongodb://127.0.0.1:27017/katas', function(err, db) {
        if(err) throw err;
        db.collection('contacts').remove({'email': id}, function(err, object) {
            if (err) {
                console.warn(err.message);
            }
            else {
                res.send(200,object);
            }
        });
    });

    return next();
}

function getContacts(req,res,next) {
    MongoClient.connect('mongodb://127.0.0.1:27017/katas', function(err, db) {
        if(err) throw err;

        db.collection('contacts').find({}).toArray(function(err,doc){
            if (err) console.warn(err.message);
            res.send(200,doc);
        });
    });
}

function getContact(req,res,next) {
    var id = req.params.email;
    MongoClient.connect('mongodb://127.0.0.1:27017/katas', function(err, db) {
        if(err) throw err;

        db.collection('contacts').findOne({"email" : id},function(err,doc){
            if (err) console.warn(err.message);
            res.send(200,doc);
        });
    });
}

var server = restify.createServer();
server.use(restify.bodyParser());
server.post('/contact/add', addContact);
server.post('/contact/update/email/:email', updateContact);
server.post('/contact/remove/email/:email', removeContact);
server.get('/contacts/', getContacts);
server.get('/contact/email/:email', getContact);

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});



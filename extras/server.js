var express = require('express');
const MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var multer = require('multer');

var app = express();
app.use(express.static(__dirname+'/public'));
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./Images");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({
    storage: Storage
}).array("imgUploader", 3); //Field name and max count


app.get('/',(req, res)=>{
	res.redirect('/index.html');
})

app.get('/signup',(req, res)=>{
	res.redirect('/signup.html');
})

app.get('/login',(req, res)=>{
	res.redirect('/login.html');
})

app.get('/DisplaylostEntries',(req, res)=>{
	res.redirect('/displayLostItem.html');
})

app.get('/DisplayFoundEntries',(req, res)=>{
	res.redirect('/displayFoundItem.html');
})

app.post('/displayLost',(req, res)=>{
  MongoClient.connect('mongodb://localhost:27017/Test', (err, db) => {
    if (err) {
      return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server...');

    db.collection('lostData').find({}).toArray().then((docs) => {
      //console.log(JSON.stringify(docs, undefined, 2));
      res.send(docs);
      }, (err) => {
	       res.status(400).send(err);
         res.send("error");
	    });

	  db.close();
	})
})

app.post('/displayFound',(req, res)=>{
  MongoClient.connect('mongodb://localhost:27017/Test', (err, db) => {
    if (err) {
      return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server...');

    db.collection('FoundData').find({}).toArray().then((docs) => {
      //console.log(JSON.stringify(docs, undefined, 2));
      res.send(docs);
      }, (err) => {
	       res.status(400).send(err);
         res.send("error");
	    });

	  db.close();
	})
})

app.post('/signing', (req, res) => {
  var todo = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.pwd
  };
  //console.log(todo.firstName)
  console.log(req)
  // if(req.body !== ""){}
  MongoClient.connect('mongodb://localhost:27017/Test', (err, db) => {
	  if (err) {
	    return console.log('Unable to connect to MongoDB server');
	  }
	  console.log('Connected to MongoDB server...');

	  db.collection("testData").insertOne(todo,(err, result)=>{
	  	if (err) {
	      res.status(400).send(err);
        res.send("error");
	    }else{
    		//res.send(result.ops);
        res.send("hello");
	    }

	  })

	  db.close();
	})
});

app.post('/loging', (req, res) => {
  var todo = {
    em: req.body.email,
    pass: req.body.pwd
  };
  //console.log(todo.firstName)
  console.log(req)
  // if(req.body !== ""){}
  MongoClient.connect('mongodb://localhost:27017/Test', (err, db) => {
	  if (err) {
	    return console.log('Unable to connect to MongoDB server');
	  }
	  console.log('Connected to MongoDB server...');

    db.collection('testData').find({email: todo.em}).toArray().then((docs) => {

      console.log(JSON.stringify(docs, undefined, 2));
      console.log("password: "+docs[0].password);
      if(docs[0].password===todo.pass)
      {
       console.log(JSON.stringify(docs, undefined, 2));
      }
      else {
        console.log('Unable to fetch todos');
        //res.status(400).send(err);
        //res.send("error");
      }
      }, (err) => {
         //console.log('Unable to fetch todos', err);
         //res.redirect('/login.html');
	       res.status(400).send(err);
         res.send("error");
	    });

	  db.close();
	})
});


app.post("/uploadImage", function(req, res) {
    upload(req, res, function(err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        return res.end("File uploaded sucessfully!.");
    });
});

app.get('/lostentry',(req, res)=>{
  var data = {
    ItemName: req.body.ItemName,
    specification: req.body.specification,
    image:req.body.image
  };
  console.log(req)


  MongoClient.connect('mongodb://localhost:27017/Test', (err, db) => {
    if (err) {
      return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server...');


    db.collection('lostData').insertOne.insertOne(data,(err, result)=>{
	  	if (err) {
	      res.status(400).send(err);
        res.send("error");
	    }else{
    		//res.send(result.ops);
        res.send("hello");
	    }

	  })

	  db.close();
	})


})

app.listen(3000, () => {
  console.log('Started on port 3000');
});

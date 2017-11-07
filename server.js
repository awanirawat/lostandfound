var express = require('express');
const MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var multer = require('multer');

var app = express();
app.use(express.static(__dirname+'/public'));
 app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: true
}));


/*var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./Images");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({
    storage: Storage
}).array("imgUploader", 3);*/


app.get('/',(req, res)=>{
	res.redirect('/index.html');
})

app.get('/signup',(req, res)=>{
	res.redirect('/signup.html');
})

app.get('/login',(req, res)=>{
	res.redirect('/login.html');
})

app.get('/dashboard',(req, res)=>{
	res.redirect('/Personal.html');
})


app.get('/ownData',(req, res)=>{
	res.redirect('/Own_entry.html');
})

app.get('/DisplayLostEntries',(req, res)=>{
	res.redirect('/displayLostItem.html');
})
/////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/myFound',(req, res)=>{
  console.log(req);
  console.log("abc");
  MongoClient.connect('mongodb://localhost:27017/Test', (err, db) => {
    if (err) {
      return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server...');

    //var data=db.collection('FoundData').find({}).toArray()
    db.collection('foundData').find({finder: localStorage.getItem("username")}).toArray().then((docs) => {
      //console.log(JSON.stringify(docs, undefined, 2));
      console.log(docs);
      res.send(docs);
      }, (err) => {
	       res.status(400).send(err);
         res.send("error");
	    });

	  db.close();
	})
})
/////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/myLost',(req, res)=>{
  console.log(req);
  MongoClient.connect('mongodb://localhost:27017/Test', (err, db) => {
    if (err) {
      return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server...');

    //var data=db.collection('FoundData').find({}).toArray()
    db.collection('lostData').find({owner: localStorage.getItem("username")}).toArray().then((docs) => {
      //console.log(JSON.stringify(docs, undefined, 2));
      console.log(docs);
      res.send(docs);
      }, (err) => {
	       res.status(400).send(err);
         res.send("error");
	    });

	  db.close();
	})
})
/////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/myFoundEntries',(req, res)=>{
	res.redirect('/Own_entry.html');
})
/////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/myLostEntries',(req, res)=>{
	res.redirect('#');
})
/////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/DisplayFoundEntries',(req, res)=>{
	res.redirect('/displayFoundItem.html');
})

app.get('/displayLost',(req, res)=>{
  console.log(req);
  MongoClient.connect('mongodb://localhost:27017/Test', (err, db) => {
    if (err) {
      return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server...');

    db.collection('lostData').find({}).toArray().then((docs) => {
      console.log(docs);
      res.send(docs);
      }, (err) => {
	       res.status(400).send(err);
         //res.send("error mine");
	    });

	  db.close();
	})
})

app.get('/displayFound',(req, res)=>{
  console.log(req);
  MongoClient.connect('mongodb://localhost:27017/Test', (err, db) => {
    if (err) {
      return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server...');

    //var data=db.collection('FoundData').find({}).toArray()
    db.collection('foundData').find({}).toArray().then((docs) => {
      //console.log(JSON.stringify(docs, undefined, 2));
      console.log(docs);
      res.send(docs);
      }, (err) => {
	       res.status(400).send(err);
         res.send("error");
	    });

	  db.close();
	})
})


app.post('/displayFoundCategory',(req, res)=>{
  console.log(req);
  var item=req.body.item;
  MongoClient.connect('mongodb://localhost:27017/Test', (err, db) => {
    if (err) {
      return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server...');

    //var data=db.collection('FoundData').find({}).toArray()
    db.collection('foundData').find({itemName : item}).toArray().then((docs) => {
      //console.log(JSON.stringify(docs, undefined, 2));
      console.log(docs);
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
    _id: req.body.email,
    password: req.body.pwd
  };

  MongoClient.connect('mongodb://localhost:27017/Test', (err, db) => {
	  if (err) {
	    return console.log('Unable to connect to MongoDB server');
	  }
	  console.log('Connected to MongoDB server...');
    console.log(todo);
    db.collection("testData").insertOne(todo,(err, result)=>{
	  	     if (err) {
              var data=[{},{}];
	             res.send(data);
               //res.send("error");
	            }else{
    		//res.send(result.ops);
            res.send(todo);
	               }
	  });
	  db.close();
	});
});


///////////////////////////////////////////////////////////////////////////////////////
app.post('/loging', (req, res) => {
  var todo = {
    em: req.body.email,
    pass: req.body.pwd
  };
  console.log(todo);
  //console.log(todo.firstName)
//  console.log(req)
  // if(req.body !== ""){}
  MongoClient.connect('mongodb://localhost:27017/Test', (err, db) => {
	  if (err) {
	    return console.log('Unable to connect to MongoDB server');
	  }
	  console.log('Connected to MongoDB server...');

    db.collection('testData').find({_id: todo.em,password: todo. pass}).toArray().then(function(result){
      res.json(result);
      console.log(result);
      //console.log("password: "+docs[0].password);
	    });
	  db.close();
	})
});


app.post("/uploadImage", function(req, res) {
    console.log(req)
    upload(req, res, function(err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        return res.end("File uploaded sucessfully!.");
    });
});

app.post('/lostentry',(req, res)=>{
  var data = {
    itemName: req.body.itemName,
    owner : req.body.owner,
    contact: req.body.contact,
    specification: req.body.specification,
    location: req.body.location,
    //image:req.body.image
  };
  console.log(data)
  MongoClient.connect('mongodb://localhost:27017/Test', (err, db) => {
    if (err) {
      return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server...');


    db.collection("lostData").insertOne(data,(err, result)=>{
	  	if (err) {
	      res.status(400).send(err);
        res.send("error");
	    }
      else{
    		//res.send(result.ops);
        console.log("hello");
	    }
	  });

	  db.close();
	})

})

app.post('/foundentry',(req, res)=>{
  var data = {
    itemName: req.body.itemName,
    finder : req.body.finder,
    contact: req.body.contact,
    specification: req.body.specification,
    location: req.body.location,
    //image:req.body.image
  };
  console.log(data)
  MongoClient.connect('mongodb://localhost:27017/Test', (err, db) => {
    if (err) {
      return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server...');


    db.collection("foundData").insertOne(data,(err, result)=>{
	  	if (err) {
	      res.status(400).send(err);
        res.send("error");
	    }
      else{
    		//res.send(result.ops);
        console.log("hello");
	    }
	  });

	  db.close();
	})


})

app.listen(3099, () => {
  console.log('Started on port 3000');
});

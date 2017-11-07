<!--FETCHING PACKAGES///////////////////////////////////////////////////////////////////////////////

var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer');
var urlencodedParser = bodyParser.urlencoded({extended:false});
app.use(express.static(__dirname+'/public'));


<!--CONNECTING WITH MONGOOSE/////////////////////////////////////////////////////////////////////////

mongoose.connection.once('open',function(){
  console.log("Connected to Mongo DB");
}).on('error',function(){
  console.log("Error in DB connection");
});


<!--SCHEMAS FOR DATABASE///////////////////////////////////////////////////////////////////////////////

const Schema = mongoose.Schema; <!--OBJECT-->

<!--REGISTRATION

const RegisterSchema = new Schema({
  id:String,
  password:String,
  firstname:String,
  lastname:String
});

<!--LOST

const LostDataSchema = new Schema({
  item:String,
  owner:String,
  contact:String,
  specification:String,
  location:String
});

<!--FOUND

const FoundDataSchema = new Schema({
  item:String,
  finder:String,
  contact:String,
  specification:String,
  location:String,
  owner:String
});


<!--MODELS FOR DATABASES//////////////////////////////////////////////////////////////////////////////

const Register = mongoose.model('registercollection',RegisterSchema);
const LostData = mongoose.model('lostdatacollection',LostDataSchema);
const FoundData = mongoose.model('founddatacollection',FoundDataSchema);


<!-- REDIRECTIONS ////////////////////////////////////////////////////////////////////////////////////

module.exports = function(app){

app.get('/',function(req, res){
	res.render('index');
});

app.get('/signup',function(req, res){
	res.render('signup');
});

app.get('/login',function(req, res){
	res.render('login');
});

app.get('/dashboard',function(req, res){
	res.render('Personal');
});

app.get('/ownData',function(req, res){
	res.render('Own_entry');
});

app.get('/DisplayLostEntries',function(req, res){
	res.render('displayLostItem');
});

app.get('/myFoundEntries',function(req, res){
	res.render('Own_entry');
});

app.get('/myLostEntries',function(req, res){
	res.render('#');
});

app.get('/DisplayFoundEntries',function(req, res){
	res.render('displayFoundItem');
});



<!--HANDLING DATABASE CALLS///////////////////////////////////////////////////////////////////////////////

<!--USER REGISTRATION

app.post('/signing', function(req, res){
console.log(req.body);

  const user = new Register {
    firstname: req.body.firstName,
    lastname: req.body.lastName,
    id: req.body.email,
    password: req.body.pwd
  };
user.save().then(function(){
  console.log("Inserted new user in Register Database");
})
});


<!--USER LOGIN


app.post('/loging',urlencodedParser,function(req,res){
  console.log("check_for_user");
  console.log(req.body.email);

  RegisterUser.find({id:req.body.email,password:req.body.pwd}).then(function(result){
    res.json(result);
    console.log("Check for username and password during login");
    console.log(result);
  });
});


<!--WHAT I HAVE FOUND


app.post('/myFound',urlencodedParser,function(req,res){
  console.log("Database Connection for What I have Found");
  console.log(req.body.name);

  FoundData.find({finder:req.body.name}).then(function(result){
    res.json(result);
    console.log("Returning items which I Found");
    console.log(result);
  });
});


<!--WHAT I HAVE LOST


app.post('/myLost',urlencodedParser,function(req,res){
  console.log("Database Connection for What I have Lost");
  console.log(req.body.name);

  LostData.find({owner:req.body.name}).then(function(result){
    res.json(result);
    console.log("Returning items which I Lost");
    console.log(result);
  });
});


<!--WHAT OTHERS HAVE LOST


app.post('/displayLost',urlencodedParser,function(req,res){
  console.log("Database Connection for What Others have Lost");

  LostData.find({}).then(function(result){
    res.json(result);
    console.log("Returning items which Others Lost");
    console.log(result);
  });
});


<!--WHAT OTHERS HAVE FOUND


app.post('/displayFound',urlencodedParser,function(req,res){
  console.log("Database Connection for What Others have Found");

  FoundData.find({}).then(function(result){
    res.json(result);
    console.log("Returning items which Others Found");
    console.log(result);
  });
});


<!--CATEGORIAL DISPLAY


app.post('/displayFoundCategory',urlencodedParser,function(req,res){
  console.log("Database Connection for Categorial Display");

  FoundData.find({item:req.body.item}).then(function(result){
    res.json(result);
    console.log("Returning items for Categorial Display");
    console.log(result);
  });
});


<!--ENTRY IN LOST TABLE


app.post('/lostentry', function(req, res){
console.log(req.body);
  const data1 = new LostData {
    item: req.body.itemName,
    owner : req.body.owner,
    contact: req.body.contact,
    specification: req.body.specification,
    location: req.body.location
  };
data1.save().then(function(){
  console.log("Inserted new item in Lost Database");
})
});


<!--ENTRY IN FOUND TABLE


app.post('/foundentry', function(req, res){
console.log(req.body);
  const data2 = new FoundData {
    item: req.body.itemName,
    finder : req.body.finder,
    contact: req.body.contact,
    specification: req.body.specification,
    location: req.body.location
  };
data2.save().then(function(){
  console.log("Inserted new item in Found Database");
})
});


<!--UPLOAD IMAGE


app.post("/uploadImage", function(req, res) {
    console.log(req)
    upload(req, res, function(err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        return res.end("File uploaded sucessfully!.");
    });
});


};

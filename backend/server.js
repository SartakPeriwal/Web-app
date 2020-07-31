const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

let User = require('./models/user');
let Product = require('./models/product');

app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
// mongoose.connect('mogodb://127.0.0.1:27017/products', {useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})

// API endpoints

// Getting all the users
userRoutes.route('/').get(function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

//Getting all the products
userRoutes.route('/product').get(function(req, res){
    Product.find(function(err, products) {
        if(err){
            console.log(err);
        }
        else {
            res.json(products);
        }
    });
});


// Adding a new user
userRoutes.route('/add').post(function(req, res) {
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'User': 'User added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});
//Adding a new product
userRoutes.route('/product/add').post(function(req, res) {
    let product = new Product(req.body);
    // console.log('kuch toh batao')
    product.save()
        .then(product => {
            res.status(200).json({'Product': 'Product added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});


// Getting a user by id
userRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    User.findById(id, function(err, user) {
        res.json(user);
    });
});

// Getting a product by id
userRoutes.route('/product/:id').get(function(req, res) {
    let id = req.params.id;
    Product.findById(id, function(err, product) {
        res.json(product);
    });
});
// Getting a product by id
userRoutes.route('/product/user/:id').get(function(req, res) {
    let id = req.params.id;
    Product.find({vendorid: id}, function(err, product) {
        res.json(product);
    });
});
userRoutes.route('/check/user').post(function(req,res) {
    let username =req.body.username;
    let password =req.body.password; 
    let iscustomer = req.body.iscustomer;

    console.log(username, password, iscustomer);

    User.findOne({username :username,password : password, iscustomer: iscustomer},function(err,user){
    if(!user) res.json({authenticated: false});
    else {
        console.log(user)
        res.json({authenticated: true,id: user._id})
        // (user.iscustomer) ? (res.json({role:"customer"})) : (res.json({role:"vendor"}))
    }
    });
});

app.use('/', userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});

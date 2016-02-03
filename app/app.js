var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');

// require controllers
var resourceController = require('./controllers/resources');
var skillController = require('./controllers/skills');
var userController = require('./controllers/users');
var periodController = require('./controllers/periods');
var APIProjectController = require('./controllers/projects');
var APIResourceController = require('./controllers/APIResourceController');

// create express app and http server
var app = express();
var server = require('http').Server(app);

// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

// allow cross domain requests
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
});

// Connect to the beerlocker MongoDB
mongoose.connect('mongodb://localhost:27017/forecast');

// Create Express router
var router = express.Router();

// RESOURCE API
router.route('/resources')
    .post(resourceController.create)
    .get(resourceController.index);

router.route('/resources/:rid')
    .get(resourceController.show)
    .put(resourceController.update)
    .delete(resourceController.remove);

// SKILL API
router.route('/skills')
    .post(skillController.create)
    .get(skillController.index);

router.route('/skills/:sid')
    .get(skillController.show)
    .put(skillController.update)
    .delete(skillController.remove);

// USER API
router.route('/users')
    .post(userController.create)
    .get(userController.index);

router.route('/users/:uid')
    .get(userController.show);
    //.put(userController.update)
    //.delete(userController.remove);

// PERIOD API
router.route('/periods')
    .post(periodController.create)
    .get(periodController.index);

router.route('/periods/:pid')
    .get(periodController.show);
    //.put(periodController.update)
    //.delete(periodController.remove);

// REMOTE API ROUTES
router.route('/projects')
    .get(APIProjectController.index);
router.route('/all_resources')
    .get(APIResourceController.index);

app.use('/@', router);

server.listen(process.argv[2] || config.express.port);
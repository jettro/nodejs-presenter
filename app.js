var pub = __dirname + '/public';
var Slide = require('./slide');
var Presentation = require('./presentation');

var express = require('express')
        , app = express.createServer();

var presentations = [];
var createPresentationNodejs = [];
createPresentationNodejs.push("intro","Creating a presentation with Node.js");
createPresentationNodejs.push("goal","Goal");
presentations.push(new Presentation("Creating a presentation with Node.js","create-presentation-nodejs",createPresentationNodejs,
    "With this presentation I want to show a way to create a presentation without the usual tools. We are going to create our own tool during the presentation."));

app.configure(function() {
    app.set('view engine', 'jade');
    app.set('views', __dirname + '/views');
    app.set('view options', { layout: 'layout' });
    app.use(express.methodOverride());
    app.use(express.static(pub));
    app.use(express.bodyParser());
});

app.get('/', function(req, res) {
    res.render('index', {locals: {presentations:presentations}});
});
//app.get('/slide/:id', presentation.index);
//app.post('/slide/:id', slide.command);

app.listen(8018);
console.log('Express server started on port %s', app.address().port);

//function Slide() {

//    slides.push("Creating a presentation with Node.js",
//            "Goal",
//            "Requirements",
//            "Technology",
//            "Configure url handling",
//            "Handle requests",
//            "View content",
//            "The Future",
//            "Questions");
//}
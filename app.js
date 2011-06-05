var pub = __dirname + '/public';
var Slide = require('./slide');
var Presentation = require('./presentation');
var PresentationController = require('./PresentationController');

var express = require('express')
        , app = express.createServer();

var presentationController = new PresentationController();

var createPresentationNodejs = [];
createPresentationNodejs.push(new Slide("intro","Creating a presentation with Node.js"));
createPresentationNodejs.push(new Slide("goal","Goal"));
createPresentationNodejs.push(new Slide("requirements","Requirements"));
createPresentationNodejs.push(new Slide("technology","technology"));
createPresentationNodejs.push(new Slide("urlhandling","Configure url handling"));
createPresentationNodejs.push(new Slide("handlerequests","Handle requests"));
createPresentationNodejs.push(new Slide("viewcontent","View content"));
createPresentationNodejs.push(new Slide("thefuture","The Future"));
createPresentationNodejs.push(new Slide("questions","Questions"));

presentationController.addPresentation(new Presentation("Creating a presentation with Node.js","create-presentation-nodejs",createPresentationNodejs,
    "For my work I had to prepare a short presentation of around 10 minutes. I decided to create a tool to create presentation with and present about " +
            "it. This is the result, a short presentation showing some of the ideas."));

app.configure(function() {
    app.set('view engine', 'jade');
    app.set('views', __dirname + '/views');
    app.set('view options', { layout: 'layout' });
    app.use(express.methodOverride());
    app.use(express.static(pub));
    app.use(express.bodyParser());
});

app.get('/', presentationController.allPresentations);
app.get('/presentation/:urlIdentifier', presentationController.index);
app.get('/presentation/:urlIdentifier/slide/:id', presentationController.slide);
app.post('/presentation/:urlIdentifier/slide/:id', presentationController.command);

app.listen(8018);
console.log('Express server started on port %s', app.address().port);
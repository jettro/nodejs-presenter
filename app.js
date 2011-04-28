var pub = __dirname + '/public';

var Slide = require('./slide');
var express = require('express')
        , app = express.createServer()
        , slide = new Slide();

app.configure(function() {
    app.set('view engine', 'jade');
    app.set('views', __dirname + '/views');
    app.set('view options', { layout: 'layout' });
    app.use(express.methodOverride());
    app.use(express.static(pub));
//    app.use(express.logger());
    app.use(express.bodyParser());
});

app.get('/', function(req, res) {
    res.render('index', {locals: {slides:slide.allSlides()}});
});
app.get('/slide/:id', slide.index);
app.post('/slide/:id', slide.command);

app.listen(8008);
console.log('Express server started on port %s', app.address().port);



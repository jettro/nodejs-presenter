var presentations = [];

function PresentationController() {
}

PresentationController.prototype.addPresentation = function(presentation) {
    presentations.push(presentation);
};

PresentationController.prototype.allPresentations = function(req, res) {
    res.render('index', {locals: {presentations:presentations}});
};

/**
 * Renders the description page of the presentation.
 *
 * @param req Request object
 * @param res Response object
 */
PresentationController.prototype.index = function(req, res) {
    var presentation = obtainPresentation(req.params.urlIdentifier);
    console.log("This is the url identifier %s", presentation.urlIdentifier);
    res.render(presentation.urlIdentifier + '/index', {locals: {presentation: presentation}});
};

PresentationController.prototype.slide = function(req, res) {
    var id = req.params.id;
    var presentation = obtainPresentation(req.params.urlIdentifier);
    var slide = presentation.slides[id - 1];
    res.render(presentation.urlIdentifier + '/slide/' + slide.identifier,
            {locals: {
                numSlide:req.params.id,
                totalSlide:presentation.slides.length,
                titleSlide:slide.title,
                urlIdentifier:presentation.urlIdentifier
            }});
};

/**
 *
 * @param req
 * @param res
 */
PresentationController.prototype.command = function(req, res) {
    var id = req.params.id;
    var urlIdentifier = req.params.urlIdentifier;
    var command = req.body.command;
    var presentation = obtainPresentation(urlIdentifier);
    var numSlides = presentation.slides.length;

    if (command == 'next' || command == 'n' || command == '') {
        if (id < numSlides) id++;
    } else if (command == 'previous' || command == 'p' || command == 'prev') {
        if (id > 1) id--;
    } else if (command == 'home') {
        res.redirect('/');
        return;
    } else if (!isNaN(command)) {
        var commandNum = parseInt(command);
        if (commandNum > 0 && commandNum <= numSlides) id = commandNum;
    }

    res.redirect('/presentation/' + urlIdentifier + '/slide/' + id);
};

/* Helper functions */
function obtainPresentation(urlIdentifier) {
    var len = presentations.length;
    for (var i = 0; i < len; i++) {
        var presentation = presentations[i];
        if (urlIdentifier == presentation.urlIdentifier) {
            return presentation;
        }
    }
    throw "Could not find the url: " + urlIdentifier;
}

module.exports = PresentationController;
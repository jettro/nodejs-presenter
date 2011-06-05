
var title; // title of the slide as shown on the slide
var urlIdentifier; // used for url mapping and finding this presentation
var slides; // collection of the slides, array of slide objects
var description; // Description of the presentation

/**
 * Create a new presentation, each presentation has a title, a url identifier, the slides and the description
 * of the presentation. You can also add an image of the presentation and a logo.
 *
 * @param title The title of the presentation
 * @param urlIdentifier Identifier of the presentaion
 * @param slides The slides of the presentation
 */
function Presentation(title, urlIdentifier, slides, description) {
    this.title = title;
    this.urlIdentifier = urlIdentifier;
    this.slides = slides;
    this.description = description;
}

/**
 * Starts the presentation by rendering the first slide.
 *
 * @param req Request object
 * @param res Response object
 */
Presentation.prototype.start = function(req,res) {
    renderSlide(req,res,1);
};

/**
 * Renders the description page of the presentation.
 *
 * @param req Request object
 * @param res Response object
 */
Presentation.prototype.renderDescription = function(req,res) {
    res.render('description', {locals: {description:this.description}});
};

/**
 *
 * @param req
 * @param res
 */
Presentation.prototype.command = function(req,res) {
    var id = req.params.id;
    var command = req.body.command;
    if (command == 'next' || command == 'n' || command == '') {
        if (id < slides.length) id++;
    } else if (command == 'previous' || command == 'p' || command == 'prev') {
        if (id > 1) id--;
    } else if (!isNaN(command)) {
        var commandNum = parseInt(command);
        if(commandNum > 0 && commandNum <= slides.length) id = commandNum;
    }

    console.log("Command: %s", command);
    res.redirect(this.urlIdentifier + '/slide/' + this.slides[id].identifier);
};

Presentation.prototype.allSlides = function() {
    console.log("Num slides: %s",slides.length);
    return slides;
};


function renderSlide(req,res,numSlide) {
    res.render('slide/num'+numSlide, {locals: {numSlide:req.params.id,totalSlide:slides.length,titleSlide:slides[numSlide-1]}});
}


module.exports = Presentation;
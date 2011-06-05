
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



Presentation.prototype.allSlides = function() {
    console.log("Num slides: %s",slides.length);
    return slides;
};

module.exports = Presentation;
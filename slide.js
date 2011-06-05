var identifier;
var title;

function Slide(identifier,title) {
    this.identifier = identifier;
    this.title = title;
}

Slide.prototype.identifier = function() {
    return this.identifier;
};

Slide.prototype.description = function() {
    return this.description;
};

module.exports = Slide;
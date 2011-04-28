var slides = [];
function Slide() {
    slides.push("Creating a presentation with Node.js",
            "Goal",
            "Requirements");
}

Slide.prototype.index = function(req,res) {
    renderSlide(req,res,req.params.id);
};

Slide.prototype.command = function(req,res) {
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
    res.redirect('/slide/'+id);
};

Slide.prototype.allSlides = function() {
    console.log("Num slides: %s",slides.length);
    return slides;
};

function renderSlide(req,res,numSlide) {
    res.render('slide/num'+numSlide, {locals: {numSlide:req.params.id,totalSlide:slides.length,titleSlide:slides[numSlide-1]}});
}


module.exports = Slide;
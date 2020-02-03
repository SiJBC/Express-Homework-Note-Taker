// we need to use the path package to set up the correct file for our html

var path = require("path")

// routing

module.exports = function(app) {
    // html get request
    // use the below code to deliver the correct file when users visit the html

app.get("/notes", function (req,res){
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

app.get("*", function (req,res){
        res.sendFile(path.join(__dirname, "../public/index.html"));
});
};
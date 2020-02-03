// begin by loading the data
// by linking the routes to data sources, our data is stored in arrays of json objects

var note_objects = require("../db/note_objects")

module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        res.json(note_objects)
    });
    app.post("/api/notes/", function (req, res) {
        note_objects.push(req.body)
        res.json(true);
    })
    // app.delete("/api/notes", function (req,res){
    //     // need to set the array length 
    //     note_objects.length = 0;
    //     res.json({ok: true })
    // });
};
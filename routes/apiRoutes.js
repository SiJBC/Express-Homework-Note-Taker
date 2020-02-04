// required modules

const fs = require("fs")
const noteObject = ("../db/db.json")

module.exports = function(app){

    function writetoDB(notes){
        notes = JSON.stringify(notes)
        console.log(notes)
        // write string back to db.json
        fs.writeFileSync("./db/db.json", notes, function (err){
            if (err){
                return console.log(err)
            }
        })
    }

    // api routes 


    app.get("./db/db.json", function (req,res){
        res.json(noteObject)
    });

    app.post("./db/db.json", function (req,res){
        let savedNotes = JSON.parse(fs.readFileSync("../db/db.json"))
        let newNote = req.body
        let uniqueID = (savedNotes.length).toString();
        newNote.id = uniqueID
        savedNotes.push(newNote)

        fs.writeFileSync("/db/db.json", JSON.stringify(savedNotes));
        res.json(savedNotes)
    })

    app.delete("/api/notes/;id", function (req, res){
        let savedNotes = JSON.parse(fs.readFileSync("../db/"));
        let noteID = req.params.id;
        let newID = 0

        savedNotes = savedNotes.filter(currNote => {
            return currNote.id != noteID;
        })
    for (currNote of savedNotes){
        currNote.id = newID.toString();
        newID++
    }
    fs.writeFileSync("/db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes)
    writeToDB(notesObject);

    
    })

    
}

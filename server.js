// required node modules

const express = require("express");
const path = require("path");
const fs = require("fs");

// setup global variables
const app = express();
// check if the app is being run through heroku or local
const port = process.env.PORT || 8080;
const mainDir = path.join(__dirname, "/public");

// access the public folder with the js and html files
app.use(express.static('public'));
// recognises the incomming objects as strings of arrays
app.use(express.urlencoded({extended: true}));
// recognises the incoming object as a json object
app.use(express.json());

// use the app get method to display the notes html from the public folder
app.get("/notes", function(req, res) {
    res.sendFile(path.join(mainDir, "notes.html"));
});

// use the app.get method to get the json object from the db.json file
app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

// use the app.get method to get the id's 
app.get("/api/notes/:id", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    // with req we use object orientated notations req.params.id 
    res.json(savedNotes[Number(req.params.id)]);
});

// make the index.html the main page 
app.get("*", function(req, res) {
    // we use res to send to the file
    res.sendFile(path.join(mainDir, "index.html"));
});


app.post("/api/notes", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    // req.body comes from the object itself we use req because we are retrieving data from the file
    let newNote = req.body;
    // set the id as the position in the array, make the id as a string 
    let uniqueID = (savedNotes.length).toString();

    newNote.id = uniqueID;
    savedNotes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    console.log("Note saved to db.json. Content: ", newNote);
    // write the savedNotes in json format 
    res.json(savedNotes);
})

app.delete("/api/notes/:id", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteID = req.params.id;
    let newID = 0;
    // use the filter method to return all the values that do not equal the 
    // 
    savedNotes = savedNotes.filter(currNote => {
        return currNote.id != noteID;
    })
    
    for (currNote of savedNotes) {
        currNote.id = newID.toString();
        newID++;
    }

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
})

app.listen(port, function() {
    console.log("Server listening on: http://localhost:" + port);
})
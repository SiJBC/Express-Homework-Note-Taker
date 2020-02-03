const fs = require("fs")
const notesData = require("../db/db.json");

module.exports = function (app) {
    // need a function which writes the note to the database
    // this is so we can have a delete feature

    function writetoDB(notes) {


        notes = JSON.stringify(notes)
        console.log(notes);

        fs.writeFileSync("./db/db.json", notes, function (err) {
            if (err) {
                return console.log(err)
            }
        })
    }


// API routes
// GET /api/notes - Should read the db.json file and return all saved notes as JSON.
app.get("/api/notes", function (req, res){
res.json(notesData)
});

// POST /api/notes - Should recieve a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
app.get("/api/notes", function(req, res){
    res.json(notesData);
});

// POST Method to add notes
app.post("/api/notes", function(req, res){

    // Set unique id to entry
    // if (notesData.length == 0){
    //     req.body.id = "0";
    // } else{
    //     req.body.id = JSON.stringify(JSON.parse(notesData[notesData.length - 1].id) + 1);
    // }
    
    
    // console.log("req.body.id" + req.body.id)

    // push the body to the JSON array

    notesData.push(req.body);

    // write the notes data to database

    writetoDB(notesData);
    console.log(notesData);

    // return new note in JSON format

    res.json(req.body)
});

 // DELETE /api/notes/:id - Should recieve a query paramter containing the id of a note to delete. This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.

app.delete("/api/notes/:id", function(req, res){

    let id = req.params.id.toString();
console.log(id)
// Go through notesArray searching for a matching ID

for(i=0; i<notesData.length; i++){
if (notesData[i].id == id){
    console.log("match!");
    res.send(notesData[i]);
    notesData.splice(i,1)
    break;
}

}

writetoDB(notesData)
})

}


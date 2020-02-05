// add required modules
const express = require("express");
const path = require("path");

// Create server application at port 3000
const app = express();
const PORT = process.env.PORT || 3003;

// Read URL or JSON
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Include js files
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Use public folder
app.use(express.static("public"));

//fires up the "server"
app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
  });
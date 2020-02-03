var express = require("express")

var app = express();
var PORT = process.env.PORT || 8080;

// activate the url
app.use(express.urlencoded({extended:true }));
// use the method to convert the json object into html format
app.use(express.json());
// use the js and css files provided in the public folder
app.use(express.static("./public/"));

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });

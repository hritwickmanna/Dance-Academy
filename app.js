const path = require("path");

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true });
mongoose.connect('mongodb+srv://hritwick:hDkZuhZ3eoFZIQEW@cluster0.bnwzxpi.mongodb.net/contactDance', { useNewUrlParser: true });

//Define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

var Contact = mongoose.model('Contact', contactSchema);

app.post("/contact", (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the database")
    }).catch(() => {
        res.status(400).send("Item was not saved to the database")
    });
});

app.use("/static", express.static("static"));
app.use(express.urlencoded())

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    const params = {};
    res.status(200).render("home.pug", params);
});

app.get("/contact", (req, res) => {
    const params = {};
    res.status(200).render("contact.pug", params);
});

app.listen(process.env.PORT || 8000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
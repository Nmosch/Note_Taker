const express = require("express");
const path = require("path");
const fs = require("fs");
const PORT = process.env.PORT || 5000;
const db = require("./db/db.json");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const writeFile = (db) => {
    fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
        if (err) throw err;
        console.log("File written");
    })
}

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

console.log(db);

app.get("/api/notes", (req, res) => {
    console.log("api/notes called")
    res.json(db);
});

app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    newNote.id = Math.floor(Math.random() * 10000000);
    db.push(newNote);
    writeFile(db);
    console.log(db);
    res.json(db);
})

app.delete("/api/notes/:id", (req, res) => {
    console.log(req.params.id);
    for (var i = 0; i < db.length; i++){
        if (db[i].id === parseInt(req.params.id)) {
            db.splice(i, 1);
        }
    }
    writeFile(db);
    res.json(db);   
})

app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
})

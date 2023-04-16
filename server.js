const express = require("express");
const app = express();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require('node:path');


// HTML Routes
app.get("/notes", function (_req, res) {
    res.sendFile(path.join(__dirname, "/Develop/public/notes.html"));
  });
  
  app.get("*", function (_req, res) {
    res.sendFile(path.join(__dirname, "/Develop/public/index.html"));
  });

// API Routes
app.get("/api/notes", function (_req, res) {
    fs.readFile(path.join(__dirname, "/db.json"), "utf8", function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.json(JSON.parse(data));
      }
    });
  });
  
  app.post("/api/notes", function (req, res) {
    const newNote = req.body;
    newNote.id = uuidv4();
    fs.readFile(path.join(__dirname, "/db.json"), "utf8", function (err, data) {
      if (err) {
        console.log(err);
      } else {
        const notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile(
          path.join(__dirname, "/db.json"),
          JSON.stringify(notes),
          function (err) {
            if (err) {
              console.log(err);
            } else {
              res.json(newNote);
            }
          }
        );
      }
    });
  });
  
  app.listen(3001, function () {
    console.log("App listening on PORT 3001");
  });
  
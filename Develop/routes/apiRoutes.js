const notesData = require('../db/db.json');
const fs = require("fs")
const path = require("path")

module.exports = (app) => {
    //get the notes already stored
    app.get('/api/notes', (req, res) => {
        console.log(notesData)
        res.json(notesData);
    });

    //post the notes after they've been submitted
    app.post('/api/notes', (req, res) => {
        const notes = req.body;
        console.log(notesData)

        //if user deletes all data, make sure they can still add notes
        if (notesData.length === 0) {
            notes.id = 1
        }
        else {
            notes.id = notesData[notesData.length - 1].id + 1
        }

        //read the JSON files
        fs.readFile(path.join(__dirname, '../db/db.json'), "utf8", function (error, notesData) {
            if (error) {
                console.log(error)
            }

            if(notesData === null) {
                fs.writeFile(path.join(__dirname, '../db/db.json'), notesData, "utf8", function (error) {

                    if (error) {
                        console.log(error)
                    }
                }
                )
            }
            else {
            
            //write to JSON file so notes retain unless deleted
           
            json = JSON.stringify(notes)

            fs.writeFile(path.join(__dirname, '../db/db.json'), json, "utf8", function (error) {

                if (error) {
                    console.log(error)
                }
            }
            )}
        }

        );

        notesData.push(notes);
        res.json(true);

    });

    //delete files
    app.delete('/api/notes/:id', (req, res) => {
        const notes = req.params.id;
        console.log(notes)

        //find ID and delete based on ID
        const foundIndex = notesData.findIndex((el) => el.id = notes)
        notesData.splice(foundIndex, 1)

        fs.writeFile(path.join(__dirname, '../db/db.json'), notesData, function (error) {
            if (error) {
                console.log(error)
            }
        }
        )
        res.json(true);
    });

};
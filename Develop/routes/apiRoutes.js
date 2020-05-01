const notesData = require('../db/db.json');
const reset = require('../db/dbReset.json')
const fs = require('fs')
const path = require('path')

module.exports = (app) => {
    //get the notes already stored
    app.get('/api/notes', (req, res) => {
        // console.log(notesData)

        //if no notes are stored, set notesData to reset
        if (notesData === null) {
            res.json(reset)
        }
        else {
        res.json(notesData)
    }
    });

    //post the notes after they've been submitted
    app.post('/api/notes', (req, res) => {
        const notes = req.body;

        //if user deletes all data, make sure they can still add notes
        if (notesData.length === 0) {
            notes.id = 1
        }
        else {
            notes.id = notesData[notesData.length - 1].id + 1
        }

        //read the JSON files
        fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', function (error, notesData) {
            //need to write code if db.json is empty at the start of the server

            console.log(notesData)
            //write to JSON file so notes retain unless deleted
            let json = JSON.parse(notesData)
            console.log(json)
            json.push(notes)

            fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(json), "utf8", function (error) {

                if (error) {
                    console.log(error)
                }
            }
            )
            // console.log(notes)
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

        fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notesData), function (error) {
            if (error) {
                console.log(error)
            }
        }
        )
        res.json(true);
    });

};
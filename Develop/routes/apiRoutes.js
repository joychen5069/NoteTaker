const notesData = require('../db/db.json');

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
    notes.id = notesData[notesData.length -1].id + 1
      notesData.push(notes);
      res.json(true);
  });

  app.delete('/api/notes/:id', (req, res) => {
    const notes = req.params.id;
        console.log(notes)
    const foundIndex = notesData.findIndex((el) => el.id = notes)
    notesData.splice(foundIndex, 1)
      res.json(true);
  });

  };
const notesData = require('../db/db.json');

module.exports = (app) => {
  app.get('/api/notes', (req, res) => {
    res.json(notesData);
  });

  app.post('/api/notes', (req, res) => {
    const notes = req.body;
    
      notesData.push(notes);
      res.json(true);
  });

  };
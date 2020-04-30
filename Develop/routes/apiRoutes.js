const notesData = require('../db/notesData');

module.exports = (app) => {
  app.get('/api/notes', (req, res) => {
    res.json(notesData);
  });

  app.post('/api/notes', (req, res) => {
    const notes = req.body;
    
      notesData.push(notes);
      res.json(true);
  });

  app.post('/api/clear', function (req, res) {
    // Empty out the arrays of data
    notesData.length = 0;

    res.json({ ok: true });
  });
};
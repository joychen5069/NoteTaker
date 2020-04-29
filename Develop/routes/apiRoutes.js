const notesData = require('../data/notesData');

module.exports = (app) => {
  app.get('/api/notes', (req, res) => {
    res.json(tableData);
  });

  app.post('/api/notes', (req, res) => {
    const reservation = req.body;
    if (tableData.length < 5) {
      tableData.push(reservation);
      res.json(true);
    } else {
      waitListData.push(reservation);
      res.json(false);
    }
  });

  app.post('/api/clear', function (req, res) {
    // Empty out the arrays of data
    notesData.length = 0;

    res.json({ ok: true });
  });
};
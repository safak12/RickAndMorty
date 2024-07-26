const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
app.use(bodyParser.json());


app.get('/notes/:characterId', (req, res) => {
  const { characterId } = req.params;
  db.all("SELECT * FROM notes WHERE characterId = ?", [characterId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});


app.post('/notes', (req, res) => {
  const { characterId, note } = req.body;
  db.run("INSERT INTO notes (characterId, note) VALUES (?, ?)", [characterId, note], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});


app.put('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;
  const { note } = req.body;
  db.run("UPDATE notes SET note = ? WHERE id = ?", [note, noteId], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ changes: this.changes });
  });
});


app.delete('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;
  db.run("DELETE FROM notes WHERE id = ?", [noteId], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ changes: this.changes });
  });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

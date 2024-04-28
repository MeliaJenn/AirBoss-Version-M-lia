const express = require('express'); //c'est mon serveur web express
const bodyParser = require('body-parser');
const db = require('./sqlite_connection');

const app = express();
app.use(bodyParser.json());

// Middleware to enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Ajout d'un utilisateur dans la base de données
app.post('/', (req, res) => {
  const surnomValue = req.body.surnom;
  let params = [surnomValue, req.body.email, req.body.mot_de_passe];
  let query = `
      INSERT INTO utilisateurs (surnom, email, mot_de_passe)
      VALUES (?, ?, ?)
    `;

  db.run(query, params, function (err) {
    if (err) {
      console.log("Problème rencontré lors de la création de compte");
      res.status(500).json({ error: err.message });
      return;
    }

    // Ajout des parties dans la base de données
    params = [surnomValue, 1, 0];
    query = `
    INSERT INTO jeux (surnom_partie, niveau, reussite)
    VALUES (?, ?, ?)
  `;
  
    db.run(query, params, function (err) {
      if (err) {
        console.log("Problème rencontré lors de la création des parties");
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(200).send("Utilisateurs et parties créés avec succès");
    });
  });
});

// Récupération des informations d'un utilisateur 
app.get('/', (req, res) => {
  const surnom = req.query.surnom;
  const query = `
      SELECT * FROM utilisateurs
      WHERE surnom = ?
    `;
  db.get(query, [surnom], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
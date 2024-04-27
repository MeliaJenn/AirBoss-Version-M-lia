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
  const params = [req.body.surnom, req.body.email, req.body.mot_de_passe];
  const query = `
      INSERT INTO utilisateurs (surnom, email, mot_de_passe)
      VALUES (?, ?, ?)
    `;

  db.run(query, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
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

//Créer un fichier package.json : npm init et tout valider
//Installer les dépendances express et sqlite3
//npm i express
//npm i sqplite3
//npm start pour lancer le serveur ou bien dirrectement node index.js
//installer nodemon permettant de ne pas avoir a relancer le serveur a chaque modification du backend : 
//sudo npm install -g nodemon
//lui donner le fichier a lancer à chaque fois que l'on desir lancer le serveur : nodemon index.js

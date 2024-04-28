/*Fichier de création de la base de données executé en ligne de commande sqlite3*/

/* Les tables v1
CREATE TABLE utilisateurs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    surnom TEXT UNIQUE NOT NULL,
    email TEXT,
    mot_de_passe TEXT NOT NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_jeu INTEGER,
    FOREIGN KEY (id_jeu) REFERENCES jeu(id)
);

CREATE TABLE jeu (
    id INTEGER PRIMARY KEY AUTOINCREMENT
);
*/

/*Les tables v2*/
CREATE TABLE utilisateurs (
    surnom TEXT PRIMARY KEY,
    email TEXT,
    mot_de_passe TEXT NOT NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE jeux (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    surnom_partie TEXT,
    niveau INT,
    reussite INT CHECK (reussite >= 0 AND reussite <= 3),
    FOREIGN KEY (surnom_partie) REFERENCES utilisateurs(surnom)
);

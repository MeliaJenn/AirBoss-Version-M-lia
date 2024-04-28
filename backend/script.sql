/*Fichier de création de la base de données exacuté en ligne de commande sqlite3*/

/* Les tables */
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

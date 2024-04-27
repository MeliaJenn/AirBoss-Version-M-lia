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



/*
Création de/ Connexion à la bdd : ouvrir un terminal et taper sqlite3 bdd.db
Cela ouvre une console sqlite3.
Executer un script (ex pour la creation des tables) : .read script.sql
Voir les tables : .tables
Quitter la console : .quit
*/
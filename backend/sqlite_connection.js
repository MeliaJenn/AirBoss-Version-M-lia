const sqlite3 = require('sqlite3').verbose(); // Verbose for more detailed stack traces
const DB_FILE = './bdd_airboss.db';// ./ = ce dossier la

class SqliteConnection {
  constructor() {
    this.db = new sqlite3.Database(DB_FILE, (err) => {
      // Callback
      if (err) {
        console.error('Erreur lors de la connexion à la base de données SQLite:', err.message);
      } else {
        console.log('Connexion à la base de données SQLite établie.');
      }
    });
  }

  /**
   * Get the connection to the SQLite database.
   * @returns {sqlite3.Database} The connection to the SQLite database.
   */
  getConnection() {
    return this.db;
  }
}

// Export the connection to the SQLite database.
module.exports = new SqliteConnection().getConnection();
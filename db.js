const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Test della connessione al database
pool
  .connect()
  .then(() => console.log("Connessione al database stabilita con successo"))
  .catch((err) => console.error("Errore nella connessione al database:", err));

module.exports = pool;

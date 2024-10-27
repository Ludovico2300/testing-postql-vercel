const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false, // Opzione per disabilitare la verifica del certificato SSL
  },
});

// Test della connessione per verificare che funzioni
pool
  .connect()
  .then(() => console.log("Connessione al database stabilita"))
  .catch((err) => console.error("Errore di connessione:", err));

module.exports = pool;

// Importa le dipendenze
const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();

// Inizializza l'app Express
const app = express();
const port = process.env.PORT || 3000;

// Configura il pool di connessione a PostgreSQL
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Rotta di esempio per testare la connessione
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users"); // Sostituisci 'users' con una tua tabella
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Errore nel server");
  }
});

// Rotta di esempio per testare la connessione
app.get("/customers", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM customers"); // Sostituisci 'customers' con una tua tabella
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Errore nel server");
  }
});
// Rotta di esempio per testare la connessione
app.get("/invoices", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM invoices"); // Sostituisci 'invoices' con una tua tabella
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Errore nel server");
  }
});

// Avvia il server
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});

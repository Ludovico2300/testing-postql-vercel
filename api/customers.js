const express = require("express");
const pool = require("../db"); // Importa il modulo di connessione
const router = express.Router(); // Usa Router per definire le rotte

// Rotta per ottenere tutti i clienti
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM customers");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Errore nel server:", err.message);
    res.status(500).send("Errore nel server");
  }
});

// Rotta per ottenere un cliente specifico per ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM customers WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).send("Cliente non trovato");
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Errore nel server:", err.message);
    res.status(500).send("Errore nel server");
  }
});

// Esporta il router
module.exports = router;

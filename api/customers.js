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

// Rotta per ottenere un singolo cliente tramite ID
router.get("/:id", async (req, res) => {
  const { id } = req.params; // Estrai l'ID dai parametri della richiesta
  try {
    // Esegui la query sul database per ottenere il cliente con l'ID specifico
    const result = await pool.query("SELECT * FROM customers WHERE id = $1", [
      id,
    ]);

    // Controlla se il cliente esiste
    if (result.rows.length === 0) {
      return res.status(404).send("Cliente non trovato");
    }

    // Invia il cliente come risposta
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Errore nel server:", err.message);
    res.status(500).send("Errore nel server");
  }
});

// Esporta il router
module.exports = router;

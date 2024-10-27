const express = require("express");
const pool = require("../db"); // Importa il pool di connessione
const router = express.Router(); // Crea un router

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
  const { id } = req.params; // Estrai l'ID dai parametri della richiesta
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

// Rotta per aggiungere un nuovo cliente
router.post("/", async (req, res) => {
  const { name, email } = req.body; // Estrarre i dati dal corpo della richiesta
  try {
    const result = await pool.query(
      "INSERT INTO customers (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Errore nel server:", err.message);
    res.status(500).send("Errore nel server");
  }
});

// Rotta per aggiornare un cliente specifico
router.put("/:id", async (req, res) => {
  const { id } = req.params; // Estrai l'ID dai parametri
  const { name, email } = req.body; // Estrai i dati dal corpo della richiesta
  try {
    const result = await pool.query(
      "UPDATE customers SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Cliente non trovato");
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Errore nel server:", err.message);
    res.status(500).send("Errore nel server");
  }
});

// Rotta per eliminare un cliente specifico
router.delete("/:id", async (req, res) => {
  const { id } = req.params; // Estrai l'ID dai parametri
  try {
    const result = await pool.query(
      "DELETE FROM customers WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Cliente non trovato");
    }
    res.status(204).send(); // No content
  } catch (err) {
    console.error("Errore nel server:", err.message);
    res.status(500).send("Errore nel server");
  }
});

// Esporta il router
module.exports = router;

const express = require("express");
const customersRouter = require("./customers"); // Importa il modulo delle rotte
const app = express();

app.use(express.json()); // Middleware per parsare il JSON

// Usa il router per le rotte /customers
app.use("/customers", customersRouter);

// Gestisci la root per verificare che il server funzioni
app.get("/", (req, res) => {
  res.send("Server attivo!");
});

module.exports = app; // Esporta l'app

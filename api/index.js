const express = require("express");
const customersRouter = require("./customers"); // Importa il router dei clienti
const pool = require("../db"); // Importa il pool di connessione

const app = express();

app.use(express.json()); // Middleware per analizzare il corpo della richiesta come JSON

// Usa il router dei clienti
app.use("/customers", customersRouter);

// Esporta l'app
module.exports = app;

import { query } from "../db"; // Importa il pool di connessione

export default async (req, res) => {
  try {
    const result = await query("SELECT * FROM customers");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Errore nel server:", err); // Aggiungi più dettagli
    res.status(500).send("Errore nel server: " + err.message);
  }
};

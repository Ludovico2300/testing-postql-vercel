import { Pool } from "pg";
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool; // Esporta il pool di connessione

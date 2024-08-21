import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

// db connection

const db = mysql.createConnection({
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

export default db;

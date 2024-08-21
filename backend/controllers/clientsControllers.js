import db from "../config/db.js";

// GET ALL CLIENT REQUEST
export const getClients = async (req, res) => {
  db.query("SELECT * FROM clients", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

// CREATE CLIENTS
export const getClient = async (req, res) => {
  const { companyName, contacts, email, city } = req.body;

  db.query(
    "INSERT INTO clients (companyName, contacts, email, city) VALUES (?, ?, ?, ?)",
    [companyName, contacts, email, city],
    (err) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ message: "Data Inserted" });
      }
    }
  );
};

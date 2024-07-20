import express from "express";
const app = express();

app.use(express.json());

import mysql from "mysql2";

// connecting Database
const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "node",
});

// post request

app.post("/users", async (req, res) => {
  try {
    const { name, address, country } = req.body;
    const [{ insertId }] = await connection.promise().query(
      `INSERT INTO users (name, address, country) 
          VALUES (?, ?,?)`,
      [name, address, country]
    );
    res.status(202).json({
      message: "User Created",
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.get("/persons", async (req, res) => {
  try {
    const data = await connection.promise().query(`SELECT *  from products;`);
    res.status(200).json({
      users: data[0],
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });	
  }
});


app.get("/persons", async (req, res) => {
  try {
    const data = await connection.promise().query(`SELECT *  from products;`);
    res.status(200).json({
      users: data[0],
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });	
  }
});

app.get("/person/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await connection
      .promise()
      .query(`SELECT *  from person where customerNumber = ?`, [id]);
    res.status(200).json({
      user: data[0][0],
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.patch("/person/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { customerName, city, country } = req.body;
    const update = await connection
      .promise()
      .query(
        `UPDATE person set customerName = ?, city = ?, country = ? where customerNumber = ?`,
        [ customerName, city, country,customerNumber]
      );
    res.status(200).json({
      message: "updated",
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.delete("/person/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const update = await connection
        .promise()
        .query(
          `DELETE FROM  person where customerNumber = ?`,
          [id]
        );
      res.status(200).json({
        message: "deleted",
      });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  });

app.listen(5000, () => {
  console.log("Server listening in http://localhost:5000");
});

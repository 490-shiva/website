const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// SQLite Database
const db = new sqlite3.Database("./users.db", (err) => {

    if (err) {
        console.log(err.message);
    } else {
        console.log("Connected to SQLite database");
    }

});

// Create table
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        phone TEXT,
        email TEXT,
        password TEXT
    )
`);

// Home Route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Signup Route
app.post("/signup", (req, res) => {

    const {
        username,
        phone,
        email,
        password
    } = req.body;

    console.log(req.body);

    const sql = `
        INSERT INTO users (username, phone, email, password)
        VALUES (?, ?, ?, ?)
    `;

    db.run(sql, [username, phone, email, password], function (err) {

        if (err) {

            console.log(err.message);

            return res.status(500).json({
                success: false,
                message: "Database error"
            });

        }

        res.json({
            success: true,
            message: "Account created successfully!"
        });

    });

});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
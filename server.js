const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, "client")));
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "client/", "new.html"));
});

// Signup route
app.post("/signup", (req, res) => {

    const {
        username,
        phone,
        email,
        password
    } = req.body;

    // Create user object
    const newUser = {
        username,
        phone,
        email,
        password,
        createdAt: new Date()
    };

    const filePath = path.join(__dirname, "users.json");

    let users = [];

    // Read old users
    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, "utf8");

        if (fileData) {
            users = JSON.parse(fileData);
        }
    }

    // Add new user
    users.push(newUser);

    // Save users
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    // Response
    res.json({
        success: true,
        message: "Account created successfully!"
    });

});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
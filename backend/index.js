require('dotenv').config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { Client } = require('pg');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(cors());

// Database connection
const db = new Client({
    connectionString: process.env.DATABASE_URL,
});

db.connect(err => {
    if (err) {
        console.error('Connection error', err.stack);
    } else {
        console.log('Connected to PostgreSQL');
    }
});

// Routes
app.post("/api/login", (req, res) => {
    const sessionID = Math.random().toString(36).substring(2);
    res.json({ sessionID });
    console.log("sessionID", sessionID);
});

// Get comments
app.get("/api/comments", (req, res) => {
    db.query("SELECT * FROM comments ORDER BY timestamp DESC", (err, results) => {
        if (err) {
            console.error('Error fetching comments:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results.rows); // Use results.rows for PostgreSQL
    });
});

// Post a new comment
app.post("/api/comments", (req, res) => {
    const { username, comment } = req.body;
    db.query("INSERT INTO comments (username, comment) VALUES ($1, $2) RETURNING id", [username, comment], (err, result) => {
        if (err) {
            console.error('Error inserting comment:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        const newComment = { id: result.rows[0].id, username, comment, timestamp: new Date() };
        io.emit("new-comment", newComment);
        res.json(newComment);
    });
});


// Socket.io connection
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    socket.on("disconnect", () => console.log("User disconnected:", socket.id));
});

// Start server
server.listen(3001, () => console.log("Server running on http://localhost:3001"));


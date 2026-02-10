// Node.js Express server for USATT Head-to-Head Search
// This backend service connects to your PostgreSQL database

const express = require('express');
const { Client } = require('pg');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.SERVER_PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'src')));

// Database configuration - use environment variables
const DB_CONFIG = {
    host: process.env.DB_HOST || '192.168.1.126',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'face2face2',
    user: process.env.DB_USER || 'face2face2_user',
    password: process.env.DB_PASSWORD || 'face2face2_password'
};

// Create database client
const client = new Client(DB_CONFIG);

// Connect to database on startup
async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to PostgreSQL database successfully');
        return true;
    } catch (error) {
        console.error('Database connection error:', error);
        return false;
    }
}

// API Routes

// Get head-to-head matches between two players
app.get('/api/headtohead/:player1/:player2', async (req, res) => {
    const { player1: player1Name, player2: player2Name } = req.params;
    
    try {
        const query = `
            SELECT m.*, 
                   p1.name as player1_name,
                   p2.name as player2_name,
                   t.name as tournament_name,
                   t.start_date as tournament_start_date
            FROM match m
            JOIN player p1 ON m.player1_id = p1.id
            JOIN player p2 ON m.player2_id = p2.id
            JOIN tournament t ON m.tournament_id = t.id
            WHERE (p1.name ILIKE $1 AND p2.name ILIKE $2) 
               OR (p1.name ILIKE $2 AND p2.name ILIKE $1)
            ORDER BY t.start_date DESC
        `;
        
        const result = await client.query(query, [player1Name, player2Name]);
        res.json(result.rows);
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ 
            error: 'Failed to retrieve head-to-head data from database',
            message: error.message 
        });
    }
});

// Get player by name
app.get('/api/player/:name', async (req, res) => {
    const { name } = req.params;
    
    try {
        const query = `
            SELECT * FROM player 
            WHERE name ILIKE $1
            ORDER BY name ASC
            LIMIT 1
        `;
        
        const result = await client.query(query, [name]);
        res.json(result.rows[0] || null);
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ 
            error: 'Failed to retrieve player data from database',
            message: error.message 
        });
    }
});

// Get all players (for autocomplete or player list)
app.get('/api/players', async (req, res) => {
    try {
        const query = `
            SELECT id, name, usatt_id 
            FROM player 
            ORDER BY name ASC
        `;
        
        const result = await client.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ 
            error: 'Failed to retrieve players from database',
            message: error.message 
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK',
        database: client.connection ? 'Connected' : 'Not connected'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ 
        error: 'Internal server error',
        message: err.message 
    });
});

// Start the server
async function startServer() {
    const dbConnected = await connectToDatabase();
    
    if (!dbConnected) {
        console.error('Failed to connect to database. Server will not start.');
        process.exit(1);
    }
    
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Database connected to: ${DB_CONFIG.host}:${DB_CONFIG.port}/${DB_CONFIG.database}`);
    });
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down server...');
    await client.end();
    process.exit(0);
});

// Start the server
startServer().catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
});

module.exports = app;
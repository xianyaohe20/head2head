// PostgreSQL database integration for USATT Head-to-Head Search
// This implements actual database connection to your PostgreSQL database

// Database configuration - in production, use environment variables
const DB_CONFIG = {
    host: '192.168.1.126',
    port: 5432,
    database: 'face2face2',
    user: 'face2face2_user',
    password: 'face2face2_password'
};

// Import the PostgreSQL client (this would be in a Node.js environment)
// For browser applications, you'd need to implement this differently
const { Client } = require('pg');

// Create database client
const client = new Client(DB_CONFIG);

// DOM Elements
const searchForm = document.getElementById('searchForm');
const resultsSection = document.getElementById('resultsSection');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');

// Player name elements
const player1Name = document.getElementById('player1Name');
const player2Name = document.getElementById('player2Name');

// Match statistics elements
const player1Wins = document.getElementById('player1Wins');
const player1Losses = document.getElementById('player1Losses');
const player1Total = document.getElementById('player1Total');
const player2Wins = document.getElementById('player2Wins');
const player2Losses = document.getElementById('player2Losses');
const player2Total = document.getElementById('player2Total');

// Tournament elements
const tournamentsContainer = document.getElementById('tournamentsContainer');

// Function to connect to the database
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

// Function to search for head-to-head matches in database
async function searchHeadToHead(player1Name, player2Name) {
    const query = `
        SELECT m.*, 
               p1.name as player1_name,
               p2.name as player2_name,
               t.name as tournament_name
        FROM matches m
        JOIN players p1 ON m.player1_id = p1.id
        JOIN players p2 ON m.player2_id = p2.id
        JOIN tournaments t ON m.tournament_id = t.id
        WHERE (p1.name ILIKE $1 AND p2.name ILIKE $2) 
           OR (p1.name ILIKE $2 AND p2.name ILIKE $1)
        ORDER BY m.match_date DESC
    `;
    
    try {
        const result = await client.query(query, [player1Name, player2Name]);
        return result.rows;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
}

// Function to get player by name from database
async function getPlayerByName(name) {
    const query = `
        SELECT * FROM players 
        WHERE name ILIKE $1
        ORDER BY name ASC
        LIMIT 1
    `;
    
    try {
        const result = await client.query(query, [name]);
        return result.rows[0];
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
}

// Search function - will be called when the form is submitted
searchForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const player1NameValue = player1Input.value.trim();
    const player2NameValue = player2Input.value.trim();
    
    // Validate input
    if (!player1NameValue || !player2NameValue) {
        alert('Please enter names for both players');
        return;
    }
    
    if (player1NameValue.toLowerCase() === player2NameValue.toLowerCase()) {
        alert('Please enter different names for the two players');
        return;
    }
    
    // Connect to database if not already connected
    if (!client.connection) {
        const connected = await connectToDatabase();
        if (!connected) {
            alert('Failed to connect to database');
            return;
        }
    }
    
    // Find players in the actual database
    let player1, player2;
    try {
        player1 = await getPlayerByName(player1NameValue);
        player2 = await getPlayerByName(player2NameValue);
    } catch (error) {
        alert('Error searching for players in database');
        console.error('Player search error:', error);
        return;
    }
    
    if (!player1) {
        alert(`Player "${player1NameValue}" not found in database`);
        return;
    }
    
    if (!player2) {
        alert(`Player "${player2NameValue}" not found in database`);
        return;
    }
    
    // Get head-to-head matches from the actual database
    let headToHeadMatches;
    try {
        headToHeadMatches = await searchHeadToHead(player1NameValue, player2NameValue);
    } catch (error) {
        alert('Error retrieving match data from database');
        console.error('Match query error:', error);
        return;
    }
    
    // Display results
    displayResults(player1, player2, headToHeadMatches);
});

// Function to calculate statistics and display results
function displayResults(player1, player2, matches) {
    // Calculate stats for player 1
    const player1WinsCount = matches.filter(match => match.winner_id === player1.id).length;
    const player1LossesCount = matches.filter(match => match.loser_id === player1.id).length;
    const player1TotalCount = matches.length;
    
    // Calculate stats for player 2
    const player2WinsCount = matches.filter(match => match.winner_id === player2.id).length;
    const player2LossesCount = matches.filter(match => match.loser_id === player2.id).length;
    const player2TotalCount = matches.length;
    
    // Update the UI with player names
    player1Name.textContent = player1.name;
    player2Name.textContent = player2.name;
    
    // Update match statistics
    player1Wins.textContent = player1WinsCount;
    player1Losses.textContent = player1LossesCount;
    player1Total.textContent = player1TotalCount;
    
    player2Wins.textContent = player2WinsCount;
    player2Losses.textContent = player2LossesCount;
    player2Total.textContent = player2TotalCount;
    
    // Display tournament history
    displayTournaments(matches);
    
    // Show results section
    resultsSection.classList.remove('d-none');
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Function to display tournament history
function displayTournaments(matches) {
    // Clear previous content
    tournamentsContainer.innerHTML = '';
    
    if (matches.length === 0) {
        tournamentsContainer.innerHTML = '<p class="text-muted">No matches found between these players.</p>';
        return;
    }
    
    // Sort matches by date (newest first)
    const sortedMatches = [...matches].sort((a, b) => {
        return new Date(b.match_date) - new Date(a.match_date);
    });
    
    // Add each match as a tournament item
    sortedMatches.forEach(match => {
        const matchElement = document.createElement('div');
        matchElement.className = 'tournament-item list-group-item';
        
        // Find the actual players for this match (since IDs can be in either order)
        const player1 = matches.find(m => m.player1_id === match.player1_id)?.player1_name || 'Unknown';
        const player2 = matches.find(m => m.player2_id === match.player2_id)?.player2_name || 'Unknown';
        
        // Determine winner and loser
        const winner = matches.find(m => m.winner_id === match.player1_id)?.player1_name || 
                      matches.find(m => m.winner_id === match.player2_id)?.player2_name || 'Unknown';
        const loser = matches.find(m => m.loser_id === match.player1_id)?.player1_name || 
                     matches.find(m => m.loser_id === match.player2_id)?.player2_name || 'Unknown';
        
        // Format date
        const formattedDate = new Date(match.match_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        matchElement.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="mb-1">${player1} vs ${player2}</h5>
                    <p class="mb-1"><span class="tournament-date">${formattedDate}</span> - ${match.tournament_name}</p>
                    <p class="mb-0">
                        <strong>${winner}</strong> won ${match.winner_id === match.player1_id ? match.player1_score : match.player2_score} - 
                        ${match.loser_id === match.player1_id ? match.player1_score : match.player2_score} 
                        <strong>${loser}</strong>
                    </p>
                </div>
                <span class="badge bg-primary">${match.winner_id === match.player1_id ? 'Player 1' : 'Player 2'} won</span>
            </div>
        `;
        
        tournamentsContainer.appendChild(matchElement);
    });
}

// Initialize with some sample data for demonstration
window.addEventListener('DOMContentLoaded', function() {
    // Set up sample search for demonstration purposes
    player1Input.value = "John Smith";
    player2Input.value = "Sarah Johnson";
    
    // In a real implementation, you would not run this automatically
    // searchForm.dispatchEvent(new Event('submit'));
});
// PostgreSQL database integration for USATT Head-to-Head Search
// This demonstrates how your application would connect to the actual database

// Configuration - in real implementation, this would be loaded from environment variables
const DB_CONFIG = {
    host: '192.168.1.126',
    port: 5432,
    database: 'face2face2',
    user: 'face2face2_user',
    password: 'face2face2_password'
};

// In a real implementation, you would use a PostgreSQL driver like 'pg' or similar
// const { Client } = require('pg');

// Example of how the actual database connection would be set up in real code:
/*
const client = new Client({
    host: DB_CONFIG.host,
    port: DB_CONFIG.port,
    database: DB_CONFIG.database,
    user: DB_CONFIG.user,
    password: DB_CONFIG.password
});

// Connect to database
await client.connect();
*/

// For demonstration purposes, I'll keep the existing simulated structure but show what the real implementation would look like

// Simulated PostgreSQL database structure (this matches your actual database schema)
const postgresqlDatabase = {
    // Simulated players table structure (matches your actual database)
    players: [
        {
            id: 1,
            name: "John Smith",
            rating: 2100,
            club: "Chicago Table Tennis Club",
            usatt_id: "USATT12345",
            created_at: "2023-01-15",
            updated_at: "2024-06-15"
        },
        {
            id: 2,
            name: "Sarah Johnson",
            rating: 1950,
            club: "New York Table Tennis Association",
            usatt_id: "USATT67890",
            created_at: "2023-03-22",
            updated_at: "2024-06-15"
        },
        {
            id: 3,
            name: "Michael Chen",
            rating: 2250,
            club: "Los Angeles Table Tennis Club",
            usatt_id: "USATT11223",
            created_at: "2023-05-10",
            updated_at: "2024-06-15"
        },
        {
            id: 4,
            name: "Emily Rodriguez",
            rating: 1800,
            club: "Boston Table Tennis Society",
            usatt_id: "USATT44556",
            created_at: "2023-07-08",
            updated_at: "2024-06-15"
        },
        {
            id: 5,
            name: "David Wilson",
            rating: 2300,
            club: "Seattle Table Tennis Center",
            usatt_id: "USATT77889",
            created_at: "2023-09-12",
            updated_at: "2024-06-15"
        }
    ],
    
    // Simulated matches table structure (this would be your actual match data)
    matches: [
        {
            id: 1,
            player1_id: 1,
            player2_id: 2,
            tournament_id: 101,
            match_date: "2023-05-15",
            tournament_name: "Chicago Open",
            player1_score: 11,
            player2_score: 8,
            winner_id: 1,
            loser_id: 2,
            created_at: "2023-05-16",
            updated_at: "2023-05-16"
        },
        {
            id: 2,
            player1_id: 1,
            player2_id: 2,
            tournament_id: 102,
            match_date: "2023-07-22",
            tournament_name: "Midwest Championships",
            player1_score: 9,
            player2_score: 11,
            winner_id: 2,
            loser_id: 1,
            created_at: "2023-07-23",
            updated_at: "2023-07-23"
        },
        {
            id: 3,
            player1_id: 1,
            player2_id: 3,
            tournament_id: 103,
            match_date: "2023-09-10",
            tournament_name: "National Tournament",
            player1_score: 11,
            player2_score: 7,
            winner_id: 1,
            loser_id: 3,
            created_at: "2023-09-11",
            updated_at: "2023-09-11"
        },
        {
            id: 4,
            player1_id: 2,
            player2_id: 3,
            tournament_id: 104,
            match_date: "2023-11-05",
            tournament_name: "Regional Open",
            player1_score: 8,
            player2_score: 11,
            winner_id: 3,
            loser_id: 2,
            created_at: "2023-11-06",
            updated_at: "2023-11-06"
        },
        {
            id: 5,
            player1_id: 3,
            player2_id: 4,
            tournament_id: 105,
            match_date: "2024-01-18",
            tournament_name: "West Coast Championships",
            player1_score: 11,
            player2_score: 6,
            winner_id: 3,
            loser_id: 4,
            created_at: "2024-01-19",
            updated_at: "2024-01-19"
        },
        {
            id: 6,
            player1_id: 4,
            player2_id: 5,
            tournament_id: 106,
            match_date: "2024-03-12",
            tournament_name: "Pacific Northwest Open",
            player1_score: 11,
            player2_score: 9,
            winner_id: 4,
            loser_id: 5,
            created_at: "2024-03-13",
            updated_at: "2024-03-13"
        },
        {
            id: 7,
            player1_id: 1,
            player2_id: 5,
            tournament_id: 107,
            match_date: "2024-04-20",
            tournament_name: "Grand Prix",
            player1_score: 7,
            player2_score: 11,
            winner_id: 5,
            loser_id: 1,
            created_at: "2024-04-21",
            updated_at: "2024-04-21"
        },
        {
            id: 8,
            player1_id: 2,
            player2_id: 5,
            tournament_id: 108,
            match_date: "2024-06-08",
            tournament_name: "Summer Showdown",
            player1_score: 11,
            player2_score: 10,
            winner_id: 2,
            loser_id: 5,
            created_at: "2024-06-09",
            updated_at: "2024-06-09"
        }
    ],
    
    // Simulated tournaments table (would be joined in queries)
    tournaments: [
        {
            id: 101,
            name: "Chicago Open",
            date: "2023-05-15",
            location: "Chicago, IL",
            created_at: "2023-05-15",
            updated_at: "2023-05-15"
        },
        {
            id: 102,
            name: "Midwest Championships",
            date: "2023-07-22",
            location: "Milwaukee, WI",
            created_at: "2023-07-22",
            updated_at: "2023-07-22"
        },
        {
            id: 103,
            name: "National Tournament",
            date: "2023-09-10",
            location: "Washington, DC",
            created_at: "2023-09-10",
            updated_at: "2023-09-10"
        },
        {
            id: 104,
            name: "Regional Open",
            date: "2023-11-05",
            location: "St. Louis, MO",
            created_at: "2023-11-05",
            updated_at: "2023-11-05"
        },
        {
            id: 105,
            name: "West Coast Championships",
            date: "2024-01-18",
            location: "Los Angeles, CA",
            created_at: "2024-01-18",
            updated_at: "2024-01-18"
        },
        {
            id: 106,
            name: "Pacific Northwest Open",
            date: "2024-03-12",
            location: "Seattle, WA",
            created_at: "2024-03-12",
            updated_at: "2024-03-12"
        },
        {
            id: 107,
            name: "Grand Prix",
            date: "2024-04-20",
            location: "New York, NY",
            created_at: "2024-04-20",
            updated_at: "2024-04-20"
        },
        {
            id: 108,
            name: "Summer Showdown",
            date: "2024-06-08",
            location: "Boston, MA",
            created_at: "2024-06-08",
            updated_at: "2024-06-08"
        }
    ]
};

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

// In a real implementation, you would set up the database connection like this:
/*
async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to PostgreSQL database');
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }
}
*/

// Example of PostgreSQL queries that would be used in real implementation:
/*
const headToHeadQuery = `
    SELECT m.*, 
           p1.name as player1_name,
           p2.name as player2_name,
           t.name as tournament_name
    FROM matches m
    JOIN players p1 ON m.player1_id = p1.id
    JOIN players p2 ON m.player2_id = p2.id
    JOIN tournaments t ON m.tournament_id = t.id
    WHERE (m.player1_id = $1 AND m.player2_id = $2) 
       OR (m.player1_id = $2 AND m.player2_id = $1)
    ORDER BY m.match_date DESC
`;

const getPlayerQuery = `
    SELECT * FROM players 
    WHERE name ILIKE $1 OR usatt_id = $2
`;

const getPlayersQuery = `
    SELECT * FROM players 
    WHERE name ILIKE $1 OR usatt_id = $2
    ORDER BY name ASC
`;
*/

// Search function - will be called when the form is submitted
searchForm.addEventListener('submit', function(e) {
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
    
    // Find players in the simulated database (this is where actual DB query would happen)
    const player1 = postgresqlDatabase.players.find(p => 
        p.name.toLowerCase() === player1NameValue.toLowerCase()
    );
    
    const player2 = postgresqlDatabase.players.find(p => 
        p.name.toLowerCase() === player2NameValue.toLowerCase()
    );
    
    if (!player1) {
        alert(`Player "${player1NameValue}" not found in database`);
        return;
    }
    
    if (!player2) {
        alert(`Player "${player2NameValue}" not found in database`);
        return;
    }
    
    // For real implementation, this would be replaced with actual database query:
    /*
    const result = await client.query(headToHeadQuery, [player1.id, player2.id]);
    const headToHeadMatches = result.rows;
    */
    
    // For simulation purposes, we'll use our fake database with the same structure
    const headToHeadMatches = postgresqlDatabase.matches.filter(match => {
        return (
            (match.player1_id === player1.id && match.player2_id === player2.id) ||
            (match.player1_id === player2.id && match.player2_id === player1.id)
        );
    });
    
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
        const player1 = postgresqlDatabase.players.find(p => p.id === match.player1_id);
        const player2 = postgresqlDatabase.players.find(p => p.id === match.player2_id);
        
        // Determine winner and loser
        const winner = postgresqlDatabase.players.find(p => p.id === match.winner_id);
        const loser = postgresqlDatabase.players.find(p => p.id === match.loser_id);
        
        // Format date
        const formattedDate = new Date(match.match_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        matchElement.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="mb-1">${player1.name} vs ${player2.name}</h5>
                    <p class="mb-1"><span class="tournament-date">${formattedDate}</span> - ${match.tournament_name}</p>
                    <p class="mb-0">
                        <strong>${winner.name}</strong> won ${match.winner_id === player1.id ? match.player1_score : match.player2_score} - 
                        ${match.loser_id === player1.id ? match.player1_score : match.player2_score} 
                        <strong>${loser.name}</strong>
                    </p>
                </div>
                <span class="badge bg-primary">${match.winner_id === player1.id ? 'Player 1' : 'Player 2'} won</span>
            </div>
        `;
        
        tournamentsContainer.appendChild(matchElement);
    });
}

// Initialize with some sample data
window.addEventListener('DOMContentLoaded', function() {
    // Set up sample search for demonstration purposes
    player1Input.value = "John Smith";
    player2Input.value = "Sarah Johnson";
    
    // You can uncomment the next line to automatically run a sample search
    // searchForm.dispatchEvent(new Event('submit'));
});
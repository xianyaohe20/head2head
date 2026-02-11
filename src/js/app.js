// PostgreSQL database integration for USATT Head-to-Head Search
// This implements actual API calls to your backend service

// Backend server URL - update this if your backend runs on a different host/port
const API_BASE_URL = 'http://localhost:3000/api';

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

// Function to make API calls to backend server
async function makeApiCall(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API call error:', error);
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

    try {
        // Get head-to-head matches from the backend API
        const headToHeadMatches = await makeApiCall(
            `/headtohead/${encodeURIComponent(player1NameValue)}/${encodeURIComponent(player2NameValue)}`
        );
        
        console.log('Received matches from API:', headToHeadMatches);

        // For demonstration purposes, we'll simulate getting player data
        // In real implementation, you'd get this from the database too

        // For now, we'll use mock player data since the API would handle this
        const player1 = {
            id: 1,
            name: player1NameValue,
            usatt_id: "USATT12345",
            omnipong_pid: "OP12345"
        };

        const player2 = {
            id: 2,
            name: player2NameValue,
            usatt_id: "USATT67890",
            omnipong_pid: "OP67890"
        };

        // Display results
        displayResults(player1, player2, headToHeadMatches);
    } catch (error) {
        alert('Error retrieving data from server');
        console.error('Search error:', error);
    }
});

// Function to calculate statistics and display results
function displayResults(player1, player2, matches) {
    console.log('Displaying results for:', player1.name, 'vs', player2.name);
    console.log('Matches count:', matches.length);
    
    // Calculate stats for player 1 and player 2 correctly
    let player1WinsCount = 0;
    let player1LossesCount = 0;
    let player2WinsCount = 0;
    let player2LossesCount = 0;
    
    // Loop through all matches to count wins/losses properly
    if (matches && matches.length > 0) {
        matches.forEach((match, index) => {
            console.log(`Match ${index + 1}:`, match);
            
            // Check if player1 is in this match and calculate accordingly
            if (match.player1_id === player1.id) {
                // Player 1 is the first player in this match
                if (match.player1_win === true) {
                    player1WinsCount++;
                } else {
                    player1LossesCount++;
                }
            } else if (match.player2_id === player1.id) {
                // Player 1 is the second player in this match
                if (match.player1_win === false) {
                    player1WinsCount++;
                } else {
                    player1LossesCount++;
                }
            }
            
            // Check if player2 is in this match and calculate accordingly
            if (match.player1_id === player2.id) {
                // Player 2 is the first player in this match
                if (match.player1_win === true) {
                    player2WinsCount++;
                } else {
                    player2LossesCount++;
                }
            } else if (match.player2_id === player2.id) {
                // Player 2 is the second player in this match
                if (match.player1_win === false) {
                    player2WinsCount++;
                } else {
                    player2LossesCount++;
                }
            }
        });
    }
    
    const player1TotalCount = player1WinsCount + player1LossesCount;
    const player2TotalCount = player2WinsCount + player2LossesCount;

    console.log('Calculated stats - Player1:', { wins: player1WinsCount, losses: player1LossesCount, total: player1TotalCount });
    console.log('Calculated stats - Player2:', { wins: player2WinsCount, losses: player2LossesCount, total: player2TotalCount });

    // Update the UI with player names
    player1Name.textContent = player1.name;
    player2Name.textContent = player2.name;

    // Update match statistics - make sure we're setting all values
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

    if (!matches || matches.length === 0) {
        tournamentsContainer.innerHTML = '<p class="text-muted">No matches found between these players.</p>';
        return;
    }

    // Sort matches by date (newest first)
    const sortedMatches = [...matches].sort((a, b) => {
        return new Date(b.tournament_start_date) - new Date(a.tournament_start_date);
    });

    // Add each match as a tournament item
    sortedMatches.forEach(match => {
        const matchElement = document.createElement('div');
        matchElement.className = 'tournament-item list-group-item';

        // Format date
        const formattedDate = new Date(match.tournament_start_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Determine winner and loser correctly
        let winnerName, loserName;
        
        if (match.player1_win === true) {
            // Player 1 won
            winnerName = match.player1_name;
            loserName = match.player2_name;
        } else if (match.player1_win === false) {
            // Player 2 won
            winnerName = match.player2_name;
            loserName = match.player1_name;
        } else {
            // Fallback - show as Player 1 won if we can't determine
            winnerName = match.player1_name;
            loserName = match.player2_name;
        }

        // Format the score to show as -7, 8, 9, 9 (as requested)
        const score = match.match_result_concise || "N/A";

        matchElement.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="mb-1">${match.player1_name} vs ${match.player2_name}</h5>
                    <p class="mb-1"><span class="tournament-date">${formattedDate}</span> - ${match.tournament_name}</p>
                    <p class="mb-0">
                        <strong>${winnerName}</strong> won ${score} 
                        <strong>${loserName}</strong>
                    </p>
                </div>
                <span class="badge bg-primary">${match.player1_win === true ? 'Player 1' : match.player1_win === false ? 'Player 2' : 'Unknown'} won</span>
            </div>
        `;

        tournamentsContainer.appendChild(matchElement);
    });
}

// Initialize with sample data for demonstration
window.addEventListener('DOMContentLoaded', function() {
    // Set up sample search for demonstration purposes (would be removed in production)
    player1Input.value = "John Smith";
    player2Input.value = "Sarah Johnson";

    // In a real implementation, you would not run this automatically
    // searchForm.dispatchEvent(new Event('submit'));
});
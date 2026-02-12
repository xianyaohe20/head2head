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
const player1Score = document.getElementById('player1Score');
const player2Score = document.getElementById('player2Score');
const totalMatchesCount = document.getElementById('totalMatchesCount');

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
    // Calculate wins based on the actual names entered in the search boxes
    let player1WinsCount = 0;
    let player2WinsCount = 0;
    
    matches.forEach(match => {
        // Determine the actual winner's name from the match record
        const winnerName = match.player1_win ? match.player1_name : match.player2_name;
        
        // Compare winner's name with the name in the first search box (player 1)
        if (winnerName.toLowerCase() === player1.name.toLowerCase()) {
            player1WinsCount++;
        } else {
            player2WinsCount++;
        }
    });
    
    // Update the UI with player names
    player1Name.textContent = player1.name;
    player2Name.textContent = player2.name;
    
    // Update match statistics
    player1Score.textContent = player1WinsCount;
    player2Score.textContent = player2WinsCount;
    totalMatchesCount.textContent = matches.length;
    
    // Display tournament history
    displayTournaments(player1, player2, matches);
    
    // Show results section
    resultsSection.classList.remove('d-none');
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Function to display tournament history
function displayTournaments(player1, player2, matches) {
    // Clear previous content
    tournamentsContainer.innerHTML = '';
    
    if (matches.length === 0) {
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
        
        // Determine winner and loser
        const winnerName = match.player1_win ? match.player1_name : match.player2_name;
        const loserName = match.player1_win ? match.player2_name : match.player1_name;
        
        // Check if the winner is the person in search box 1
        const player1WonMatch = winnerName.toLowerCase() === player1.name.toLowerCase();
        
        // Format the score to show as -7, 8, 9, 9 (as requested)
        const score = match.match_result_concise || "N/A";
        
        matchElement.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="mb-1">${player1.name} vs ${player2.name}</h5>
                    <p class="mb-1"><span class="tournament-date">${formattedDate}</span> - ${match.tournament_name}</p>
                    <p class="mb-0">
                        <strong>${winnerName}</strong> won ${score} 
                        <strong>${loserName}</strong>
                    </p>
                </div>
                <span class="badge bg-primary">${player1WonMatch ? 'Player 1' : 'Player 2'} won</span>
            </div>
        `;
        
        tournamentsContainer.appendChild(matchElement);
    });
}

// Initialize with sample data for demonstration
window.addEventListener('DOMContentLoaded', function() 
{
    // Set up sample search for demonstration purposes (would be removed in production)
    player1Input.value = "";
    player2Input.value = "";
    
    // In a real implementation, you would not run this automatically
    // searchForm.dispatchEvent(new Event('submit'));
});
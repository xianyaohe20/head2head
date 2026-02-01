// Main JavaScript file for USATT Head-to-Head Search
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const noResultsElement = document.getElementById('noResults');
    const resultsContent = document.getElementById('resultsContent');
    
    // Handle form submission
    searchForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const player1 = document.getElementById('player1').value.trim();
        const player2 = document.getElementById('player2').value.trim();
        
        if (!player1 || !player2) {
            showError('Please enter both player names');
            return;
        }
        
        if (player1.toLowerCase() === player2.toLowerCase()) {
            showError('Please enter two different player names');
            return;
        }
        
        // Show loading state
        showLoading();
        hideError();
        hideNoResults();
        hideResults();
        
        try {
            // Fetch head-to-head data from JustGo API
            const headToHeadData = await fetchHeadToHead(player1, player2);
            
            if (headToHeadData && headToHeadData.matches && headToHeadData.matches.length > 0) {
                displayResults(headToHeadData, player1, player2);
            } else {
                showNoResults();
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            showError('Failed to fetch head-to-head data. Please check the player names and try again.');
        }
    });
    
    // Function to fetch head-to-head data from JustGo API
    async function fetchHeadToHead(player1, player2) {
        // For demonstration purposes, we'll simulate API responses
        // In a real implementation, you would use the actual API endpoints
        
        // This is where you would normally make API calls to JustGo
        // For example:
        /*
        const response = await fetch(`https://api.justgo.com/head-to-head?player1=${encodeURIComponent(player1)}&player2=${encodeURIComponent(player2)}`);
        const data = await response.json();
        return data;
        */
        
        // Simulated response for demonstration
        return new Promise((resolve) => {
            setTimeout(() => {
                const sampleData = {
                    matches: [
                        {
                            tournament: "2024 National Championship",
                            date: "2024-06-15",
                            player1: player1,
                            player2: player2,
                            score1: 11,
                            score2: 9,
                            winner: player1
                        },
                        {
                            tournament: "2023 Regional Tournament",
                            date: "2023-11-22",
                            player1: player1,
                            player2: player2,
                            score1: 7,
                            score2: 11,
                            winner: player2
                        },
                        {
                            tournament: "2023 State Championship",
                            date: "2023-04-18",
                            player1: player1,
                            player2: player2,
                            score1: 11,
                            score2: 8,
                            winner: player1
                        },
                        {
                            tournament: "2022 Club Championship",
                            date: "2022-08-30",
                            player1: player1,
                            player2: player2,
                            score1: 9,
                            score2: 11,
                            winner: player2
                        }
                    ]
                };
                resolve(sampleData);
            }, 1000);
        });
    }
    
    // Function to display results
    function displayResults(data, player1, player2) {
        // Calculate statistics
        let player1Wins = 0;
        let player2Wins = 0;
        let totalMatches = data.matches.length;
        
        data.matches.forEach(match => {
            if (match.winner.toLowerCase() === player1.toLowerCase()) {
                player1Wins++;
            } else if (match.winner.toLowerCase() === player2.toLowerCase()) {
                player2Wins++;
            }
        });
        
        // Update UI with player names
        document.getElementById('player1Name').textContent = player1;
        document.getElementById('player2Name').textContent = player2;
        
        // Update statistics
        document.getElementById('player1Wins').textContent = player1Wins;
        document.getElementById('player2Wins').textContent = player2Wins;
        document.getElementById('player1Losses').textContent = totalMatches - player1Wins;
        document.getElementById('player2Losses').textContent = totalMatches - player2Wins;
        document.getElementById('totalMatches').textContent = totalMatches;
        
        // Display tournament history
        displayTournaments(data.matches, player1, player2);
        
        // Show results
        hideLoading();
        showResults();
    }
    
    // Function to display tournament history
    function displayTournaments(matches, player1, player2) {
        const tournamentsList = document.getElementById('tournamentsList');
        
        if (matches.length === 0) {
            tournamentsList.innerHTML = '<p class="text-center text-muted">No tournament matches found.</p>';
            return;
        }
        
        let html = '';
        
        // Sort matches by date (newest first)
        const sortedMatches = [...matches].sort((a, b) => new Date(b.date) - new Date(a.date));
        
        sortedMatches.forEach(match => {
            // Determine match result
            let resultClass = '';
            let resultText = '';
            
            if (match.winner.toLowerCase() === player1.toLowerCase()) {
                resultClass = 'win';
                resultText = 'WIN';
            } else if (match.winner.toLowerCase() === player2.toLowerCase()) {
                resultClass = 'loss';
                resultText = 'LOSS';
            }
            
            html += `
                <div class="tournament-item">
                    <div class="row">
                        <div class="col-md-8">
                            <h5 class="tournament-title">${match.tournament}</h5>
                            <p class="tournament-date"><i class="far fa-calendar"></i> ${formatDate(match.date)}</p>
                        </div>
                        <div class="col-md-4 text-end">
                            <div class="match-result ${resultClass}">
                                ${resultText}
                            </div>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-md-6 text-center">
                            <span class="player-name">${match.player1}</span>
                            <p class="mb-0">${match.score1} - ${match.score2}</p>
                        </div>
                        <div class="col-md-6 text-center">
                            <span class="player-name">${match.player2}</span>
                            <p class="mb-0">${match.score2} - ${match.score1}</p>
                        </div>
                    </div>
                </div>
            `;
        });
        
        tournamentsList.innerHTML = html;
    }
    
    // Helper function to format date
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }
    
    // UI state management functions
    function showLoading() {
        loadingElement.classList.remove('d-none');
    }
    
    function hideLoading() {
        loadingElement.classList.add('d-none');
    }
    
    function showError(message) {
        errorElement.textContent = message;
        errorElement.classList.remove('d-none');
    }
    
    function hideError() {
        errorElement.classList.add('d-none');
    }
    
    function showNoResults() {
        noResultsElement.classList.remove('d-none');
        hideLoading();
    }
    
    function hideNoResults() {
        noResultsElement.classList.add('d-none');
    }
    
    function showResults() {
        resultsContent.classList.remove('d-none');
    }
    
    function hideResults() {
        resultsContent.classList.add('d-none');
    }
    
    // Initialize with sample data for demonstration
    function initDemo() {
        const demoPlayer1 = "John Smith";
        const demoPlayer2 = "Jane Doe";
        
        // Set demo values in the form
        document.getElementById('player1').value = demoPlayer1;
        document.getElementById('player2').value = demoPlayer2;
        
        // Trigger search with sample data
        setTimeout(() => {
            const event = new Event('submit');
            searchForm.dispatchEvent(event);
        }, 500);
    }
    
    // Uncomment the line below to enable demo mode
    // initDemo();
});
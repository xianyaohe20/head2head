# USATT Head-to-Head Search

A full-stack web application that allows users to search for head-to-head match records between two USATT players on Omnipong. The application provides a clear comparison of results and a detailed tournament history.

## Project Structure

```
head2head/
├── src/               # Frontend assets
│   ├── index.html     # Main UI
│   ├── css/
│   │   └── styles.css # Custom styling
│   └── js/
│       └── app.js     # Frontend logic
├── server.js          # Express server & API
├── package.json       # Dependencies and scripts
├── .env               # Environment variables (DB config)
└── README.md
```

## Features

- **Head-to-Head Comparison**: Search for two players to see their lifetime record against each other (ONLY ON OMNIPONG).
- **Score-Based Results**: View results in a clear Scoreboard format.
- **Tournament History**: Detailed list of every match played, including the event name, date, and game scores.
- **Responsive Design**: Built with Bootstrap 5 to work seamlessly across desktop and mobile devices.

## Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+), Bootstrap 5, Font Awesome.
- **Backend**: Node.js, Express.js.
- **Database**: PostgreSQL for storing player, match, and tournament data.
- **Environment**: Dotenv for secure configuration.

## Setup and Installation

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database

### Configuration

1. Create a `.env` file in the root directory with your database credentials:
   ```env
   DB_HOST=your_host
   DB_PORT=5432
   DB_NAME=your_db_name
   DB_USER=your_user
   DB_PASSWORD=your_password
   SERVER_PORT=3000
   ```

### Running the App

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```
3. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

- `GET /api/headtohead/:player1/:player2`: Retrieves all matches between two players.
- `GET /api/players`: Retrieves a list of all players in the database.
- `GET /api/player/:name`: Retrieves details for a specific player by name.

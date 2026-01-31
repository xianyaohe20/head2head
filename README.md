# USATT Head-to-Head Search

A web application that allows users to search for head-to-head match records between two USATT players using the JustGo API.

## Features

- Search for head-to-head records between two USATT players
- View match statistics (wins, losses, total matches)
- See tournament history with scores and dates
- Responsive design that works on desktop and mobile devices

## How to Use

1. Enter the names of two different USATT players
2. Click "Search Head-to-Head"
3. View the match statistics and tournament history

## Technical Details

This application uses:
- HTML5, CSS3, and JavaScript for the frontend
- Bootstrap 5 for responsive styling
- Font Awesome for icons
- JustGo API for player data (via the api.justgo.com endpoint)

## Development

To run this application locally:

1. Clone the repository
2. Open `index.html` in a web browser

Note: The current implementation uses sample data for demonstration purposes. In a production environment, you would need to configure API access to the JustGo service.

## API Integration

The application is designed to integrate with the JustGo API endpoint at `https://api.justgo.com/index.html`. The actual API implementation would need to be configured with appropriate authentication and endpoint calls.

## Files

- `index.html` - Main application interface
- `styles.css` - Custom styling
- `app.js` - JavaScript functionality and API integration

## License

MIT
# USATT Head-to-Head Search

A web application that allows users to search for head-to-head match records between two USATT players using the JustGo API.

## Project Structure

```
head2head/
├── src/
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── app.js
├── package.json
└── README.md
```

## Features

- Search for head-to-head records between two USATT players
- View match statistics (wins, losses, total matches)
- See tournament history with scores and dates
- Responsive design that works on desktop and mobile devices

## How to Use

1. Open your browser and navigate to `http://localhost:8000`
2. Enter the names of two different USATT players
3. Click "Search Head-to-Head"
4. View the match statistics and tournament history

## Development

To run this application locally:

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

## Technical Details

This application uses:
- HTML5, CSS3, and JavaScript for the frontend
- Bootstrap 5 for responsive styling
- Font Awesome for icons
- JustGo API for player data (via the api.justgo.com endpoint)

## API Integration

The application is designed to integrate with the JustGo API endpoint at `https://api.justgo.com/index.html`. The actual API implementation would need to be configured with appropriate authentication and endpoint calls.

## Files

- `src/index.html` - Main application interface
- `src/css/styles.css` - Custom styling
- `src/js/app.js` - JavaScript functionality and API integration

## License

MIT
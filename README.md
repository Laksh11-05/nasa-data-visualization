# NASA Data Visualization

A full-stack project visualizing NASA's Open APIs with a React frontend and an Express backend.

## Features

- Astronomy Picture of the Day (APOD)
- Mars Rover photo gallery
- EPIC Earth images
- Near Earth Object (NEO) charts
- NASA Image & Video Library search
- Theme switcher (dark/light)
- Random APOD button
- Interactive charts and galleries

## Project Structure

```
nasa-data-visualization/
├── backend/                  # Express.js REST API
│   ├── src/
│   │   ├── app.js            # Main Express app
│   │   ├── controllers/      # Route controllers
│   │   ├── routes/           # API routes
│   │   └── services/         # NASA API service logic
│   ├── .env.example          # Example environment variables
│   ├── package.json
│   └── README.md
├── frontend/                 # React app
│   ├── public/               # Static files
│   ├── src/
│   │   ├── components/       # UI components
│   │   ├── services/         # API calls
│   │   └── App.js            # Main React component
│   ├── package.json
│   └── README.md
├── .gitignore
├── LICENSE
└── README.md                 # Project overview (this file)
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/nasa-data-visualization.git
   cd nasa-data-visualization
   ```

2. **Setup backend and frontend:**  
   See [backend/README.md](./backend/README.md) and [frontend/README.md](./frontend/README.md) for detailed instructions.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

MIT License. See the LICENSE file for details.
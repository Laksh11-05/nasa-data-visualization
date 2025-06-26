# NASA Data Visualization

A modern, creative React + Express app visualizing NASA data.

## Features
- Astronomy Picture of the Day (APOD) with fullscreen view
- Mars Rover photo gallery
- EPIC Earth images
- Near Earth Object (NEO) charts
- NASA Image & Video Library search
- Theme switcher (dark/light)
- Random APOD button
- Interactive charts and galleries

## Setup

### Backend
```bash
cd backend
npm install
cp .env.example .env # Add your NASA_API_KEY
npm start
```

### Frontend
```bash
cd frontend
npm install
npm start
```
The app runs on [http://localhost:3000](http://localhost:3000).

> **Note:** The frontend expects the backend API to be running at `http://localhost:5001`.

## API Endpoints

- `/api/apod`: Get the Astronomy Picture of the Day.
- `/api/mars-photos`: Get photos from Mars rovers.
- `/api/neo`: Get Near Earth Objects data.

## Deployment

For deployment, consider using platforms like Heroku, Vercel, or Netlify. Ensure to set up environment variables for API keys and other sensitive information.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.

# NASA Data Visualization – Frontend

React frontend for NASA Data Visualization.

## Setup

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start the frontend app:
   ```bash
   npm start
   ```
   The app runs on [http://localhost:3000](http://localhost:3000).

> **Note:** The frontend expects the backend API to be running at `http://localhost:5001`.

## Scripts

- `npm start` – Start development server
- `npm run build` – Build for production

## Folder Structure

- `src/` – React source code
  - `components/` – UI components
  - `services/` – API calls

## Environment

No API keys are needed in the frontend. All API requests are proxied through the backend.

## Learn More

See the [root README](../README.md) for project overview and contribution guidelines.
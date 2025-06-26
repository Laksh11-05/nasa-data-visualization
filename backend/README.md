# NASA Data Visualization – Backend

Express.js REST API for NASA Data Visualization.

## Setup

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Copy environment variables and add your NASA API key:
   ```bash
   cp .env.example .env
   # Edit .env to add your NASA_API_KEY
   ```

3. Start the backend server:
   ```bash
   npm start
   ```
   The server runs on `http://localhost:5001` by default.

## API Endpoints

- **GET `/api/apod`** – Astronomy Picture of the Day
- **GET `/api/mars-photos`** – Mars Rover photos
- **GET `/api/neo`** – Near Earth Object data

## Folder Structure

- `src/app.js` – Main Express app
- `src/controllers/` – Route controllers
- `src/routes/` – API routes
- `src/services/` – NASA API service logic

## Contributing

Open an issue or pull request for improvements or bug fixes.

## License

MIT License.
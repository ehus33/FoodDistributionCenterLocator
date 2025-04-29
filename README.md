# Free to Go Web + Real Locations Backend

## Backend Setup

1. Replace `backend/.env` with your Google API key:
   ```
   GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY_HERE
   CITY=Seattle
   ```
2. Install and start:
   ```bash
   cd backend
   npm install
   npm start
   ```

The backend will run on http://localhost:5000 and serve `/api/locations`.

## Web Frontend Setup

```bash
cd web
npm install
npm run dev
```

Open http://localhost:5173 to see the map with real Walmarts, Costcos, and Sam's Clubs in Seattle.

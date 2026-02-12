# Movie Explorer

A web application that allows users to search for movies, view detailed information, and manage a personalized favorites list with ratings and notes.

## Live Demo

[Deployed App URL - To be added after deployment]

## Features

- **Search Movies**: Search by title and browse results with poster, title, year, and description
- **Movie Details**: View detailed information including overview, release date, runtime, and ratings
- **Favorites Management**: Add/remove movies to a personal favorites list
- **Personal Ratings**: Rate your favorite movies from 1-5 stars
- **Notes**: Add personal notes to your favorite movies
- **Persistent Storage**: Favorites are saved using LocalStorage and persist across sessions

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - State management

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TMDB API** - Movie data source

## Project Structure

```
movie_Explorer/
├── backend/
│   ├── server.js           # Express server with API proxy endpoints
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
├── frontend/
│   ├── app/
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Main page with search and favorites
│   │   └── globals.css     # Global styles
│   ├── components/
│   │   ├── MovieCard.tsx   # Movie card component
│   │   └── MovieDetails.tsx # Modal with movie details
│   ├── types/
│   │   └── movie.ts        # TypeScript interfaces
│   ├── utils/
│   │   ├── api.ts          # API client functions
│   │   └── localStorage.ts # LocalStorage utilities
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.local.example
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- TMDB API key (get one at https://www.themoviedb.org/settings/api)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Add your TMDB API key to `.env`:
```
TMDB_API_KEY=your_api_key_here
PORT=5000
```

5. Start the server:
```bash
npm run dev
```

The backend will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```bash
cp .env.local.example .env.local
```

4. Ensure the API URL is set correctly in `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

5. Start the development server:
```bash
npm run dev
```

The frontend will run on http://localhost:3000

## Usage

1. Enter a movie title in the search bar and click "Search"
2. Browse through the search results
3. Click on any movie card to view detailed information
4. In the details modal, click "Add to Favorites" to save the movie
5. Rate the movie (1-5 stars) and add personal notes
6. Switch to the "Favorites" tab to view your saved movies
7. Click on a favorite to edit your rating or notes, or remove it from favorites

## Technical Decisions & Tradeoffs

### API Proxy Pattern
- **Decision**: Used Express backend as a proxy for TMDB API
- **Reasoning**: Keeps API key secure server-side, prevents exposure in browser
- **Tradeoff**: Additional server required vs simpler client-only approach

### State Management
- **Decision**: React hooks (useState, useEffect) without external state library
- **Reasoning**: App complexity doesn't justify Redux/Zustand overhead
- **Tradeoff**: May need refactoring if app grows significantly

### Persistence Strategy
- **Decision**: LocalStorage for baseline implementation
- **Reasoning**: Quick implementation, no database setup, works offline
- **Tradeoff**: Data is device-specific, not synced across devices

### UI Framework
- **Decision**: Tailwind CSS
- **Reasoning**: Rapid development, consistent styling, small bundle size
- **Tradeoff**: Utility class verbosity vs custom CSS

### Separate Backend/Frontend
- **Decision**: Split into separate backend and frontend folders
- **Reasoning**: Clear separation of concerns, easier to understand and deploy independently
- **Tradeoff**: Could have used Next.js API routes for simpler monorepo structure

## Known Limitations

1. **No Authentication**: Favorites are stored locally, not per-user account
2. **No Cross-Device Sync**: Favorites don't sync across devices
3. **Limited Movie Data**: Only shows data available from TMDB API
4. **No Offline Search**: Requires internet connection to search
5. **Basic UI**: Functional but minimal design (intentional for 3-hour scope)
6. **No Pagination**: Search results show only first page
7. **No Advanced Filters**: Can't filter by genre, year, rating, etc.

## Future Improvements

With more time, I would add:

1. **User Authentication**: Allow multiple users with accounts
2. **Database Integration**: PostgreSQL or MongoDB for server-side persistence
3. **Advanced Search**: Filters for genre, year, rating, etc.
4. **Pagination**: Browse through all search results
5. **Watchlist Feature**: Separate list for movies to watch
6. **Social Features**: Share favorites, see friends' recommendations
7. **Responsive Improvements**: Better mobile experience
8. **Loading Skeletons**: Better loading states
9. **Image Optimization**: Next.js Image component
10. **Testing**: Unit and integration tests

## Deployment

### Backend Deployment (Render/Railway/Heroku)
1. Push code to GitHub
2. Connect repository to hosting service
3. Set environment variables (TMDB_API_KEY)
4. Deploy

### Frontend Deployment (Vercel/Netlify)
1. Push code to GitHub
2. Connect repository to hosting service
3. Set build directory to `frontend`
4. Set environment variables (NEXT_PUBLIC_API_URL with production backend URL)
5. Deploy

## License

MIT

## Author

Built as a technical interview project

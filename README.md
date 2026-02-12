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

- **Next.js 14** - React framework with App Router and API Routes
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **TMDB API** - Movie data source
- **LocalStorage** - Client-side data persistence

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- TMDB API key (get one at https://www.themoviedb.org/settings/api)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd movie_Explorer
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```bash
cp .env.local.example .env.local
```

4. Add your TMDB API key to `.env.local`:
```
TMDB_API_KEY=your_api_key_here
```

5. Start the development server:
```bash
npm run dev
```

6. Open http://localhost:3000 in your browser

## Usage

1. Enter a movie title in the search bar and click "Search"
2. Browse through the search results
3. Click on any movie card to view detailed information
4. In the details modal, click "Add to Favorites" to save the movie
5. Rate the movie (1-5 stars) and add personal notes
6. Switch to the "Favorites" tab to view your saved movies
7. Click on a favorite to edit your rating or notes, or remove it from favorites

## Technical Decisions & Tradeoffs

### Next.js API Routes
- **Decision**: Used Next.js API routes instead of separate Express backend
- **Reasoning**:
  - Keeps everything in one project (simpler deployment)
  - API key secured server-side (not exposed in browser)
  - Leverages Next.js built-in features
  - Single codebase, one deployment
- **Tradeoff**: Tightly coupled to Next.js vs microservices architecture

### State Management
- **Decision**: React hooks (useState, useEffect) without external state library
- **Reasoning**: App complexity doesn't justify Redux/Zustand overhead
- **Tradeoff**: May need refactoring if app grows significantly

### Persistence Strategy
- **Decision**: LocalStorage for baseline implementation
- **Reasoning**:
  - Quick implementation, no database setup
  - Works offline
  - Meets baseline requirements
- **Tradeoff**: Data is device-specific, not synced across devices

### UI Framework
- **Decision**: Tailwind CSS
- **Reasoning**: Rapid development, consistent styling, small bundle size
- **Tradeoff**: Utility class verbosity vs custom CSS

### TypeScript
- **Decision**: Full TypeScript implementation
- **Reasoning**: Type safety, better developer experience, catches errors early
- **Tradeoff**: Slightly more verbose than JavaScript

## Known Limitations

1. **No Authentication**: Favorites are stored locally, not per-user account
2. **No Cross-Device Sync**: Favorites don't sync across devices
3. **No Offline Search**: Requires internet connection to search (TMDB API)
4. **Basic UI**: Functional but minimal design (intentional for 3-hour scope)
5. **No Pagination**: Search results show only first page
6. **No Advanced Filters**: Can't filter by genre, year, rating, etc.
7. **No Image Fallback**: Placeholder text shown when no poster available

## Future Improvements

With more time, I would add:

1. **User Authentication**: NextAuth.js for user accounts
2. **Database Integration**: PostgreSQL or MongoDB for server-side persistence
3. **Advanced Search**: Filters for genre, year, rating, etc.
4. **Pagination**: Browse through all search results
5. **Watchlist Feature**: Separate list for movies to watch
6. **Social Features**: Share favorites, see friends' recommendations
7. **Responsive Improvements**: Better mobile experience
8. **Loading Skeletons**: Better loading states with skeleton screens
9. **Image Optimization**: Use Next.js Image component
10. **Testing**: Unit tests (Jest) and E2E tests (Playwright)
11. **Accessibility**: ARIA labels, keyboard navigation
12. **Error Boundaries**: Better error handling with React error boundaries

## Deployment

### Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variable: `TMDB_API_KEY`
5. Deploy

## API Routes

### Search Movies
```
GET /api/movies/search?query={searchTerm}
```

### Get Movie Details
```
GET /api/movies/{movieId}
```

Both routes proxy requests to TMDB API with the server-side API key.
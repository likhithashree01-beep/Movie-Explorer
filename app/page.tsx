'use client';

import { useState, useEffect } from 'react';
import { Movie, FavoriteMovie } from '@/types/movie';
import { searchMovies, getMovieDetails } from '@/utils/api';
import { getFavorites } from '@/utils/localStorage';
import MovieCard from '@/components/MovieCard';
import MovieDetails from '@/components/MovieDetails';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'search' | 'favorites'>('search');

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    setFavorites(getFavorites());
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setError('Please enter a search term');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await searchMovies(searchQuery);
      setMovies(data.results);

      if (data.results.length === 0) {
        setError('No movies found. Try a different search term.');
      }
    } catch (err) {
      setError('Failed to search movies. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = async (movieId: number) => {
    try {
      const details = await getMovieDetails(movieId);
      setSelectedMovie(details);
    } catch (err) {
      setError('Failed to load movie details');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen">
      <header className="bg-indigo-600 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Movie Explorer</h1>
          <p className="text-indigo-100 mt-1">Search, discover, and save your favorite movies</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b">
          <button
            onClick={() => setActiveTab('search')}
            className={`px-4 py-2 font-semibold ${
              activeTab === 'search'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Search Movies
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-4 py-2 font-semibold ${
              activeTab === 'favorites'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Favorites ({favorites.length})
          </button>
        </div>

        {/* Search Tab */}
        {activeTab === 'search' && (
          <>
            <form onSubmit={handleSearch} className="mb-8">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for movies..."
                  className="input flex-1"
                />
                <button type="submit" disabled={loading} className="btn btn-primary">
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </div>
            </form>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading...</p>
              </div>
            ) : movies.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onClick={() => handleMovieClick(movie.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-600">
                <p>Search for movies to get started</p>
              </div>
            )}
          </>
        )}

        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <>
            {favorites.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {favorites.map((movie) => (
                  <div key={movie.id} className="flex flex-col">
                    <MovieCard movie={movie} onClick={() => setSelectedMovie(movie)} />
                    <div className="mt-2 text-center h-8">
                      {movie.personalRating && movie.personalRating > 0 && (
                        <span className="text-yellow-400">
                          {'★'.repeat(movie.personalRating)}
                          {'☆'.repeat(5 - movie.personalRating)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-600">
                <p>No favorites yet. Search for movies and add them to your favorites!</p>
              </div>
            )}
          </>
        )}
      </main>

      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onFavoritesChange={loadFavorites}
        />
      )}
    </div>
  );
}

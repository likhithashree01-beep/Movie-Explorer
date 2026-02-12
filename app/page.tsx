'use client';

import { useState, useEffect } from 'react';
import { Movie, FavoriteMovie } from '@/types/movie';
import { searchMovies, getMovieDetails, getPopularMovies } from '@/utils/api';
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [mode, setMode] = useState<'popular' | 'search'>('popular');

  useEffect(() => {
    loadFavorites();
    loadPopularMovies(1);
  }, []);

  const loadFavorites = () => {
    setFavorites(getFavorites());
  };

  const loadPopularMovies = async (page: number) => {
    setLoading(true);
    setError('');
    try {
      const data = await getPopularMovies(page);
      setMovies(data.results);
      setCurrentPage(data.page);
      setTotalPages(Math.min(data.total_pages, 500)); // TMDB limits to 500 pages
      setMode('popular');
    } catch (err) {
      setError('Failed to load movies. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      loadPopularMovies(1);
      return;
    }

    setLoading(true);
    setError('');
    setCurrentPage(1);

    try {
      const data = await searchMovies(searchQuery, 1);
      setMovies(data.results);
      setCurrentPage(data.page);
      setTotalPages(Math.min(data.total_pages, 500));
      setMode('search');

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

  const handlePageChange = async (page: number) => {
    if (page < 1 || page > totalPages) return;

    setLoading(true);
    setError('');

    try {
      const data = mode === 'search'
        ? await searchMovies(searchQuery, page)
        : await getPopularMovies(page);

      setMovies(data.results);
      setCurrentPage(data.page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError('Failed to load movies. Please try again.');
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

  const renderPagination = () => {
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return (
      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {startPage > 1 && (
          <>
            <button onClick={() => handlePageChange(1)} className="btn btn-secondary">
              1
            </button>
            {startPage > 2 && <span className="px-2">...</span>}
          </>
        )}

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={loading}
            className={`btn ${
              page === currentPage ? 'btn-primary' : 'btn-secondary'
            } disabled:opacity-50`}
          >
            {page}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-2">...</span>}
            <button onClick={() => handlePageChange(totalPages)} className="btn btn-secondary">
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
          className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <header className="bg-slate-900 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Movie Explorer</h1>
          <p className="text-slate-300 mt-1">Search, discover, and save your favorite movies</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b">
          <button
            onClick={() => setActiveTab('search')}
            className={`px-4 py-2 font-semibold ${
              activeTab === 'search'
                ? 'text-slate-800 border-b-2 border-slate-800'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Browse Movies
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-4 py-2 font-semibold ${
              activeTab === 'favorites'
                ? 'text-slate-800 border-b-2 border-slate-800'
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
              <>
                <div className="mb-4 text-sm text-gray-600">
                  {mode === 'popular' ? 'Popular Movies' : `Search Results for "${searchQuery}"`} - Page {currentPage} of {totalPages}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {movies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onClick={() => handleMovieClick(movie.id)}
                    />
                  ))}
                </div>
                {renderPagination()}
              </>
            ) : (
              <div className="text-center py-12 text-gray-600">
                <p>No movies found</p>
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

import { Movie, SearchResponse } from '@/types/movie';

export const searchMovies = async (query: string): Promise<SearchResponse> => {
  const response = await fetch(`/api/movies/search?query=${encodeURIComponent(query)}`);

  if (!response.ok) {
    throw new Error('Failed to search movies');
  }

  return response.json();
};

export const getMovieDetails = async (id: number): Promise<Movie> => {
  const response = await fetch(`/api/movies/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }

  return response.json();
};

export const getImageUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) return '/placeholder.png';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

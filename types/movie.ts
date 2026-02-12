export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  runtime?: number;
}

export interface FavoriteMovie extends Movie {
  personalRating?: number;
  personalNote?: string;
}

export interface SearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

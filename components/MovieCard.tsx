import { Movie } from '@/types/movie';
import { getImageUrl } from '@/utils/api';

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  return (
    <div className="card cursor-pointer hover:shadow-lg transition-shadow flex flex-col h-full" onClick={onClick}>
      <div className="aspect-[2/3] relative bg-gray-200 flex-shrink-0">
        {movie.poster_path ? (
          <img
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg mb-1 line-clamp-2">{movie.title}</h3>
        <p className="text-sm text-gray-600 mb-2">
          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
        </p>
        <p className="text-sm text-gray-700 line-clamp-3">{movie.overview}</p>
      </div>
    </div>
  );
}

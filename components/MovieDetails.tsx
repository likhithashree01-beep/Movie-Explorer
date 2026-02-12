'use client';

import { useState, useEffect } from 'react';
import { Movie, FavoriteMovie } from '@/types/movie';
import { getImageUrl } from '@/utils/api';
import { isFavorite, addFavorite, removeFavorite, updateFavorite, getFavorites } from '@/utils/localStorage';

interface MovieDetailsProps {
  movie: Movie;
  onClose: () => void;
  onFavoritesChange: () => void;
}

export default function MovieDetails({ movie, onClose, onFavoritesChange }: MovieDetailsProps) {
  const [isInFavorites, setIsInFavorites] = useState(false);
  const [personalRating, setPersonalRating] = useState<number>(0);
  const [personalNote, setPersonalNote] = useState('');

  useEffect(() => {
    const favorite = isFavorite(movie.id);
    setIsInFavorites(favorite);

    if (favorite) {
      const favorites = getFavorites();
      const fav = favorites.find(f => f.id === movie.id);
      if (fav) {
        setPersonalRating(fav.personalRating || 0);
        setPersonalNote(fav.personalNote || '');
      }
    }
  }, [movie.id]);

  const handleToggleFavorite = () => {
    if (isInFavorites) {
      removeFavorite(movie.id);
      setIsInFavorites(false);
      setPersonalRating(0);
      setPersonalNote('');
    } else {
      addFavorite({
        ...movie,
        personalRating: personalRating > 0 ? personalRating : undefined,
        personalNote
      });
      setIsInFavorites(true);
    }
    onFavoritesChange();
  };

  const handleRatingChange = (rating: number) => {
    setPersonalRating(rating);
    if (isInFavorites) {
      updateFavorite(movie.id, { personalRating: rating });
      onFavoritesChange();
    }
  };

  const handleNoteChange = (note: string) => {
    setPersonalNote(note);
    if (isInFavorites) {
      updateFavorite(movie.id, { personalNote: note });
      onFavoritesChange();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{movie.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            &times;
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              {movie.poster_path ? (
                <img
                  src={getImageUrl(movie.poster_path)}
                  alt={movie.title}
                  className="w-full rounded-lg"
                />
              ) : (
                <div className="w-full aspect-[2/3] bg-gray-200 rounded-lg flex items-center justify-center">
                  No Image
                </div>
              )}
            </div>

            <div className="md:w-2/3 space-y-4">
              <div>
                <p className="text-gray-600">
                  <strong>Release Date:</strong> {movie.release_date || 'N/A'}
                </p>
                {movie.runtime && (
                  <p className="text-gray-600">
                    <strong>Runtime:</strong> {movie.runtime} minutes
                  </p>
                )}
                {movie.vote_average > 0 && (
                  <p className="text-gray-600">
                    <strong>Rating:</strong> {movie.vote_average.toFixed(1)}/10
                  </p>
                )}
              </div>

              <div>
                <h3 className="font-semibold mb-2">Overview</h3>
                <p className="text-gray-700">{movie.overview || 'No overview available.'}</p>
              </div>

              <div className="border-t pt-4">
                <button
                  onClick={handleToggleFavorite}
                  className={`btn w-full ${isInFavorites ? 'btn-danger' : 'btn-primary'}`}
                >
                  {isInFavorites ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
              </div>

              {isInFavorites && (
                <div className="border-t pt-4 space-y-4">
                  <div>
                    <label className="block font-semibold mb-2">Your Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleRatingChange(star)}
                          className={`text-3xl ${star <= personalRating ? 'text-yellow-400' : 'text-gray-300'}`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">Your Note</label>
                    <textarea
                      value={personalNote}
                      onChange={(e) => handleNoteChange(e.target.value)}
                      className="input w-full h-24 resize-none"
                      placeholder="Add your personal note about this movie..."
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

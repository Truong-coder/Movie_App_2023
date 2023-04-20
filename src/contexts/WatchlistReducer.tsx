import {Movie} from '../types/MoviesDB';
import {WatchlistState} from './WatchlistContext';

export type WatchlistReducerAction =
  | {type: 'toggle' | 'add'; payload: {movie: Movie}}
  | {type: 'remove'; payload: {movieId: number}};

const addWatchlists = (state: Map<number, Movie>, movie: Movie) => {
  state.set(movie.id, movie);
  return {movies: state};
};

const removeFromWatchlist = (state: Map<number, Movie>, movieId: number) => {
  state.delete(movieId);
  return {movies: state};
};

export const watchlistReducer = (
  {movies}: WatchlistState,
  action: WatchlistReducerAction,
): WatchlistState => {
  switch (action.type) {
    case 'add':
      return addWatchlists(movies, action.payload.movie);
    case 'remove':
      return removeFromWatchlist(movies, action.payload.movieId); // corrected parameter name
    case 'toggle':
      if (movies.has(action.payload.movie.id)) {
        return removeFromWatchlist(movies, action.payload.movie.id);
      } else {
        return addWatchlists(movies, action.payload.movie);
      }
    default:
      return {movies};
  }
};

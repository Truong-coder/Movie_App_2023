import React, {createContext, useReducer} from 'react';
import {Movie} from '../types/MoviesDB';
import {watchlistReducer} from './WatchlistReducer';

export interface WatchlistStateProps {
  watchlist: WatchlistState;
  isAddWatchlist: (movieId: number) => boolean;
  toggleAddWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
}

export type WatchlistState = {movies: Map<number, Movie>};

export const WatchlistContext = createContext({} as WatchlistStateProps);

export const WatchlistProvider = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) => {
  const [watchlistState, dispatch] = useReducer(watchlistReducer, {
    movies: new Map(),
  });
  return (
    <WatchlistContext.Provider
      value={{
        watchlist: watchlistState,
        isAddWatchlist: (movieId: number) => watchlistState.movies.has(movieId),
        toggleAddWatchlist: (movie: Movie) =>
          dispatch({type: 'toggle', payload: {movie}}),
        removeFromWatchlist: (movieId: number) =>
          dispatch({type: 'remove', payload: {movieId}}),
      }}>
      {children}
    </WatchlistContext.Provider>
  );
};

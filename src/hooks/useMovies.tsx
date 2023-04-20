import {useEffect, useState} from 'react';
import {
  getPlayingNowMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from '../services/moviedb';
import {Movie, MoviesDBRes} from '../types/MoviesDB';

export const useMovies = () => {
  const [latest, setLatest] = useState<Movie[]>([]);
  const [playingNow, setNowPlaying] = useState<Movie[]>([]);
  const [populars, setPopulars] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log('PlayingNow: ', playingNow);
  useEffect(() => {
    getPlayingNowMovies().then((movieRes: MoviesDBRes) => {
      console.log('PLayingNow:', movieRes.results);
      setNowPlaying(movieRes.results);
      setIsLoading(false);
    });
    getPopularMovies().then((movieRes: MoviesDBRes) => {
      console.log('PopularMovies:', movieRes.results);
      setPopulars(movieRes.results);
    });
    getTopRatedMovies().then((movieRes: MoviesDBRes) => {
      console.log('TopRatedMovies:', movieRes.results);
      setTopRated(movieRes.results);
    });
    getUpcomingMovies().then((movieRes: MoviesDBRes) => {
      console.log('UpcomingMovies:', movieRes.results);
      setUpcoming(movieRes.results);
    });
    
  }, []);

  return {
    playingNow,
    populars,
    topRated,
    upcoming,
    isLoading,
    latest,
  };
};

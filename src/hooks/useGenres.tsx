import {useState, useEffect} from 'react';
import {getMovieGenres, getTVGenres} from '../services/moviedb';

export const useGenres = () => {
  const [movieGenres, setMovieGenres] = useState<string[]>([]);
  console.log('Genres: ', movieGenres );
  const [tvGenres, setTVGenres] = useState<string[]>([]);
  useEffect(() => {
    getMovieGenres().then(({name}) => {
      const MovieGenres = name.map(genre => genre.name);
      setMovieGenres(MovieGenres);
    });
  }, []);
  return {movieGenres};
};

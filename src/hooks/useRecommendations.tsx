import {useState, useEffect} from 'react';
import {getRecommendations} from '../services/moviedb';
import { getSimilar } from '../services/moviedb';
import {Movie, MoviesDBRes} from '../types/MoviesDB';

export const useRecommendations = (movieId: number) => {
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [similar, setSimilar] = useState<Movie[]>([]);
  console.log('recommendations1: ', recommendations);
  console.log('similar1: ', similar);
  useEffect(() => {
    getRecommendations(movieId).then((movieRes: MoviesDBRes) => {
      console.log('Recommendations Movie: ', movieRes.results);
      setRecommendations(movieRes.results);
    });
    getSimilar(movieId).then((movieRes: MoviesDBRes) => {
      console.log('Similar Movie: ', movieRes.results);
      setSimilar(movieRes.results);
    });
  }, [movieId]);
  return {recommendations, similar};
};

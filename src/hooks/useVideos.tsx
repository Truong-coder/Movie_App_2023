import {useState, useEffect} from 'react';
import {getMovieTrailer} from '../services/moviedb';

export const useVideos = (movieId: number) => {
  const [movieVideos, setMovieVideos] = useState<string>();
  console.log('Movie Videos: ', movieVideos);

  useEffect(() => {
    getMovieTrailer(movieId)
      .then(({results}) => {
        // const movieTrailersKey = results.map(videos => videos.key);
        const movieTrailersKey = results.find(
          result => result.type === 'Trailer',
        ).key;
        setMovieVideos(movieTrailersKey); // Passing the whole array instead of just one element
      })
      .catch(error => {
        console.error('Error fetching trailers: ', error);
      });
  }, [movieId]);

  return {movieVideos};
};

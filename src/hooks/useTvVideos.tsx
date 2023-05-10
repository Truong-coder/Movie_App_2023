import {useState, useEffect} from 'react';
import {getTvVideos} from '../services/tvSeriesdb';

export const useTvVideos = (tvId: number) => {
  const [tvVideos, setTvVideos] = useState<string>();
  console.log('Tv Videos: ', tvVideos);

  useEffect(() => {
    getTvVideos(tvId)
      .then(({results}) => {
        // const tvTrailersKey = results.map(videos => videos.key);
        const tvTrailersKey = results.find(
          result => result.type === 'Trailer',
        ).key;
        setTvVideos(tvTrailersKey); // Passing the whole array instead of just one element
      })
      .catch(error => {
        console.error('Error fetching trailers: ', error);
      });
  }, [tvId]);

  return {tvVideos};
};

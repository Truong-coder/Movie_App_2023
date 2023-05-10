import {useEffect, useState} from 'react';
import {getTvDetails} from '../services/tvSeriesdb';
import {TVDetails} from '../types/tvSeriesDB';

export const useTvDetails = (tvId: number) => {
  const [tvDetails, setTvDetails] = useState<TVDetails>();

  useEffect(() => {
    getTvDetails(tvId).then(details => setTvDetails(details));
  }, []);
  return {tvDetails};
};

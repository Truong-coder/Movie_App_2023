import {useState, useEffect} from 'react';
import {getRecommendationsTv, getSimilarTvSeries} from '../services/tvSeriesdb';
import {TvSeries, TvSeriesDBRes} from '../types/tvSeriesDB';

export const useRecommendationsTv = (tvId: number) => {
  const [recommendationsTv, setRecommendationsTv] = useState<TvSeries[]>([]);
  const [similarTv, setSimilarTv] = useState<TvSeries[]>([]);
  console.log('recommendationsTv: ', recommendationsTv);
  console.log('similarTv: ', similarTv);
  useEffect(() => {
    getRecommendationsTv(tvId).then((tvRes: TvSeriesDBRes) => {
      console.log('Recommendations Tv show: ', tvRes.results);
      setRecommendationsTv(tvRes.results);
    });
    getSimilarTvSeries(tvId).then((tvRes: TvSeriesDBRes) => {
      console.log('Similar Tv show: ', tvRes.results);
      setSimilarTv(tvRes.results);
    });
  }, [tvId]);
  return {recommendationsTv, similarTv};
};

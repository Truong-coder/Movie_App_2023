import {useEffect, useState} from 'react';
import {
  getTvLatest,
  getTvPopular,
  getTvAiringToday,
  getTvOnAir,
  getTvTopRated,
} from '../services/tvSeriesdb';
import {TvSeries, TvSeriesDBRes} from '../types/tvSeriesDB';

export const useTvSeries = () => {
  const [latest, setLatest] = useState([]);
  const [popular, setPopular] = useState<TvSeries[]>([]);
  const [airingToday, setAiringToday] = useState<TvSeries[]>([]);
  const [onAir, setOnAir] = useState<TvSeries[]>([]);
  const [topRatedTv, setTopRatedTv] = useState<TvSeries[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log('PlayingNow: ', latest);
  useEffect(() => {
    // getTvLatest().then((tvRes: TvSeriesDBRes) => {
    //   console.log('PLayingNow:', tvRes.results);
    //   setLatest(tvRes.results);
    //   setIsLoading(false);
    // });
    getTvPopular().then((tvRes: TvSeriesDBRes) => {
      console.log('Treding:', tvRes.results);
      setPopular(tvRes.results);
      setIsLoading(false);
    });
    getTvAiringToday().then((tvRes: TvSeriesDBRes) => {
      console.log('Airing Today: ', tvRes.results);
      setAiringToday(tvRes.results);
      setIsLoading(false);
    });
    getTvOnAir().then((tvRes: TvSeriesDBRes) => {
      console.log('Tv show on the air: ', tvRes.results);
      setOnAir(tvRes.results);
      setIsLoading(false);
    });
    getTvTopRated().then((tvRes: TvSeriesDBRes) => {
      console.log('Tv show Top Rated: ', tvRes.results);
      setTopRatedTv(tvRes.results);
      setIsLoading(false);
    });
  }, []);

  return {
    latest,
    popular,
    airingToday,
    onAir,
    topRatedTv,
  };
};

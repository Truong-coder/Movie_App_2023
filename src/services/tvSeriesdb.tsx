import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
// import {Cast, CreditsRes} from '../types/Credits';
import {TvSeriesDBRes} from '../types/tvSeriesDB';

const tvSeriesDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: Config.API_KEY,
    language: 'en-US',
  },
});

export const getTvPopular = (): Promise<TvSeriesDBRes> => {
  return tvSeriesDB
    .get('/tv/popular')
    .then(res => res.data)
    .catch((err: AxiosError) => {
      console.error(
        `Error while fetching PlayingTvTrending: [${err.code}] cause ${err.cause}`,
      );
      throw err;
    });
};

export const getTvDetails = (tvId: number): Promise<TvSeriesDBRes> => {
  return tvSeriesDB
    .get(`/tv/${tvId}`)
    .then(res => res.data)
    .catch(err => {
      console.error(
        `Error while fetching Tv Series Details [${err.code}] cause ${err.cause}`,
      );
      throw err;
    });
};

export const getSimilarTvSeries = (tvId: number): Promise<TvSeriesDBRes> => {
  return tvSeriesDB
    .get(`/tv/${tvId}/similar`)
    .then(res => res.data)
    .catch(err => {
      console.error(
        `Error while fetching Similar Tv Series  [${err.code}] cause ${err.cause}`,
      );
      throw err;
    });
};

export const getRecommendationsTv = (tvId: number): Promise<TvSeriesDBRes> => {
  return tvSeriesDB
    .get(`/tv/${tvId}/recommendations`)
    .then(res => res.data)
    .catch(err => {
      console.error(
        `Error while fetching Similar Tv Series  [${err.code}] cause ${err.cause}`,
      );
      throw err;
    });
};

export const getTvVideos = (tvId: number): Promise<TvSeriesDBRes> => {
  return tvSeriesDB
    .get(`/tv/${tvId}/videos`)
    .then(res => res.data)
    .catch(err => {
      console.error(
        `Error while fetching Similar Tv Series  [${err.code}] cause ${err.cause}`,
      );
      throw err;
    });
};

export const getTvAiringToday = (): Promise<TvSeriesDBRes> => {
  return tvSeriesDB
    .get('/tv/airing_today')
    .then(res => res.data)
    .catch((err: AxiosError) => {
      console.error(
        `Error while fetching Playing Tv Airing Today: [${err.code}] cause ${err.cause}`,
      );
      throw err;
    });
};

export const getTvOnAir = (): Promise<TvSeriesDBRes> => {
  return tvSeriesDB
    .get('/tv/on_the_air')
    .then(res => res.data)
    .catch((err: AxiosError) => {
      console.error(
        `Error while fetching Playing Tv On the air: [${err.code}] cause ${err.cause}`,
      );
      throw err;
    });
};

export const getTvTopRated = (): Promise<TvSeriesDBRes> => {
  return tvSeriesDB
    .get('/tv/top_rated')
    .then(res => res.data)
    .catch((err: AxiosError) => {
      console.error(
        `Error while fetching Playing Tv show Top Rated: [${err.code}] cause ${err.cause}`,
      );
      throw err;
    });
};

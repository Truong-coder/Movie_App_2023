import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {Cast, CreditsRes} from '../types/Credits';
import {Genre, Movie, MovieDetails, MoviesDBRes} from '../types/MoviesDB';

const moviesDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: Config.API_KEY,
    language: 'en-US',
  },
});

export const getPlayingNowMovies = (): Promise<MoviesDBRes> => {
  return moviesDB
    .get('/movie/now_playing')
    .then(res => res.data)
    .catch((err: AxiosError) => {
      console.error(
        `Error while fetching PlayingNowMovies: [${err.code}] cause ${err.cause}`,
      );
      throw err;
    });
};

export const getPopularMovies = (): Promise<MoviesDBRes> => {
  return moviesDB
    .get('/movie/popular')
    .then(res => res.data)
    .catch(err => {
      console.error(
        `Error while fetching PopularMovies [${err.code}] cause ${err.cause}`,
      );
      throw err;
    });
};

export const getTopRatedMovies = (): Promise<MoviesDBRes> => {
  return moviesDB
    .get('/movie/top_rated')
    .then(res => res.data)
    .catch(err => {
      console.error(
        `Error while fetching TopRatedMovies [${err.code}] cause ${err.cause}`,
      );
      throw err;
    });
};

export const getUpcomingMovies = (): Promise<MoviesDBRes> => {
  return moviesDB
    .get('/movie/upcoming')
    .then(res => res.data)
    .catch(err => {
      console.error(
        `Error while fetching UpcomingMovies [${err.code}] cause ${err.cause}`,
      );
      throw err;
    });
};

export const getRecommendations = (movieId: number): Promise<MoviesDBRes> => {
  return moviesDB
    .get(`/movie/${movieId}/recommendations`)
    .then(res => res.data)
    .catch(err => {
      console.error(
        `Error while fetching Recommendations for Movies [${err.code}] cause ${err.cause}`,
      );
      throw err;
    });
};

export const getSimilar = (movieId: number): Promise<MoviesDBRes> => {
  return moviesDB
    .get(`/movie/${movieId}/similar`)
    .then(res => res.data)
    .catch(err => {
      console.error(
        `Error while fetching Recommendations for Similar Movies [${err.code}] cause ${err.cause}`,
      );
      throw err;
    });
};

export const getCastForMovie = (movieId: number): Promise<CreditsRes> => {
  return moviesDB
    .get(`/movie/${movieId}/credits`)
    .then(res => res.data)
    .catch(err => {
      console.error(
        `Error while fetching CastForMovie [${err.code}] cause ${err.cause}`,
      );
      throw err;
    });
};

export const getMovieDetails = (movieId: number): Promise<MovieDetails> => {
  return moviesDB
    .get(`/movie/${movieId}`)
    .then(res => res.data)
    .catch(err => {
      console.error(
        `Error while fetching CastForMovie [${err.code}] cause ${err.cause}`,
      );
      throw err;
    });
};

export const getMovieGenres = (): Promise<Genre> => {
  return moviesDB
    .get('/genre/movie/list')
    .then(res => res.data)
    .catch(err => {
      console.error(
        `Error while fetching Movie Genres [${err.code}] cause ${err.cause}`,
      );
      throw err;
    });
};

export const getTVGenres = (): Promise<Genre> => {
  return moviesDB
    .get('/genre/tv/list')
    .then(res => res.data)
    .catch(err => {
      console.error(
        `Error while fetching TV Genres [${err.code}] cause ${err.cause}`,
      );
      throw err;
    });
};

export const getSearchMovie = (query: string): Promise<MoviesDBRes> => {
  return moviesDB
    .get('/search/movie', {
      params: {
        query: query,
      },
    })
    .then(res => res.data)
    .catch(err => {
      console.error(
        `Error while fetching Search for Movies [${err.code}] cause ${err.cause}`,
      );
      throw err;
    });
};

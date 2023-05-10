import {Credit, Movie} from '../types/MoviesDB';
import { TvSeries } from '../types/tvSeriesDB';

export const imageUri = 'https://image.tmdb.org/t/p/w500';

export function getImageUri(movie: Movie) {
  return `${imageUri}/${movie.poster_path}`;
}

export function getMovieCastImageUri(credit: Credit) {
  console.log('return profile_path: ', credit);
  return `${imageUri}${credit.profile_path}`;
}

// export function getTvCastImageUri(tv: TvSeries) {
//   return `${imageUri}/${tv.poster_path}`;
// }



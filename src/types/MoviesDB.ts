export interface MoviesDBRes {
  dates: Dates;
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Dates {
  maximum: string;
  minimum: string;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieDetails extends Movie {
  belongs_to_collection: BelongsToCollection;
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
}

export interface MovieTrailerDBRes {
  id: string;
  results: MovieTrailers[];
}

export interface MovieTrailers {
  videoKey: VideoKey[];
  id: string;
  iso_938_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  site: string;
  size: number;
  type: string;
}
export interface VideoKey extends MovieTrailers {
  id: string;
  iso_938_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  site: string;
  size: number;
  type: string;
}

export interface ProductionCompanyPoster extends MovieDetails{
  id: number;
  name: string;
  logo_path: string;
  origin_country: string;
  undefined: undefined
}

export interface MovieGenre extends MovieDetails {
  id: number;
  name: string;
}

export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: any;
  backdrop_path: any;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: any;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Search {
  query: string
}

export interface Credit {
  adult: boolean;
  cast_id: number;
  credit_id: string;
  gender: number;
  character: string;
  name: string;
  profile_path?: string | null | undefined;
}
export interface TvSeriesDBRes {
  dates: Dates;
  page: number;
  results: TvSeries[];
  total_pages: number;
  total_results: number;
}

export interface Dates {
  maximum: string;
  minimum: string;
}

export interface TvSeries {
  adult: boolean;
  backdrop_path?: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TVDetails extends TvSeries {
  episode_run_time: Array<number>;
  genres: Genre[];
  in_production: boolean;
  languages: Array<string>;
  name: string;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: Array<string>;
  production_companies: ProductionComp[];
  production_countries: ProductionCountry[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionComp {
  id: number;
  logo_path?: string | null;
  name: string;
}

export interface ProductionCountry {
  name: string;
}
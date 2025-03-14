declare namespace types.movie {
 interface MovieResult {
    dates: Dates;
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  }

interface Dates {
    maximum: Date;
    minimum: Date;
  }

 interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: OriginalLanguage;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: Date;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }

  export enum OriginalLanguage {
    En = "en",
    Hi = "hi",
    LV = "lv",
    Zh = "zh",
  }

  export type MovieCategoryType = 'now_playing' | 'upcoming' | 'top_rated' | 'popular';

  export enum MovieCategory {
    NowPlaying = "now_playing",
    Upcoming = "upcoming",
    TopRated = "top_rated",
    Popular = "popular",
  }

  export class Convert {
    public static toMovie(json: string): types.movie.MovieResult {
      return JSON.parse(json);
    }
  
    public static movieToJson(value: types.movie.MovieResult): string {
      return JSON.stringify(value);
    }
  }
}



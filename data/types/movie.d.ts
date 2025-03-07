declare namespace types.movie {
 interface Movie {
    dates?: Dates;
    page?: number;
    results?: Result[];
    total_pages?: number;
    total_results?: number;
  }

interface Dates {
    maximum?: Date;
    minimum?: Date;
  }

 interface Result {
    adult?: boolean;
    backdrop_path?: string;
    genre_ids?: number[];
    id?: number;
    original_language?: OriginalLanguage;
    original_title?: string;
    overview?: string;
    popularity?: number;
    poster_path?: string;
    release_date?: Date;
    title?: string;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;
  }

  export enum OriginalLanguage {
    En = "en",
    Hi = "hi",
    LV = "lv",
    Zh = "zh",
  }
  
  // Converts JSON strings to/from your types
  export class Convert {
    public static toMovie(json: string): types.movie.Movie {
      return JSON.parse(json);
    }
  
    public static movieToJson(value: types.movie.Movie): string {
      return JSON.stringify(value);
    }
  }
}



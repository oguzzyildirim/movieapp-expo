declare namespace types.movieCredits {
    export interface Result {
        id:   number;
        cast?: Cast[];
    }
    
    export interface Cast {
        adult?:                boolean;
        gender?:               number;
        id:                   number;
        known_for_department?: string;
        name?:                 string;
        original_name?:        string;
        popularity?:           number;
        profile_path?:         null | string;
        cast_id?:              number;
        character?:            string;
        credit_id?:            string;
        order?:                number;
        department?:           string;
        job?:                  string;
    }
}
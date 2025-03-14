import { create } from "zustand";
import { GetMoviesByCategory } from "../api/movie";

interface AuthStoreState {
  movies: types.movie.Movie[];
  loading: boolean;
  error?: string;
}

interface AuthStoreActions {
  getMoviesByCategory: (type: types.movie.MovieCategoryType) => Promise<types.movie.Movie[]>;
  reset: () => void;
}

const initialState: AuthStoreState = {
  movies: [],
  loading: false,
  error: undefined,
};

export const useMovieStore = create<AuthStoreState & AuthStoreActions>(
  (set, get) => ({
    ...initialState,
    getMoviesByCategory: async (type: types.movie.MovieCategoryType) => {
      try {
        set({ loading: true });
        const resp = await GetMoviesByCategory(type);
        set({ movies: resp.results, loading: false });
        return resp.results;
      } catch {
        set({ loading: false, error: "Error fetching movies" });
        throw new Error("Error fetching movies");
      }
    },
    reset: () => {
      set(initialState);
    },
  })
);

import { get } from "../requestHelpers";

export async function GetMoviesByCategory(categoryType: types.movie.MovieCategoryType): Promise<types.movie.MovieResult> {
    return await get<types.movie.MovieResult>(`/movie/${categoryType}`, {
      language: "en-US",
      page: 1,
      include: "profile",
    });
}
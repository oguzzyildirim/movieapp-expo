import { StyleSheet, ScrollView, View } from "react-native";
import MovieCastCard from "./MovieCastCard";
import { get } from "@/data/requestHelpers";
import { useState, useEffect } from "react";
import { FlashList } from "@shopify/flash-list";
import { screenWidth } from "@/constants/StaticValues";

interface CastTabProps {
  movieID: string;
}

export default function MovieCast(props: CastTabProps) {
  const [movieCreditsResponse, setMovieCreditsResponse] =
    useState<types.movieCredits.Result | null>(null);

  useEffect(() => {
    const fetchMovieCredits = async () => {
      try {
        const movieCreditData = await get<types.movieCredits.Result>(
          `/movie/${props.movieID}/credits`
        );

        if (movieCreditData !== null) {
          setMovieCreditsResponse(movieCreditData);
        } else {
          setMovieCreditsResponse(null);
        }
      } catch (err) {
        console.error("Failed to fetch credits data:", err);
        setMovieCreditsResponse(null);
      }
    };

    fetchMovieCredits();
  }, []);
  if (movieCreditsResponse && movieCreditsResponse.cast) {
    return (
      <FlashList
          data={movieCreditsResponse.cast}
          keyExtractor={keyExtractor}
          estimatedItemSize={120}
          numColumns={2}
          renderItem={({ item }) => (
            <MovieCastCard
              profilePath={item.profile_path ?? "undefined"}
              name={item.name ?? "No Name"}
            />
          )}
          contentContainerStyle={styles.flashListContentContainer}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
    );
  } else {
    return <View></View>;
  }
}

function keyExtractor(item: types.movieCredits.Cast) {
  return item?.id.toString();
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 14,
  },
  flashListContentContainer: {
    flexDirection: 'column',
    paddingBottom: screenWidth * 0.55,
    paddingHorizontal: -25,
    //backgroundColor: 'red'
  },
});

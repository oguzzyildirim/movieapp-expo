import { get } from "@/data/requestHelpers";
import { FlashList } from "@shopify/flash-list";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { blurhash } from "@/constants/StaticValues";
import { screenWidth } from "@/constants/StaticValues";
import { router } from "expo-router";
import { useMovieStore } from "@/data/stores/movies";
interface MovieCategoriesProps {
  categoryType: types.movie.MovieCategoryType
}

export default function MovieCategories(props: MovieCategoriesProps) {
  const movieStore = useMovieStore();
  useEffect(() => {
    movieStore.getMoviesByCategory(props.categoryType);
  }, [props.categoryType]);

  const handlePress = (movieID: number) => {
    router.push({
      pathname: "/(tabs)/(home)/movieDetail",
      params: { movieID: movieID },
    });
  };

  if (movieStore.loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (movieStore.movies.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No movies found</Text>
      </View>
    );
  }

  return (
    <FlashList
      data={movieStore.movies}
      keyExtractor={keyExtractor}
      estimatedItemSize={120}
      numColumns={3}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item.id)}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: `${process.env.EXPO_PUBLIC_IMAGE_BASE_URL}/${item.poster_path}`,
              }}
              style={styles.image}
              placeholder={{ blurhash }}
              contentFit="cover"
            />
          </View>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.flashListContentContainer}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  );
}

function keyExtractor(item: types.movie.Movie) {
  return item?.id.toString();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "white",
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "white",
    fontSize: 16,
  },
  flashListContentContainer: {
    paddingBottom: screenWidth * 0.55,
  },
  imageContainer: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 18,
    borderRadius: 16,
  },

  image: {
    width: 100,
    height: 145,
    borderRadius: 16,
  },
});

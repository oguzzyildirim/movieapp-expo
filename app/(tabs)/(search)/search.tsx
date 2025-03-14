import {
  StyleSheet,
  Image,
  Platform,
  View,
  SafeAreaView,
  Text,
  TextInput,
} from "react-native";
import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useCallback, useEffect, useState } from "react";
import { get } from "@/data/requestHelpers";
import { useLocalSearchParams } from "expo-router";
import SearchedMovieCard from "@/components/searchedMovieCard/SearchedMovieCard";
import { FlashList } from "@shopify/flash-list";



export default function SearchScreen() {
  const [searchResults, setSearchResults] = useState<types.movieDetail.EnhancedMovieResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const params = useLocalSearchParams();
  const renderItem = useCallback(({ item }: { item: types.movieDetail.EnhancedMovieResult }) => {
    return <SearchedMovieCard movieResult={item} />;
  }, []);

  useEffect(() => {
    if (params.query) {
      setSearchText(params.query as string);
    }
  }, [params]);

  useEffect(() => {
    if (searchText) {
      fetchSearchedMovies(searchText);
    } else {
      setSearchResults([]);
    }
  }, [searchText]);

  const fetchMovieDetails = async (movieId: number): Promise<any> => {
    try {
      const movieDetails = await get(`/movie/${movieId}`, {
        language: "en-US",
      });
      return movieDetails;
    } catch (err) {
      console.error(`Failed to fetch details for movie ${movieId}:`, err);
      return null;
    }
  };

  const fetchSearchedMovies = async (query: string) => {
    try {
      setLoading(true);
      const movieData = await get<types.movie.MovieResult>(`/search/movie`, {
        query: query,
        language: "en-US",
        page: 1,
        include_adult: false,
      });

      if (movieData?.results !== undefined) {
        console.log("Search successful for:", query);

        const enhancedResults = await Promise.all(
          movieData.results.map(async (movie) => {
            const details = await fetchMovieDetails(movie.id);
            if (details) {
              return {
                ...movie,
                genres: details.genres,
                runtime: details.runtime,
                release_date: details.release_date,
              };
            }
            return movie;
          })
        );

        setSearchResults(enhancedResults as types.movieDetail.EnhancedMovieResult[]);
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      console.error("Failed to fetch search results:", err);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search movies..."
            placeholderTextColor="#67686D"
            value={searchText}
            onChangeText={setSearchText}
            style={styles.searchInput}
            clearButtonMode="always"
          />
          <IconSymbol
            size={24}
            name="magnifyingglass"
            color={"#67686D"}
            style={styles.searchIcon}
          />
        </View>

        {loading ? (
          <Text style={styles.statusText}>Loading...</Text>
        ) : searchResults.length > 0 ? (
          <Text style={styles.statusText}>
            Found {searchResults.length} results
          </Text>
        ) : (
          <Text style={styles.statusText}>No results found</Text>
        )}

        <View style={{ flex: 1,}}>
          <FlashList
            data={searchResults}
            keyExtractor={keyExtractor}
            estimatedItemSize={120}
            renderItem={renderItem}
            contentContainerStyle={{padding: 10,}}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

function keyExtractor(item: types.movieDetail.EnhancedMovieResult) {
  return item?.id.toString();
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors["light"].primary,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 16,
    position: "relative",
  },
  searchInput: {
    backgroundColor: "#3A3F47",
    borderRadius: 16,
    paddingHorizontal: 40,
    paddingVertical: 12,
    color: "white",
    width: "100%",
  },
  searchIcon: {
    position: "absolute",
    left: 10,
  },
  statusText: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});

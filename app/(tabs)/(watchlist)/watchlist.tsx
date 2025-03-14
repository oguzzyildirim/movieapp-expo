import { Colors } from "@/constants/Colors";
import { StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";
import { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { get } from "@/data/requestHelpers";
import SearchedMovieCard from "@/components/searchedMovieCard/SearchedMovieCard";
import { FlashList } from "@shopify/flash-list";
import { useAsyncStorage } from "@/hooks/useAsyncStorage";


export default function WatchListScreen() {
  const [favoriteMovies, setFavoriteMovies] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [movieDetails, setMovieDetails] = useState<types.movieDetail.MovieDetailResponse[]>([]);
  const renderItem = useCallback(({ item }: { item: types.movieDetail.MovieDetailResponse }) => {
    return <SearchedMovieCard watchListResult={item} />;
  }, []);
  const { storedData, storeData } = useAsyncStorage<number[]>("favorite_movies", []);

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
    
  const fetchFavoriteMovies = useCallback(async () => {
    try {
      console.log("Fetching favorite movies...");
      const favoriteMovieIds = storedData;
      console.log("Favorite movie IDs:", favoriteMovieIds);
      
      if (favoriteMovieIds.length > 0) {
        setFavoriteMovies(favoriteMovieIds as number[]);
      } else {
        console.log("No favorite movies found");
        setFavoriteMovies([]);
      }
    } catch (error) {
      console.error("Error fetching favorite movies:", error);
      setFavoriteMovies([]);
    } finally {
      setLoading(false);
    }
  }, [storedData]);
  
  

  useEffect(() => {
    const fetchAllMovieDetails = async () => {
      try {
        if (favoriteMovies.length > 0) {
          const detailsPromises = favoriteMovies.map(id => fetchMovieDetails(id));
          const results = await Promise.all(detailsPromises);
          const validResults = results.filter(result => result !== null);
          setMovieDetails(validResults);
        } else {
          setMovieDetails([]);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setMovieDetails([]);
      }
    };

    fetchAllMovieDetails();
  }, [favoriteMovies]);
  
  useFocusEffect(
    useCallback(() => {
      console.log("WatchListScreen is now focused");
      fetchFavoriteMovies();
      
      return () => {
        console.log("WatchListScreen is now unfocused");
      };
    }, [fetchFavoriteMovies])
  );

  if (loading) {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.headerText}>Loading...</Text>
      </View>
    );
  }
  
  if (favoriteMovies.length === 0) {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.noMovieContainer}>
          <Image
            source={require("@/assets/images/watch_list.png")}
            style={styles.image}
            contentFit="cover"
          />
          <View style={styles.mainTextContainer}>
            <Text style={styles.headerText}>There is no movie yet!</Text>
            <Text style={styles.subTitleText}>
              Find your movie by Type title, categories, years, etc
            </Text>
          </View>
        </View>
      </View>
    );
  } else {
    return(
      <View style={styles.flashListContainer}>
          <FlashList
            data={movieDetails}
            keyExtractor={keyExtractor}
            estimatedItemSize={140}
            renderItem={renderItem}
            contentContainerStyle={styles.listContentContainer}
            showsHorizontalScrollIndicator={false}
          />
        </View>
    );
  }
}

function keyExtractor(item: types.movieDetail.MovieDetailResponse) {
  return item?.id.toString();
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors["light"].primary,
  },

  flashListContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors["light"].primary,
  },

  noMovieContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    marginBottom: '20%',
  },

  image: {
    width: 76,
    height: 76,
  },

  mainTextContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },

  headerText: {
    color: "white",
    fontFamily: "Montserrat-SemiBold",
    fontSize: 16,
  },

  subTitleText: {
    color: "#92929D",
    fontFamily: "Montserrat-Medium",
    fontSize: 12,
    width: 252,
    paddingHorizontal: 10,
    textAlign: "center",
  },
  
  movieItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    width: '100%',
    backgroundColor: 'green'
  },
  
  movieTitle: {
    color: "white",
    fontFamily: "Montserrat-SemiBold",
    fontSize: 16,
    marginBottom: 4,
    backgroundColor: 'red',
  },
  
  movieInfo: {
    color: "#92929D",
    fontFamily: "Montserrat-Medium",
    fontSize: 12,
  },
  
  listContainer: {
    width: '100%',
  },
  
  listContentContainer: {
    padding: 10,
    flexGrow: 1,
  }
});

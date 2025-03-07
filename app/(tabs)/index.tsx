import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  TouchableOpacity,
  useColorScheme,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, usePathname } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import UserCard from "@/components/UserCard";
import { GetAllUsers } from "@/data/api/user";
import { homePageHeaderTitle } from "@/constants/StaticValues";
import {
  FlatList,
  GestureHandlerRootView,
  NativeViewGestureHandler,
  TextInput,
} from "react-native-gesture-handler";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { get } from "@/data/requestHelpers";
import HorizontalMovieCard from "@/components/HorizontalMovieCard";
import { FlashList } from "@shopify/flash-list";

export default function HomeScreen() {
  const colorSheme = useColorScheme();
  const [movie, setMovie] = useState<types.movie.Movie | null>(null);
  const [movieResults, setMovieResults] = useState<types.movie.Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // const AnimatedCellContainer = Animated.createAnimatedComponent(View);

  // const MyCellRenderer = (props: any) => {
  //   return (
  //     <AnimatedCellContainer
  //       {...props}
  //       style={[props.style, { flexDirection: "row", padding: 10, backgroundColor: 'green', gap: 100 }]}
  //     />
  //   );
  // };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const movieData = await get<types.movie.Movie>(`/movie/now_playing`, {
          language: "en-US",
          page: 1,
          include: "profile",
        });

        if (movieData?.results !== undefined) {
          console.log("success");
          setMovie(movieData);
          setMovieResults(movieData.results);
        } else {
          setMovieResults([]);
        }
      } catch (err) {
        setError(err as Error);
        console.error("Failed to fetch movie data:", err);
        setMovieResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       // Using the generic get function:
  //       // - First parameter: the API endpoint
  //       // - Second parameter: query parameters object
  //       // - TypeScript generic User type to ensure type safety
  //       const movieData = await get<types.movie.Movie>(`/movie/now_playing`, {
  //         language: 'en-US',
  //         page: 1,
  //         include: 'profile'
  //       });
  //       if(movieData?.results !== undefined) {
  //         console.log("success")
  //         setMovieResults(movieData.results)
  //       }
  //     } catch (err) {
  //       setError(err as Error);
  //       console.error('Failed to fetch user:', err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <View style={styles.headerViewContainer}>
          <Text style={styles.headerText}>
            {movie?.dates?.maximum?.toString()}
          </Text>
          <View style={styles.searchBarContainer}>
            <TextInput
              placeholder="Search"
              placeholderTextColor="#67686D"
              clearButtonMode="always"
              style={styles.searchBar}
            ></TextInput>
            <IconSymbol
              size={28}
              name="magnifyingglass"
              color={"#67686D"}
              style={styles.searchBarIcon}
            />
          </View>
        </View>
        <FlatList
            data={movieResults}
            renderItem={({ item, index }) => <HorizontalMovieCard movie={item} index={index + 1}/>}
            contentContainerStyle={styles.flatListCotainer}
            showsVerticalScrollIndicator={true}
          />
        {/* <View style={styles.flashListContainer}>
          <FlatList
            data={movieResults}
            renderItem={({ item, index }) => <HorizontalMovieCard movie={item} index={index + 1}/>}
            contentContainerStyle={styles.flatListCotainer}
            showsVerticalScrollIndicator={true}
          />
          <FlashList
            data={movieResults}
            renderItem={({ item }) => <HorizontalMovieCard movie={item} />}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={160}
            //CellRendererComponent={MyCellRenderer}
          />
        </View> */}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    height: "100%",
    width: "100%",
    backgroundColor: Colors["light"].primary,
  },

  headerViewContainer: {
    position: "relative",
    top: "2%",
    marginHorizontal: "6%",
    height: "15%",
    width: "100%",
    paddingHorizontal: "8%",
  },

  headerText: {
    position: "absolute",
    color: "white",
    fontSize: 20,
    fontFamily: "Poppins",
    fontWeight: "semibold",
  },

  flatListCotainer: {
    flexDirection: 'row',
    width: '100%',
    height: 240,
    backgroundColor: 'green'
  },

  flashListContainer: {
    flexDirection: 'row',
    width: "100%",
    height: 240,
    marginTop: "8%",
    backgroundColor: 'green',
  },

  searchBarContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "flex-end",
    height: "44%",
    width: "100%",
    bottom: "6%",
  },

  searchBar: {
    paddingHorizontal: "6%",
    borderRadius: 16,
    height: "100%",
    width: "100%",
    backgroundColor: "#3A3F47",
  },

  searchBarIcon: {
    position: "absolute",
    height: "55%",
    width: "10%",
    top: "22%",
    right: "3%",
  },

  text: {
    color: "white",
    fontSize: 20,
    fontFamily: "Poppins",
    fontWeight: "semibold",
  },

  closeButton: {
    position: "absolute",
    top: "4%",
    right: "6%",
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    backgroundColor: "red",
    width: 52,
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
  },
});

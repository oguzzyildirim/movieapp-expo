import {
  StyleSheet,
  View,
  Text,
  useColorScheme,
  TextInput,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { homePageHeaderTitle } from "@/constants/StaticValues";
import { screenWidth } from "@/constants/StaticValues";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { get } from "@/data/requestHelpers";
import HorizontalMovieCard from "@/components/HorizontalMovieCard";
import { FlashList } from "@shopify/flash-list";

export default function HomeScreen() {
  const [movieResults, setMovieResults] = useState<types.movie.Result[]>([]);
  const [loading, setLoading] = useState(true);

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
          setMovieResults(movieData.results);
        } else {
          setMovieResults([]);
        }
      } catch (err) {
        console.error("Failed to fetch movie data:", err);
        setMovieResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (

      <SafeAreaView style={styles.safeAreaViewContainer}>
        <View style={styles.headerViewContainer}>
          <Text style={styles.headerText}>
            {homePageHeaderTitle}
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
          <View style={styles.container}>
              <FlashList
                data={movieResults}
                keyExtractor={keyExtractor}
                estimatedItemSize={210}
                renderItem={({ item, index }) => <HorizontalMovieCard movie={item} index={index + 1} />}
                horizontal
                contentContainerStyle={styles.flashListContentContainer}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                removeClippedSubviews={true}
                disableAutoLayout
              />
          </View>
      </SafeAreaView>

  );
}

function keyExtractor(item: types.movie.Result) {
  return item?.id.toString();
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

  flashListContainer: {
    flexDirection: 'row',
    width: "100%",
    height: '44%',
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

  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '8%',
    height: '100%',
  },

  flashListContentContainer: {
    paddingLeft: screenWidth * 0.08,
  }

});

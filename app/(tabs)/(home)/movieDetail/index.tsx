import { get } from "@/data/requestHelpers";
import { useLocalSearchParams, useNavigation, usePathname, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from 'expo-image';
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import MovieInfoItem from "@/components/MovieDetail/MovieInfoItem";
import MovieDetailTabs from "@/components/MovieDetail/MovieDetailTabs";
import { Divider } from "react-native-paper";
import { extractYear } from "@/Utils/Helpers";
import { blurhash } from "@/constants/StaticValues";

export default function MovieDetail() {
  const navigation = useNavigation();
  const pathname = usePathname();
  const segments = useSegments();
  const { movieID } = useLocalSearchParams();
  const [movieDetailResponse, setMovieDetailResponse] =
    useState<types.movieDetail.MovieDetailResponse | null>(null);

    // useEffect(() => {
    //   // Log the current path
    //   console.log('Current path:', pathname);
      
    //   // Log all segments in the path
    //   console.log('Path segments:', segments);
      
    //   // Log the full navigation state (includes the entire stack)
    //   if (navigation.getState) {
    //     const state = navigation.getState();
    //     console.log('Full navigation state:', JSON.stringify(state, null, 2));
        
    //     // Log just the routes in a more readable format
    //     if (state) {
    //       console.log('Route stack:', state.routes.map(route => ({
    //         name: route.name,
    //         key: route.key,
    //         params: route.params
    //       })));
    //     }
    //   }
    // }, [pathname, navigation]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieData = await get<types.movieDetail.MovieDetailResponse>(
          `/movie/${movieID}`,
          {
            language: "en-US",
            include: "profile",
          }
        );

        if (movieData !== null) {
          setMovieDetailResponse(movieData);
        } else {
          setMovieDetailResponse(null);
        }
      } catch (err) {
        console.error("Failed to fetch movie data:", err);
        setMovieDetailResponse(null);
      }
    };

    fetchMovies();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Image
          source={{
            uri: `${process.env.EXPO_PUBLIC_IMAGE_ORIGINAL_URL}/${movieDetailResponse?.backdrop_path}`,
          }}
          style={styles.image}
          placeholder={{ blurhash }}
          contentFit="cover"
        />

        <BlurView intensity={20} tint="dark" style={styles.rate}>
          <Ionicons name="star-outline" size={16} color="#FF8700" />
          <Text style={styles.rateText}>
            {movieDetailResponse?.vote_average?.toFixed(1)}
          </Text>
        </BlurView>

        <Image
          source={{
            uri: `${process.env.EXPO_PUBLIC_IMAGE_BASE_URL}/${movieDetailResponse?.poster_path}`,
          }}
          style={styles.posterImage}
          placeholder={{ blurhash }}
          contentFit="cover"
        />

        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{movieDetailResponse?.title}</Text>
        </View>

        <View style={styles.movieInfoContainer}>
          <MovieInfoItem
            iconName="calendar-outline"
            text={extractYear(movieDetailResponse?.release_date?.toString() || '-')}
          />
          <Divider style={styles.divider} />
          <MovieInfoItem
            iconName="time-outline"
            text={`${movieDetailResponse?.runtime?.toString() || '-'} minutes`}
          />
          <Divider style={styles.divider} />
          <MovieInfoItem
            iconName="ticket-outline"
            text={
              movieDetailResponse?.genres?.find((genre) => true)?.name || "-"
            }
          />
        </View>
      </View>
      <View style={styles.movieDetailTab}>
        <MovieDetailTabs
          movieID={movieDetailResponse?.id?.toString() || ""}
          isMovieDetailLoaded={movieDetailResponse !== null}
          description={movieDetailResponse?.overview || ""}
        ></MovieDetailTabs>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors["light"].primary,
  },

  headerContainer: {
    position: "relative",
    display: "flex",
    width: "100%",
    height: "28%",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },

  image: {
    flex: 1,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },

  posterImage: {
    position: "absolute",
    height: "57%",
    width: "24%",
    borderRadius: 16,
    bottom: "-28%",
    left: "8%",
  },

  titleContainer: {
    position: "absolute",
    justifyContent: "flex-start",
    width: "60%",
    height: "20%",
    left: "37%",
    bottom: "-25%",
  },

  titleText: {
    color: "white",
    fontFamily: "Montserrat-SemiBold",
    fontSize: 18,
    justifyContent: "flex-start",
  },
  rate: {
    position: "absolute",
    flexDirection: "row",
    backgroundColor: "rgba(37, 40, 54, 0.32)",
    gap: 5,
    padding: "1.7%",
    borderRadius: 8,
    bottom: "3%",
    right: "2%",
    overflow: "hidden",
  },
  rateText: {
    color: "#FF8700",
    fontFamily: "Montserrat-Semibold",
    fontSize: 12,
  },

  movieInfoContainer: {
    position: "absolute",
    flexDirection: "row",
    alignSelf: "center",
    bottom: "-45%",
    gap: 12,
  },
  movieInfoText: {
    color: "#92929D",
    fontFamily: "Montserrat-Semibold",
    fontSize: 12,
  },

  divider: {
    width: 1,
    height: "100%",
    backgroundColor: "#92929D",
  },

  movieDetailTab: {
    flex: 1,
    width: "100%",
    bottom: "-15%",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

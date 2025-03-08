import { get } from "@/data/requestHelpers";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import MovieInfoItem from "./components/MovieInfoItem";
import { Divider } from "react-native-paper";
import { extractYear } from "@/Utils/Helpers";

export default function MovieDetail() {
  const { movieID } = useLocalSearchParams();
  const [movieDetailResponse, setMovieDetailResponse] =
    useState<types.movieDetai.MovieDetaiResponse | null>(null);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieData = await get<types.movieDetai.MovieDetaiResponse>(
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
            uri: `${process.env.IMAGE_ORIGINAL_URL}/${movieDetailResponse?.backdrop_path}`,
          }}
          style={styles.image}
          resizeMode="cover"
        />

        <BlurView intensity={20} tint="dark" style={styles.rate}>
          <Ionicons name="star-outline" size={16} color="#FF8700" />
          <Text style={styles.rateText}>
            {movieDetailResponse?.vote_average?.toFixed(1)}
          </Text>
        </BlurView>

        <Image
          source={{
            uri: `${process.env.IMAGE_BASE_URL}/${movieDetailResponse?.poster_path}`,
          }}
          style={styles.posterImage}
          resizeMode="cover"
        />

        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{movieDetailResponse?.title}</Text>
        </View>

        <View style={styles.movieInfoContainer}>
          <MovieInfoItem
            iconName="calendar-outline"
            text={extractYear(movieDetailResponse?.release_date?.toString())}
          />
          <Divider style={styles.divider} />
          <MovieInfoItem
            iconName="time-outline"
            text={`${movieDetailResponse?.runtime?.toString()} minutes`}
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
    height: "36%",
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
    height: "55%",
    width: "25%",
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
});

import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface SearchedMovieCardProps {
  //movieResult: types.movie.Result;
  movieResult: types.movieDetail.EnhancedMovieResult;
}

export default function SearchedMovieCard(props: SearchedMovieCardProps) {
  // New Logic
  const releaseYear = props.movieResult.release_date
    ? new Date(props.movieResult.release_date).getFullYear()
    : null;

  const handlePress = () => {
    router.push({
      pathname: "/(tabs)/(home)/movieDetail",
      params: { movieID: props.movieResult.id },
    });
  };

  const genres = props.movieResult.genres?.slice(0, 2).join(", ");
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.mainContainer}>
        <Image
          style={styles.image}
          source={{
            uri: `${process.env.EXPO_PUBLIC_IMAGE_ORIGINAL_URL}/${props.movieResult.poster_path}`,
          }}
        />
        <View style={styles.secondContainer}>
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontFamily: "Montserrat-Regular",
              marginBottom: 14,
            }}
          >
            {props.movieResult.title ?? "No name"}
          </Text>

          <View style={styles.textContainer}>
            <Ionicons name="star-outline" size={16} color="#FF8700" />
            <Text style={styles.rateText}>
              {props.movieResult?.vote_average?.toFixed(1)}
            </Text>
          </View>

          <View style={styles.textContainer}>
            <Ionicons name="ticket-outline" size={16} color="white" />
            <Text
              style={{
                color: "white",
                fontSize: 12,
                fontFamily: "Poppins",
              }}
            >
              {genres}
            </Text>
          </View>

          <View style={styles.textContainer}>
            <Ionicons name="calendar-outline" size={16} color="white" />
            <Text
              style={{
                color: "white",
                fontSize: 12,
                fontFamily: "Poppins",
              }}
            >
              {releaseYear}
            </Text>
          </View>

          <View style={styles.textContainer}>
            <Ionicons name="time-outline" size={16} color="white" />
            <Text
              style={{
                color: "white",
                fontSize: 12,
                fontFamily: "Poppins",
              }}
            >
              {props.movieResult.runtime + " minutes"}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    minHeight: 120,
    marginBottom: 24,
    backgroundColor: "clear",
    borderRadius: 8,
    overflow: "hidden",
    paddingHorizontal: 10,
    gap: 12,
  },

  secondContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: 8,
    bottom: 6,
    gap: 4,
  },

  image: {
    height: 120,
    width: 95,
    borderRadius: 16,
  },

  textContainer: {
    flexDirection: "row",
    backgroundColor: "clear",
    gap: 6,
    borderRadius: 8,
    overflow: "hidden",
  },
  rateText: {
    color: "#FF8700",
    fontFamily: "Montserrat-Semibold",
    fontSize: 12,
  },
});

import { router } from "expo-router";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

interface MovieCardProps {
  movie: types.movie.Movie;
  index: number
}

export default function HorizontalMovieCard(props: MovieCardProps) {
  const handlePress = () => {
    router.push({
      pathname: '/(tabs)/(home)/movieDetail',
      params: { movieID: props.movie.id}
    })
  }
  return (
    <TouchableOpacity style={styles.mainContainer} onPress={handlePress}>
      <Image
        source={{
          uri: `${process.env.EXPO_PUBLIC_IMAGE_BASE_URL}/${props.movie.poster_path}`,
        }}
        style={styles.image}
      />
      <Text style={styles.text}>
        {props.index}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    position: "relative",
    flexDirection: "row",
    marginRight: 30,
  },
  text: {
    position: "absolute",
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 96,
    color: '#242A32',
    opacity: 1,
    bottom: '-20%',
    left: '-6%',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowColor: '#0296E5',
    textShadowRadius: 2.5,
  },
  image: {
    width: 144,
    height: 210,
    borderRadius: 16,
  },
});

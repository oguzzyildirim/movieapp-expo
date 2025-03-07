import { View, Text, StyleSheet, Image } from "react-native";

interface MovieCardProps {
  movie: types.movie.Result;
  index: number
}

export default function HorizontalMovieCard(props: MovieCardProps) {
  return (
    <View style={styles.mainContainer}>
      <Image
        source={{
          uri: `${process.env.IMAGE_BASE_URL}/${props.movie.poster_path}`,
        }}
        style={styles.image}
      />
      <Text style={styles.text}>
        {props.index}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    position: "relative",
    flexDirection: "row",
    width: "100%",
  },
  text: {
    position: "absolute",
    borderWidth: 1,
    borderColor: "#0296E5",
    fontFamily: 'Montserrat',
    fontSize: 96,
    fontWeight: 'semibold',
    opacity: 1,
    bottom: '-20%',
    left: '18%',
  },
  image: {
    width: 144,
    height: 210,
    borderRadius: 16,
  },
});

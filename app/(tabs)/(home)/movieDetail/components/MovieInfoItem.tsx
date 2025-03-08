import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, Text } from "react-native";

interface MovieInfoItemProps {
  iconName: keyof typeof Ionicons.glyphMap;
  text: string;
}

export default function MovieInfoItem(props: MovieInfoItemProps) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.movieInfoContainer}>
        <Ionicons name={props.iconName} size={16} color="#92929D" />
        <Text style={styles.movieInfoText}>{props.text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    alignSelf: "center",
    gap: 12,
  },
  movieInfoContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 5,
  },
  movieInfoText: {
    color: "#92929D",
    fontFamily: "Montserrat-Semibold",
    fontSize: 12,
  },
});

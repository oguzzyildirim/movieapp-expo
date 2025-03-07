import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function MovieDetail() {
  const { movieID } = useLocalSearchParams();
  console.log("MovieID", movieID);
  return (
    <View>
      <Text>Movie ID is! {movieID}</Text>
    </View>
  )
}
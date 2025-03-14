import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { View, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import { useEffect, useReducer, useState } from "react";
import { useAsyncStorage } from "@/hooks/useAsyncStorage";

export default function MovieDetailLayout() {
  const { movieID } = useLocalSearchParams();
  const [isSaved, setIsSaved] = useState(false);
  const [headerRightIconName, setHeaderRightIconName] = useState<
    "bookmark-outline" | "bookmark"
  >("bookmark-outline");

  const { storedData, storeData } = useAsyncStorage<number[]>("favorite_movies", []);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        if (movieID) {
          const movieIdNumber = Number(movieID);
          setIsSaved(storedData.includes(movieIdNumber));
        }
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };
    
    checkFavoriteStatus();
  }, [movieID, storedData]);

  useEffect(() => {
    setHeaderRightIconName(isSaved ? "bookmark" : "bookmark-outline");
  }, [isSaved]);

  const handleToggleFavorite = async () => {
    try {
      const movieIdNumber = Number(movieID);
      const updatedData = isSaved
        ? storedData.filter(id => id !== movieIdNumber)
        : [...storedData, movieIdNumber];
      await storeData(updatedData);
      console.log('storedData---->>>' + storedData);
      setIsSaved(!isSaved);
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  };

  console.log('movieID---->>>' + movieID);
  return (
    <View style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Detail",
            headerTitleStyle: { color: "white" },
            headerShown: true,
            headerStyle: { backgroundColor: Colors["light"].primary },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => router.back()}
                style={{ padding: "6%", paddingLeft: "3%" }}
                activeOpacity={0.5}
              >
                <Ionicons name="chevron-back" size={24} color="white" />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={handleToggleFavorite}
                style={{ padding: "6%", paddingLeft: "3%" }}
                activeOpacity={0.5}
              >
                <Ionicons name={headerRightIconName} size={24} color="white" />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </View>
  );
}

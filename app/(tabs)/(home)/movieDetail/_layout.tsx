import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { View, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import { useEffect, useReducer, useState } from "react";

export default function HomeLayout() {
  const [isSaved, toggleSaved] = useReducer((state) => !state, false);
  const [headerRightIconName, setHeaderRightIconName] = useState<
    "bookmark-outline" | "bookmark"
  >("bookmark-outline");

  useEffect(() => {
    setHeaderRightIconName(isSaved ? "bookmark" : "bookmark-outline");
  }, [isSaved]);

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
                onPress={() => toggleSaved()}
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

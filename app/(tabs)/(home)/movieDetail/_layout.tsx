import { Stack } from "expo-router";
import { View } from "react-native";

export default function HomeLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'MovieDetail',
            headerShown: false,
          }}
        />
      </Stack>
    </View>
  );
}
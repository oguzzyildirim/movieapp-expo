import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';

export default function SearchLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen
          name="watchlist"
          options={{
            title: "Watch List",
            headerTitleStyle: { color: "white" },
            headerShown: true,
            headerStyle: { backgroundColor: Colors["light"].primary },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => router.replace('/(tabs)/(home)')}
                style={{ padding: "6%", paddingLeft: "3%" }}
                activeOpacity={0.5}
              >
                <Ionicons name="chevron-back" size={24} color="white" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name="movieDetail" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}
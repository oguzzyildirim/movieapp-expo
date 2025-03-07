import { router, Stack } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

export default function HomeLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            title: 'Home',
          }}
        />
        <Stack.Screen name="movieDetail" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}
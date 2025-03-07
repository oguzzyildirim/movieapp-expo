import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Image } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { setBackgroundColorAsync } from 'expo-system-ui';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const renderTabIcon = (icon: any, color: string) => (
    <Image
      source={icon} 
      style={{
        width: '80%',
        height: '80%',
        tintColor: color,
        resizeMode: 'contain',
      }}
    />
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarActiveBackgroundColor: Colors[colorScheme ?? 'light'].primary,
        tabBarInactiveBackgroundColor: Colors[colorScheme ?? 'light'].primary,
        tabBarStyle: {
          height: '11%',
          ...Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        })
      },
        tabBarIconStyle: {
          marginTop: '4%',
          marginBottom: '6%',
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => renderTabIcon(require('@/assets/icons/Home.png'), color),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => renderTabIcon(require('@/assets/icons/Search.png'), color),
        }}
      />
      <Tabs.Screen
        name="watchlist"
        options={{
          title: 'Watch list',
          tabBarIcon: ({ color }) => renderTabIcon(require('@/assets/icons/Watchlist.png'), color),
        }}
      />
    </Tabs>
  );
}

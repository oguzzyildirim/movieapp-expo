import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Image } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
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
        tabBarActiveTintColor: Colors['light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarActiveBackgroundColor: Colors['light'].primary,
        tabBarInactiveBackgroundColor: Colors['light'].primary,
        tabBarStyle: {
          height: '11%',
          ...Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
              height: '15%',
              bottom: '-4%',
            },
            default: {},
          })
        },
        tabBarIconStyle: {
          marginTop: '4%',
          marginBottom: '4%',
        },
      }}>
      
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => renderTabIcon(require('@/assets/icons/Home.png'), color),
          animation: 'shift',
        }}
      />
      <Tabs.Screen
        name="(search)"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => renderTabIcon(require('@/assets/icons/Search.png'), color),
          animation: 'shift',
        }}
      />
      <Tabs.Screen
        name="(watchlist)"
        options={{
          title: 'Watch list',
          tabBarIcon: ({ color }) => renderTabIcon(require('@/assets/icons/Watchlist.png'), color),
          animation: 'shift',
        }}
      />
    </Tabs>
  );
}

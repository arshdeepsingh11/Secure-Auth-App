import { Tabs } from 'expo-router'
import React from 'react'
import { Platform } from 'react-native'

import { HapticTab } from '@/components/HapticTab'
// Temporarily replaced IconSymbol to debug Android issues
import { Ionicons } from '@expo/vector-icons'
import TabBarBackground from '@/components/ui/TabBarBackground'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        // Only apply TabBarBackground on iOS to prevent Android issues
        tabBarBackground: Platform.OS === 'ios' ? TabBarBackground : undefined,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          android: {
            elevation: 5, // Ensures shadows on Android
            backgroundColor: Colors[colorScheme ?? 'light'].background, // Ensures visibility
          },
        }),
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color = 'black' }) => (
            <Ionicons name="home-outline" size={28} color={color} />
          ),
        }}
      />
      {/* Calgary Tab */}
      <Tabs.Screen
        name="calgary"
        options={{
          title: 'Calgary',
          tabBarIcon: ({ color = 'black' }) => (
            <Ionicons name="map-outline" size={28} color={color} />
          ),
        }}
      />
      {/* Edmonton Tab */}
      <Tabs.Screen
        name="edmonton"
        options={{
          title: 'Edmonton',
          tabBarIcon: ({ color = 'black' }) => (
            <Ionicons name="map-outline" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}

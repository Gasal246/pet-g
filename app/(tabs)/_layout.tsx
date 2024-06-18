import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import { Tabs, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { clearAllAsyncItems, getAsyncItem } from '@/lib/utils';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const [usertoken, setUserToken] = useState<any>();
  const router = useRouter()
  const ensureAuth = async () => {
    const data = await getAsyncItem('petg-user')
    setUserToken(data)
    if (!data) {
      router.replace('/login')
    }
    // await clearAllAsyncItems()
  }

  useEffect(() => {
    ensureAuth()
  }, [])

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Expense Tracking',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name={focused ? 'menu-open' : 'menu'} size={34} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}


import React from 'react';
import { SafeAreaView } from 'react-native';
import { Stack } from 'expo-router'; // This imports navigation and stack handling

export default function Layout() {
  return (
      <Stack screenOptions={{ headerShown: false }}>
        
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="Login" options={{ title: 'Login' }} />
        <Stack.Screen name="(admin)" options={{ title: 'Admin' }} />
      </Stack>
  );
}
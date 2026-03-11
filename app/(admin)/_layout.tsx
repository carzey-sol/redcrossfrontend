import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import TabBar from '../../components/TabBar';
import { Ionicons } from '@expo/vector-icons';

const _layout = () => {
  return (
    <Tabs 
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false, // Hide header if you don't need it
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? 'home' : 'home-outline'} 
              size={size || 24} 
              color={color} 
            />
          ),
        }} 
      />
      <Tabs.Screen 
        name="donation" 
        options={{
          title: 'Donation',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? 'compass' : 'compass-outline'} 
              size={size || 24} 
              color={color} 
            />
          ),
        }} 
      />
      <Tabs.Screen 
        name="usersettings" 
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? 'compass' : 'compass-outline'} 
              size={size || 24} 
              color={color} 
            />
          ),
        }} 
      />
    </Tabs>
  );
};

export default _layout;
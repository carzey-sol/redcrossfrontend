import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Text } from '@react-navigation/elements';
import React from 'react';

const TabBar = ({ state, descriptors, navigation }) => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel || options.title || route.name;
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={[
                styles.tabButton,
                isFocused ? styles.focusedTab : styles.unfocusedTab,
              ]}
            >
              {options.tabBarIcon?.({
                color: isFocused ? '#FFFFFF' : '#94A3B8',
                size: 18,
                focused: isFocused,
              })}
              <Text style={[
                styles.label,
                { color: isFocused ? '#FFFFFF' : '#94A3B8' }
              ]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 16,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    gap: 8,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    
    elevation: 3,
  },
  focusedTab: {
    backgroundColor: '#EF4444', // Changed from #0EA5E9 to a red color
  },
  unfocusedTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.5)',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  }
});

export default TabBar;
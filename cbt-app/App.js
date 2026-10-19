import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Feather } from '@expo/vector-icons';

import DetailUjianScreen from './screens/DetailUjianScreen';

const HomeScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Halaman Home</Text>
  </View>
);

const JadwalScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Halaman Jadwal</Text>
  </View>
);

const NilaiScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Halaman Nilai</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Halaman Profile</Text>
  </View>
);

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="DetailUjian"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 65,
            backgroundColor: '#ffffff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            elevation: 8,
          },
          tabBarActiveTintColor: '#2563eb',
          tabBarInactiveTintColor: '#94a3b8',
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="DetailUjian"
          component={DetailUjianScreen}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'document-text' : 'document-text-outline'} size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Jadwal"
          component={JadwalScreen}
          options={{
            tabBarIcon: ({ color }) => <Feather name="check-square" size={22} color={color} />,
          }}
        />
        <Tab.Screen
          name="Nilai"
          component={NilaiScreen}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'stats-chart' : 'stats-chart-outline'} size={22} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color }) => <Feather name="user" size={24} color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; 
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css";

import HomeScreen from "./src/screens/HomeScreen";
import ExploreScreen from "./src/screens/ExploreScreen";
import ReelsScreen from "./src/screens/ReelsScreen";
import AddPostScreen from "./src/screens/AddPostScreen";
import ProfileScreen from "./src/screens/ProfileScreen";


const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator screenOptions={styles.bottomTabs}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={styles.homeScreen}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={styles.exploreScreen}
      />
      <Tab.Screen
        name="Add"
        component={AddPostScreen}
        options={styles.addScreen}
      />
      <Tab.Screen
        name="Reels"
        component={ReelsScreen}
        options={styles.reelsScreen}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={styles.profileScreen}
      />
    </Tab.Navigator>
  );
};

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar
          style="dark"
          backgroundColor="transparent"
          translucent={true}
        />
        <BottomTabs />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  bottomTabs: {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: { backgroundColor: "#fff" },
    tabBarActiveTintColor: "#000",
    tabBarInactiveTintColor: "#8e8e8e",
  },
  homeScreen: {
    tabBarIcon: ({ color, size, focused }) => (
      <Ionicons
        name={focused ? "home" : "home-outline"}
        size={size}
        color={color}
      />
    ),
  },
  exploreScreen: {
    tabBarIcon: ({ color, size, focused }) => (
      <Ionicons
        name={focused ? "compass" : "compass-outline"}
        size={size}
        color={color}
      />
    ),
  },
  reelsScreen: {
    tabBarIcon: ({ color, size, focused }) => (
      <Ionicons
        name={focused ? "film" : "film-outline"}
        size={size}
        color={color}
      />
    ),
  },
  addScreen: {
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="add-circle-outline" size={size + 4} color={color} /> // Ukuran sedikit lebih besar
    ),
  },
  profileScreen: {
    // DIUBAH: Logika ikon profil sekarang menggunakan Ionicons
    tabBarIcon: ({ color, size, focused }) => (
      <Ionicons
        name={focused ? "person" : "person-outline"}
        size={size}
        color={color}
      />
    ),
  },
});

export default App;


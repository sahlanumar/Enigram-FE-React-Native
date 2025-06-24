import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import ExploreScreen from "../screens/ExploreScreen";
import ReelsScreen from "../screens/ReelsScreen";
import AddPostScreen from "../screens/AddPostScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={styles.bottomTabs}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={iconOptions("home")}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={iconOptions("compass")}
      />
      <Tab.Screen
        name="Add"
        component={AddPostScreen}
        options={iconOptions("add-circle-outline", 4)}
      />
      <Tab.Screen
        name="Reels"
        component={ReelsScreen}
        options={iconOptions("film")}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={iconOptions("person")}
      />
    </Tab.Navigator>
  );
};

const iconOptions = (iconName, sizeOffset = 0) => ({
  tabBarIcon: ({ color, size, focused }) => (
    <Ionicons
      name={focused ? iconName : `${iconName}-outline`}
      size={size + sizeOffset}
      color={color}
    />
  ),
});

const styles = StyleSheet.create({
  bottomTabs: {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: { backgroundColor: "#fff" },
    tabBarActiveTintColor: "#000",
    tabBarInactiveTintColor: "#8e8e8e",
  },
});

export default BottomTabNavigator;

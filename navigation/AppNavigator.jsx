import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthContext } from "../context/AuthContext";
import AuthNavigator from "./AuthNavigator";
import BottomTabNavigator from "./BottomTabNavigator";
import SplashScreen from "../src/screens/SplashScreen";
import PostDetailScreen from "../src/screens/PostDetailScreen"; 

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="MainApp"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PostDetail"
            component={PostDetailScreen}
            options={{
              title: "Post",
              headerBackTitleVisible: false, 
            }}
          />
        </>
      ) : (
        <Stack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;

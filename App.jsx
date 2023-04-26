import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import TodoDetailsScreen from "./screens/TodoDetailsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Todo App" }}
        />
        <Stack.Screen
          name="TodoDetails"
          component={TodoDetailsScreen}
          options={{ title: "Todo Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
/*
Optimize code by splitting your app into re-usable components 
	
Add Modal when to confirm deleting the todo
	
Use Dimensions for handling height of todos container 
	
Handle Orientation for your app

*/

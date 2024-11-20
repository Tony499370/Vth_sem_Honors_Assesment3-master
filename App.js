import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "./Home";
import { Asteroid } from "./Asteroid";
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
		<Stack.Navigator initialRouteName="Home">
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="Asteroid Details" component={Asteroid} />
		</Stack.Navigator>
  </NavigationContainer>
);

export default App;

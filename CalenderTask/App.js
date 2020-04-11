import * as React from 'react';
import { View, Text } from 'react-native';

import Screen2 from './project/Screens/Screen2'
import Screen3 from './project/Screens/Screen3'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={Screen2} />
        <Stack.Screen name="Screen3" component={Screen3} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
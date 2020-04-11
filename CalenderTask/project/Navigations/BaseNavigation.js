import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Import Screens
import Screen2 from '../Screens/Screen2';

const Stack=createStackNavigator()

function BaseNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Screen2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default BaseNavigation;

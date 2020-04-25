import * as React from 'react';
import { View, Text } from 'react-native';

import Screen2 from './project/Screens/Screen2'
import Screen3 from './project/Screens/Screen3'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const CalendarStack=createStackNavigator()
const CalendarNav=()=>{
  <CalendarStack.Navigator name="Home" component={Screen2}>
    <CalendarStack.Screen name="Screen3" component={Screen3}/>

    <CalendarStack.Screen/>
  </CalendarStack.Navigator>
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="TabHome" component={CalendarNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
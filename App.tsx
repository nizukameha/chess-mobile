import * as React from 'react';
import HomeScreen from './screens/HomeScreen';
import Chess from './screens/Chessboard';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="Accueil" component={HomeScreen} />
            <Stack.Screen name="Chess" component={Chess} />
          </Stack.Navigator>
        </NavigationContainer>
      );
}
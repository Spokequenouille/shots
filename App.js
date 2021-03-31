import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Users from './Users.js';
import User from './User.js';
import AddShot from './AddShot.js';
import DelShot from './DelShot.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Users">
          <Stack.Screen name="Users" component={Users} />
          <Stack.Screen name="User" component={User} />
          <Stack.Screen name="Ajouter des shots" component={AddShot} />
          <Stack.Screen name="Boire des shots" component={DelShot}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

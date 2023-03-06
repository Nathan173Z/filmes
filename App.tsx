import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'
import { Home } from './src/screens/Home';
import { Search } from './src/screens/Search';
import { AppRoutes  } from './src/routes/app.routes'
import { Detail } from './src/screens/Detail'

export default function App() {
  return (
    <NavigationContainer>
      <AppRoutes  /> 
      <StatusBar hidden={true} />
    </NavigationContainer>
  );
}
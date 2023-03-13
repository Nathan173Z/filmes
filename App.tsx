import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Home } from './src/screens/Home';
import { Search } from './src/screens/Search';
import { AppRoutes  } from './src/routes/app.routes'

import { Routes } from './src/routes'

export default function App() {
  return (
    <NavigationContainer>
      <Routes/> 
      <StatusBar hidden={true} />
    </NavigationContainer>
  );
}
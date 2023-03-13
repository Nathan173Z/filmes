import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'

import { AppRoutes } from './app.routes';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Favoritos } from '../screens/Favoritos';

const Drawer = createDrawerNavigator();

export function Routes() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false, 
                drawerStyle: {
                    backgroundColor: '#090A0E',
                    paddingTop: 20
                },
                drawerActiveBackgroundColor: '#E72F49',
                drawerActiveTintColor: '#FFFFFF',
                drawerInactiveTintColor: '#FFFFFF'
            }}
        >
            <Drawer.Screen 
            name="HomeDrawer" 
            component={AppRoutes} 
            options={{
                title: 'Home',
                drawerIcon: ({focused, size, color}) => {
                    return <MaterialCommunityIcons
                        name={focused ? 'movie-open' : 'movie-outline'}
                        size={size}
                        color={color} />;
                }

            }}

            />
                <Drawer.Screen 
            name="Favoritos" 
            component={Favoritos} 
            options={{
                title: 'Favoritos',
                drawerIcon: ({focused, size, color}) => {
                    return <MaterialCommunityIcons
                        name={focused ? 'movie-open' : 'movie-outline'}
                        size={size}
                        color={color} />;
                }

            }}
            />
      
        </Drawer.Navigator>
    )
}
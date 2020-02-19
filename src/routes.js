import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Main from './pages/Main';
import User from './pages/User';

const AppNavigator = createStackNavigator({

  Main: {
    screen: Main,

  },
  User:{
    screen: User,  

  },
    
},

);

export default createAppContainer(AppNavigator);
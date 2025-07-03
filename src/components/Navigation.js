import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LanderPage from '../components/LanderPage';
import Main from '../components/Main';

const Stack = createNativeStackNavigator();

const Navigation = ({isLoggedIn}) => {
  return (
    <NavigationContainer independent>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isLoggedIn ? (
          <Stack.Screen name="Main" component={Main} />
        ) : (
          <Stack.Screen name="Lander" component={LanderPage} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

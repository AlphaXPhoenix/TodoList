import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import SignIn from './SignIn';
import SignUp from './SignUp';
import {useSelector} from 'react-redux';

const Tab = createMaterialTopTabNavigator();

const AuthHandler = ({navigation}) => {
  const reduxCurrentUser = useSelector(state => state.currentUser);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentUser(reduxCurrentUser);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [reduxCurrentUser]);

  useEffect(() => {
    if (!isLoading && currentUser) {
      navigation.replace('Main');
    }
  }, [currentUser, isLoading]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#111827', // Dark gray (primary text)
        tabBarStyle: {
          backgroundColor: '#F9FAFB', // Soft clean tab bar
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#6366F1', // Vibrant indigo indicator
          height: 3,
        },
        tabBarLabelStyle: {fontWeight: 'bold'},
      }}>
      <Tab.Screen name="SignIn" component={SignIn} />
      <Tab.Screen name="SignUp" component={SignUp} />
    </Tab.Navigator>
  );
};

export default AuthHandler;

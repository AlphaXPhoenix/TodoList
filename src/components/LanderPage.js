import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import AuthHandler from './AuthHandler';
const LanderPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AuthHandler />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B0082',
    height: '100%',
  },
});

export default LanderPage;

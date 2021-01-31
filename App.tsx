import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet
} from 'react-native';
import Navigation from './src/navigations';

const App = () => {

  return (
    <>
      <StatusBar backgroundColor='#DBDFEF' />
      <SafeAreaView style={styles.container}>
        <Navigation></Navigation>
      </SafeAreaView>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

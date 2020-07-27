import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import LinkingConfiguration from './src/navigation/LinkingConfiguration';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#083D77',
    accent: '#7d98ac',
    background: '#F2F2E0',
    surface: '#763e00',
    text: '#083D77'
  },
};


export default function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <PaperProvider theme={theme}>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <NavigationContainer linking={LinkingConfiguration}>
          <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

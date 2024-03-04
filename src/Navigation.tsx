import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import SuccessScreen from './SuccessScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Home'}}
        />
        <Stack.Screen name="http://webview.cancel" component={SuccessScreen} />
        <Stack.Screen name="http://webview.error" component={SuccessScreen} />
        <Stack.Screen name="http://webview.refused" component={SuccessScreen} />
        <Stack.Screen name="http://webview.success" component={SuccessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
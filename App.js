import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import Register from './screens/Register'
import Login from './screens/Login'
import { MyContextControllerProvider } from './store';
import Jobs from './screens/Jobs';
import "react-native-gesture-handler"
import Router from './routers/Router';
import { NavigationContainer } from '@react-navigation/native'
import { useEffect } from 'react';

export default function App() {
   return (
    <MyContextControllerProvider>
      <NavigationContainer>
        <Router/>
      </NavigationContainer>      
    </MyContextControllerProvider>
  );
}

const styles = StyleSheet.create({});
import React, { useEffect } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Login from '../screens/Login';
import Register from '../screens/Register';
import Jobs from '../screens/Jobs';
import {logout, useMyContextController } from '../store';

const Stack = createStackNavigator();

const Routers = ({navigation}) => {
    const [controller, dispatch]= useMyContextController();
    const {userLogin} = controller;

    //console.log(userLogin);
    return (
        <Stack.Navigator
            initialRouteName='Login'
        >
            <Stack.Screen name='Login' component={Login} options={{title:"Đăng nhập", headerShown:false}}/>
            <Stack.Screen name='Register' component={Register} options={{title:"Đăng ký"}}/>
            <Stack.Screen
            name='Jobs'
            component={Jobs}
            options={{
                title:"Chào "+ (userLogin != null && userLogin.fullname),
                headerTitleAlign: 'center',
                headerLeft:null,
             }}
            />
        </Stack.Navigator>
    );
}

export default Routers;
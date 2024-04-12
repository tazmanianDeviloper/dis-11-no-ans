import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ApolloProvider} from '@apollo/client';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StatusBar} from 'expo-status-bar';
import client from './apolloClient';
import CreateStudent from './screens/CreateStudent';
import DisplayStudents from './screens/DisplayStudents';

const Tab = createBottomTabNavigator();

export default function App(){
    return (
        <ApolloProvider client={client}>
            <NavigationContainer>
                <StatusBar style="auto"/>
                <Tab.Navigator>
                    <Tab.Screen name="Create Student" component={CreateStudent}/>
                    <Tab.Screen name="Display Students" component={DisplayStudents}/>
                </Tab.Navigator>
            </NavigationContainer>
        </ApolloProvider>
    );
}


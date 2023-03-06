import { StyleSheet,View,Text} from 'react-native'
import React,{useState} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SavedScreen from '../screens/SavedScreen';
import NewsScreen from '../screens/NewsScreen';
import HomeNav from './HomeNav';





const Tab= createBottomTabNavigator();
const AppNavigator = () => {
  

  return (
    <Tab.Navigator
           screenOptions={({route}) => ({
                title:false,
                headerShown:false,
                 activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
                
            })}
            
           >
            <Tab.Screen name='Home' component={HomeNav} 
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: () => (
              <MaterialCommunityIcons name="home-account" color="black" size={30} />)
              
            }}
              
            
              />
              <Tab.Screen name='allNews' component={NewsScreen}
                options={{
                     tabBarLabel: 'all news',
                     tabBarIcon: () => (
                    <MaterialCommunityIcons name="newspaper-check" color="black" size={30} />)
            }}
              />
               <Tab.Screen name='saved news' component={SavedScreen} 
            options={{
              tabBarLabel: 'saved news',
              tabBarIcon: () => (
              <MaterialCommunityIcons name="content-save-edit-outline" color="black" size={30} />)
            }}
              />
              
        </Tab.Navigator>

    
   
  )
}

export default AppNavigator

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})
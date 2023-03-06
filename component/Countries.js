import { StyleSheet, Text, View, TouchableOpacity, Modal,ScrollView, } from 'react-native'
import React, { useContext, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Dimensions } from 'react-native';
import { Menu } from 'react-native-paper';
import { countries } from '../API/api';
import { NewsContext } from '../API/context';

const screenWidth = Dimensions.get('window').width;
const menuWidth= Math.round(screenWidth/2)

const Countries = () => {
    const [country,setCountry] =useState(false)
    const {setCountryNews} = useContext(NewsContext)
    const [currentCountry, setCurrentCountry] = useState("united states"); 
  return (
    
      <Menu
                 visible={country}
                 onDismiss={() =>setCountry(false)}
                 style={{height:"70%",width:menuWidth}}
                 contentStyle={{
                    top:30,
                    marginLeft:-3,
                    
                 }}
                 anchor={ 
                <TouchableOpacity style={styles.countyBtn} onPress={() => setCountry(true)}>
                    <Text style={styles.text13}>{currentCountry}</Text>
                    <AntDesign name='down' color={'black'} size={20} />
                </TouchableOpacity>}>
                <ScrollView style={styles.container}>
                    {
                        countries.map((item) => (
                             <TouchableOpacity style={styles.btn} key={item.code} onPress={() =>{
                                setCountryNews(item.code)
                                setCountry(false)
                                setCurrentCountry(item.name)

                             }}>
                              <Text style={styles.countryName}>{item.name}</Text>
                              </TouchableOpacity>
                        ))
                    }
                      
                      

                   
                    
                </ScrollView>
                

            </Menu> 
        
  )
}

export default Countries

const styles = StyleSheet.create({
    container:{
        width:menuWidth,

    },
    countyBtn:{
        flexDirection:"row",
        justifyContent:"space-between",
        padding:7,
        alignItems:"center",
        backgroundColor:"white",
        paddingRight:10,
        borderRadius:10,
        
    },
    countryName:{
        color:"black",
        justifyContent:"flex-start",
        textAlign:"center",
        paddingTop:10,
        fontWeight:"bold",
        
    },
    text13:{
        fontSize:12,
        fontWeight:"bold",
        textTransform:"capitalize",
        paddingRight:10,
    }
})
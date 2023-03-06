import { SafeAreaView, StyleSheet, View , TouchableOpacity, Text} from 'react-native'
import React, { useState } from 'react'
import Countries from './Countries'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { useContext } from 'react';
import { NewsContext } from '../API/context';
import { Menu } from 'react-native-paper';








const HeaderComponet = () => {
   const navigation = useNavigation();
   const [modalVisible,setModalVisible] = useState(false);
  // function to open drawer from header section
  const handleDrawerOpen = () => {
    navigation.dispatch(DrawerActions.openDrawer())
  };
  const { user,logOutUser } = useContext(NewsContext);
  console.log(user);
  const[openMenu,setOPenMenu] = useState(false);
    
  return (
    <SafeAreaView style={styles.container}>
        <View>
          <Countries />
        </View>
         <View style={styles.headerCenter}>
         <Text>create story</Text>
            
            <Menu
             visible={openMenu}
             onDismiss={() => setOPenMenu(false)}
             anchor={
             <TouchableOpacity style={styles.logoutBtn} onPress={() => setOPenMenu(true)}>
                  <Text style={styles.text13}>{user.username}</Text>
                  <AntDesign name='down' color={'white'} size={16} />
            </TouchableOpacity>}
            contentStyle={{
                    top:18,
                     backgroundColor:"#007FFF",
                    
      
                 }}
            >
                <TouchableOpacity style={styles.logoutBtn} onPress={() => {
                  setOPenMenu(false);
                  logOutUser();
                }}>
                  <Text style={styles.text11}>logout</Text>
                  <FontAwesome name="sign-out" size={18} color={"white"} />
                </TouchableOpacity>
        
            </Menu>

          </View>
        <View style={styles.menuBtn}>
            <TouchableOpacity onPress={handleDrawerOpen}>
                    <Ionicons name="menu" color="black" size={30} />
                    <Text style={styles.menuText}>menu</Text>
                </TouchableOpacity>
                
        </View>
    </SafeAreaView>
  )
}

export default HeaderComponet

const styles = StyleSheet.create({
  container:{
    flexDirection:"row",
    backgroundColor:"#007FFF",
    justifyContent:"space-between",
    alignItems:"center",
    paddingTop:15,
    paddingBottom:10,
    paddingLeft:15,
    paddingRight:15,
    
  },
 
  menuBtn:{
    justifyContent:"center",
    alignItems:"center",
  },
  menuText:{
    color:"white",
    fontSize:15,
    textTransform:"capitalize",
    fontWeight:"bold",
  },
  logintext:{
    color:"white",
    fontSize:22,
    textTransform:"capitalize",
    fontWeight:"bold",
    textAlign:"center",
    paddingLeft:13,
    paddingRight:13,
  },
  loginContainer:{
    justifyContent:"center",
    alignItems:"center",
    alignContent:"flex-start",
  },
  loginBtn:{
    borderBottomWidth:5,
    borderBottomColor:"black",
    borderBottomEndRadius:10,
    borderBottomLeftRadius:10,
  },
  modalContainer:{
    top:100,
    position:"absolute",
    backgroundColor:"white",
    width:"70%",
    height:"60%",
    left:"15%",
    borderWidth:2,
  },
  headerCenter:{
    flex:1,
    flexDirection:"row",
    justifyContent:"space-evenly",
  },
  logoutBtn:{
    flexDirection:"row",
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:10,
    paddingRight:15,
    justifyContent:"space-evenly",
    borderRadius:10,
    textAlign:"center",
    alignItems:"center",
    color:"white"
  },
  text13:{
    paddingRight:10,
    fontSize:18,
    textTransform:"capitalize",
    fontWeight:"bold",
    color:"white",
  },
  logoutBtn:{
    paddingTop:6,
    flexDirection:"row",
    paddingLeft:10,
    paddingRight:10,
    paddingBottom:5,

  },
  text11:{
    paddingRight:10,
    fontSize:18,
    textTransform:"capitalize",
    fontWeight:"bold",
    color:"white",
   

  }
})
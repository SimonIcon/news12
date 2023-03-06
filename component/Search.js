import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { NewsContext } from '../API/context'
import { Entypo } from '@expo/vector-icons';
import SingleNews from './SingleNews';

const Search = () => {
    const {news: {articles},}=useContext(NewsContext);
    const [searchResults,setSearchResults]= useState([])
    const [modalVisible,setModalVisible]= useState(false)
    const [currentNews,setCurrentNews]= useState()

    const handleSearch = (text) => {
        if(!text){
            setSearchResults([]);
            return;
        }
            setSearchResults(articles.filter((query) => query.title.includes(text)))
           }
    const handleModal=(n) =>{
        setModalVisible(true)
        setCurrentNews(n)

    }
  return (
    <View style={styles.container}>
       <TextInput 
        style={styles.searchInput}
        placeholder="search news"
        placeholderTextColor={"black"}
        onChangeText={(text)=> handleSearch(text)}
        
       />
       <View style={styles.searchResults}>
           {
              searchResults.slice(0,10).map((n)=>(
                <TouchableOpacity key={n.title}
                 activeOpacity={0.7}
                 onPress={()=> handleModal(n)}
                >
                    <Text style={styles.singleResult}>{n.title}</Text>

                </TouchableOpacity>
            ))
           }
       </View>
         <Modal animationType="slide"
         transparent={true}
          style={styles.modal}
         visible={modalVisible}
         onRequestClose={()=>{
            setModalVisible(!modalVisible)
         }}
         >
            
            <TouchableOpacity  onPress={()=> setModalVisible(!modalVisible)}style={styles.closeBtn}>
            <Entypo name='circle-with-cross' size={30} color="black"/> 
            </TouchableOpacity>
            <View style={styles.modalView}>
            <SingleNews item={currentNews}/>
          </View>
         </Modal>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
     searchInput:{
        backgroundColor:"white",
        width:"100%",
        justifyContent:"center",
        padding:3,
        paddingLeft:20,
        borderRadius:20,
        borderWidth:1,
    },
    searchResults:{
        position:"absolute",
        zIndex:1,
        top:40,
        color:"white",
        backgroundColor:"black",
       
    },
    singleResult:{
        borderRadius:5,
        padding:10,
        margin:1,
        elevation:5,
        shadowColor:"black",
        color:"white",
       
    },
    
    modal:{
        position:"relative",
        zIndex:1,
        top:50,
    },
    modalView:{
       top:60,
       
    },
    closeBtn:{
        left:"85%",
        top:120,
        position:"relative",
        zIndex:2,
    }
    
})
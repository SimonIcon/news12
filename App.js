
import {AlanView} from '@alan-ai/alan-sdk-react-native'
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, StatusBar, View } from 'react-native';
import AppNavigator from './component/AppNavigator';
import { NativeEventEmitter, NativeModules } from 'react-native';
import {useContext, useEffect} from 'react'
import Context, { NewsContext } from './API/context';
import { Provider as PaperProvider } from 'react-native-paper';
import HeaderComponet from './component/HeaderComponet';
import Authentication from './component/Authentication';




 function App() {
 const{ checkActive } = useContext(NewsContext);
  const {AlanEventEmitter} = NativeModules;
  const alanEventEmitter = new NativeEventEmitter(AlanEventEmitter)
  useEffect(() => {
     alanEventEmitter.addListener('onCommand', (data) => {
      if(data.command == "hello"){
        console.log("working")
      }
  });
  },[]);
  // declaring news categories and sources
  
 return (
    <SafeAreaView style={styles.container}>
      <PaperProvider>
      <NavigationContainer>
         
          {
            checkActive ? <> 
              {/* <Header /> */}
              <HeaderComponet />
              <AppNavigator/>
             {/* <AlanView projectid={'72e63980daa6d4b9658d5c573c6d13da2e956eca572e1d8b807a3e2338fdd0dc/stage'}/> */}
            
            </>: <><Authentication /></>
          }
          <StatusBar barStyle="skyblue" />
        
         
      </NavigationContainer>
    </PaperProvider>
      
      
    </SafeAreaView>
  );
}

export default() =>{
  return(
    <Context>
      <App />
    </Context>
  )
}

 
const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:"center"
    
},
});

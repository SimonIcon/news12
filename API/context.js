
import axios from "axios";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React,{ createContext, useEffect, useState } from "react";
import { auth, db } from "./firebase";





export const NewsContext = createContext();
const Context = ({children}) =>{
    const [source, setSource] = useState("cnn");
    const [category, setCategory] = useState('sports')
    const [news,setNews] = useState([]);
    const [countryNews,setCountryNews] = useState('us')
    const[checkActive,setCheckActive] = useState(false)
    const apiKey="b8dee7b2ff334f23b8fd7368697e6edd";
    const api="ef3e3e2ea2094f73b0ac10b194ce1f6c";
    
    // fetching articles from sources
    const BASE_URLOne =`https://newsapi.org/v2/top-headlines?apikey=${api}`
    const NEWS_API_URL=`${BASE_URLOne}&sources=${source}`
        const fetchNewsFromSource = async () =>{
            try {
                const {data} = await axios.get(NEWS_API_URL)
                 setNews(data)
                 console.log("this are articles")
            } catch (error) {
                console.log("symoh you are wrong be carefull")
                console.log(error)
                
            }
        }
         useEffect(()=>{
     fetchNewsFromSource();
     },[source])
    //  end of fetching news by source
    //   fetching articles from different category
    const BASE_URL = `https://newsapi.org/v2/top-headlines?country=${countryNews}`;
    const newsCategoryUrl=`${BASE_URL}&category=${category}&apikey=${apiKey}`;
     const fetchCategoryNews= async () =>{
        try {
            const {data} = await axios.get(newsCategoryUrl)
            setNews(data)
        } catch (error) {
            console.log("symoh below error was encounterred when fetching news from different category")
            console.log(error)
        }
     }
 useEffect(()=>{
     fetchCategoryNews();
     },[category])
  
    // end of fetching  news from different category

    // creating user with email and password
    const registerUser = async (email,password,name,url,country) =>{
       const res= createUserWithEmailAndPassword(auth,email,password)
            setDoc(doc(db,"userDetails",(await res).user.uid),{
              username:name,
              email:email,
              userProfile:url, 
              userCountry:country
            })
    }
    // checking if user has logged in
    const [user,setUser] = useState([]);
     useEffect(() => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setCheckActive(true)
         const snapshot = await getDoc(doc(db, "userDetails", user.uid))
          setUser(snapshot.data())
          }
      });
    }, []);
       // sign in with firebase
     const loginInUser=(email,password)=>{
          signInWithEmailAndPassword(auth,email,password)
           .then((res) => {
           console.log(res)
          })
          .catch((err) => {
            console.log('error while login in')
          })
        }
        // sign out user
        const logOutUser=()=>{
         signOut(auth)
          if(signOut(auth)){
            
            setTimeout(() => {
                setCheckActive(false)
            }, 1000);
          }
      }
    

   

   
    return(
        <NewsContext.Provider value={{setSource,news,setCategory,setNews,setCountryNews,
        registerUser,loginInUser,checkActive,user,logOutUser}}>
           {children}
        </NewsContext.Provider>
    )
}

export default Context;
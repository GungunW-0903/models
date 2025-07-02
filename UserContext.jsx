import {createContext,useEffect,useState} from "react";

export const UserContext=createContext({});
export  function UserContextProvider({children}){
     const [user,setUser]=useState(null);
    const[ready,setReady]=useState(false);
    useEffect( ()=>{
    if(!user){
        fetch('/profile',{credentials:'include'}).then(({data})=>{
              setUser(data);
              setReady(true);
    })
        
    }
    })
   
    return(
        <UserContext.Provider value={{user,setUser}}>
        {children}
        </UserContext.Provider>
    )
}
   
import { createContext, useState } from 'react'

const UserContext = createContext({})
export const UserDataProvider = ({Children})=>{
    const [user,setUser] = useState(JSON.parse(localStorage.getItem("blogger")))


  return (
   <UserContext.Provider value={{user,setUser}}>
            {Children}
   </UserContext.Provider>
   
   
  )
}

export default UserContext;
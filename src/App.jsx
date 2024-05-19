import { BrowserRouter, Route, Routes } from "react-router-dom"
import UserRoutes from "./Routes/UserRoutes"
import { UserDataProvider } from "./Context/UserContext"




function App() {


  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/*" element={<UserRoutes/>} />
        </Routes>
      </BrowserRouter> 
    </>
  )
}

export default App

import './App.css'
import { Route, Routes } from "react-router-dom"
import { Navbar } from "../src/components/Navbar/Navbar"
import  Login  from "../src/pages/Login/Login"
import  Landing  from "../src/pages/Landing/Landing"
import  Signup  from "./pages/Signup/Signup";
import * as authService from "./services/authService"
import { useState } from 'react'
import CreateItinerary from './pages/CreateItinerary/CreateItinerary'

function App () {
const [ user, setUser] = useState(authService.getUser())

function handleSignupOrLogin() {
    setUser(authService.getUser())
  }

  return (
  <div className='App'>
    <Navbar />
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Signup handleSignupOrLogin={handleSignupOrLogin}/>} />
      <Route path="/login" element={<Login handleSignupOrLogin={handleSignupOrLogin}/>} />
      <Route path="/itineraries" element={<CreateItinerary/>}/>
    </Routes>
 </div>
  );
}
export default App;
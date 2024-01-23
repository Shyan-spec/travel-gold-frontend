import './App.css'
import { Route, Routes } from "react-router-dom"
import { Navbar } from "../src/components/Navbar/Navbar"
import  Login  from "../src/pages/Login/Login"
import  Landing  from "../src/pages/Landing/Landing"
import  Signup  from "./pages/Signup/Signup";
function App () {
  return (
  <div className="App">
    <Navbar />
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
    </Routes>
  </div>
  );
}
export default App;
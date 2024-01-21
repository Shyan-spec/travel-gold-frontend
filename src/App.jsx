import "./App.css"
import { Route, Routes } from "react-router-dom";
import { Navbar } from "../src/components/Navbar";
import { Login } from "./Login";
import { Createaccount } from "./Createaccount";
import { Home } from './Home'


function App () {
  return (
  <div className="App">
    
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/createaccount" element={<Createaccount/>} />
      <Route path="/login" element={<Login/>} />
    </Routes>
  </div>
  );
}

export default App;

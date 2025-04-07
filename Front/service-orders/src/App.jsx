import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from "./components/login/login.jsx";
import SignUp from "./components/signup/signup.jsx";
import Home from "./components/home/home.jsx";
import Historico from "./components/historicos/historicos.jsx";
import Manutentores from "./components/manutentores/manutentores.jsx";

const App = ()=>{
  return(
  <Router>
    <Routes>
      <Route path="/signup" element={< SignUp/>}/>
      <Route path="/" element={<Login />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/home" element={<Home />}/>
      <Route path="/historicos" element={<Historico />}/>
      <Route path="/manutentores" element={<Manutentores />}/>
    </Routes>
  </Router>
  )
}

export default App
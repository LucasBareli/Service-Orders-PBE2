import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from "./components/login/login.jsx";
import SignUp from "./components/signup/signup.jsx";
import Home from "./components/home/home.jsx";
import Historico from "./components/historicos/historicos.jsx";
import Manutentores from "./components/manutentores/manutentores.jsx";
import OrdemServico from "./components/ordemServico/ordemServico.jsx";
import Gestores from "./components/gestores/gestores.jsx";
import Patrimonio from "./components/patrimonios/patrimonios.jsx";
import Responsaveis from "./components/responsaveis/responsaveis.jsx";
import Ambientes from "./components/ambientes/ambientes.jsx";

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
      <Route path="/ordens-servico" element={<OrdemServico />}/>
      <Route path="/gestores" element={<Gestores />}/>
      <Route path="/patrimonios" element={<Patrimonio />}/>
      <Route path="/responsaveis" element={<Responsaveis />}/>
      <Route path="/ambientes" element={<Ambientes />}/>
    </Routes>
  </Router>
  )
}

export default App
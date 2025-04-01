import React from 'react';
import './header.css'; 

const Header = () => {
  return (
    <header className="header">
      <div className="logo">PBE</div>
      <nav className="nav">
        <a href="/home">Home</a>
        <a href="/ordens-servico">Ordens de Serviço</a>
        <a href="/responsaveis">Responsaveis</a>
        <a href="/patrimonios">Patrimonios</a>
        <a href="/manutentores">Manutentores</a>
        <a href="/historicos">Historicos</a>
      </nav>
    </header>
  );
};

export default Header;
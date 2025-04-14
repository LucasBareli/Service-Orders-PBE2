import React from 'react';
import './home.css';  

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Bem-vindo ao Sistema de Ordem de Serviço</h1>
      <div className="topics-container">
        <div className="topic-card">
          <h2>Ordens de Serviço</h2>
          <a href="/ordens-servico" className="topic-link">Acessar</a>
        </div>
        <div className="topic-card">
          <h2>Responsáveis</h2>
          <a href="/responsaveis" className="topic-link">Acessar</a>
        </div>
        <div className="topic-card">
          <h2>Patrimônios</h2>
          <a href="/patrimonios" className="topic-link">Acessar</a>
        </div>
        <div className="topic-card">
          <h2>Manutentores</h2>
          <a href="/manutentores" className="topic-link">Acessar</a>
        </div>
        <div className="topic-card">
          <h2>Históricos</h2>
          <a href="/historicos" className="topic-link">Acessar</a>
        </div>
        <div className="topic-card">
          <h2>Gestores</h2>
          <a href="/gestores" className="topic-link">Acessar</a>
        </div>
      </div>
    </div>
  );
};

export default Home;

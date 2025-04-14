import React, { useState, useEffect } from "react";
import axios from "axios";
import './historicos.css';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import ModalHistorico from "../modalHistorico/modalHistorico";

export default function Historico() {
  const [dados, setDados] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [historicoSelecionados, setHistoricosSelecionados] = useState(null);
  const [busca, setBusca] = useState("");
  const [ordens, setOrdens] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/historico", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDados(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [token]);

  const carregarOrdens = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/ordemservico", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrdens(response.data);
    } catch (error) {
      console.error("Erro ao buscar ordens de serviço:", error);
    }
  };

  const atualizar = async (historicoAtualizado) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/historico/${historicoAtualizado.id}`,
        historicoAtualizado,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDados((prevDados) =>
        prevDados.map((historico) =>
          historico.id === historicoAtualizado.id ? historicoAtualizado : historico
        )
      );
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar o historico:", error);
    }
  };

  const apagar = async (id) => {
    if (window.confirm("Tem certeza que deseja apagar?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/historico/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDados(dados.filter((historico) => historico.id !== id));
      } catch (error) {
        console.error("Erro ao apagar historico:", error);
      }
    }
  };

  const criar = async (novoHistorico) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/historico",
        novoHistorico,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDados([...dados, response.data]);
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao criar historico:", error);
    }
  };

  const historicoFiltradas = dados.filter((historico) =>
    historico.descricao_manutencao.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="historico-container">
      <h1>Gestão de Histórico</h1>
      <button
        className="btn-adicionar"
        onClick={() => {
          carregarOrdens(); 
          setModalOpen(true);
          setHistoricosSelecionados(null);
        }}
      >
        <FaPlus />
      </button>
      <input
        type="text"
        placeholder="Buscar histórico"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />
      <FaSearch />
      <div className="historico-list">
        <div className="table-header">
          <div className="col-header">Ordem</div>
          <div className="col-header">Data Encerramento</div>
          <div className="col-header">Descrição Manutenção</div>
          <div className="col-header">Editar</div>
          <div className="col-header">Apagar</div>
        </div>
        {historicoFiltradas.length ? (
          historicoFiltradas.map((historico) => (
            <div className="historico-item" key={historico.id}>
              <span>{historico.ordem ? historico.ordem.nome : "N/A"}</span>
              <span>{new Date(historico.data_encerramento).toLocaleDateString()}</span>
              <span>{historico.descricao_manutencao}</span>
              <button
                className="btn edit"
                onClick={() => {
                  carregarOrdens(); 
                  setModalOpen(true);
                  setHistoricosSelecionados(historico);
                }}
              >
                <FaEdit />
              </button>
              <button
                className="btn delete"
                onClick={() => apagar(historico.id)}
              >
                <FaTrash />
              </button>
            </div>
          ))
        ) : (
          <p>Nenhum histórico encontrado.</p>
        )}
      </div>
      {modalOpen && (
        <ModalHistorico
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          historicoSelecionados={historicoSelecionados}
          criar={criar}
          atualizar={atualizar}
          ordens={ordens} 
        />
      )}
    </div>
  );
}

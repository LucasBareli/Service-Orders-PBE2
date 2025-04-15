import React, { useState, useEffect } from "react";
import axios from "axios";
import './historicos.css';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import ModalHistorico from "../modalHistorico/modalHistorico";

export default function Historico() {
  const [dados, setDados] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [historicoSelecionado, setHistoricoSelecionado] = useState(null);
  const [busca, setBusca] = useState("");
  const [ordensMap, setOrdensMap] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrdens = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/ordemservico", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const ordens = response.data.reduce((map, ordem) => {
          map[ordem.id] = ordem.descricao;
          return map;
        }, {});
        setOrdensMap(ordens);
      } catch (error) {
        console.error("Erro ao buscar ordens de serviço:", error);
      }
    };

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

    if (token) {
      fetchOrdens();
      fetchData();
    }
  }, [token]);

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
      console.error("Erro ao atualizar o histórico:", error);
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
      console.error("Erro ao criar histórico:", error);
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
        console.error("Erro ao apagar histórico:", error);
      }
    }
  };

  const historicosFiltrados = dados.filter((historico) =>
    historico.descricao_manutencao.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="historico-container">
      <h1>Gestão de Histórico</h1>
      <button
        className="btn-adicionar"
        onClick={() => {
          setModalOpen(true);
          setHistoricoSelecionado(null);
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

        {historicosFiltrados.length ? (
          historicosFiltrados.map((historico) => (
            <div className="historico-item" key={historico.id}>
              <span>{ordensMap[historico.ordem] || "N/A"}</span>
              <span>{new Date(historico.data_encerramento).toLocaleDateString()}</span>
              <span>{historico.descricao_manutencao}</span>
              <button
                className="btn edit"
                onClick={() => {
                  setModalOpen(true);
                  setHistoricoSelecionado(historico);
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
          historicoSelecionado={historicoSelecionado}
          criar={criar}
          atualizar={atualizar}
        />
      )}
    </div>
  );
}

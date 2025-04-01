import React, { useState, useEffect } from "react";
import axios from "axios";
import "./historicos.css";
//import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import ModalHistorico from "../modalHistorico/modalHistorico";

export default function Historico() {
  const [dados, setDados] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [historicoSelecionado, sethistoricoSelecionado] = useState(null);
  const [busca, setBusca] = useState("");
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

  const atualizar = async (historicosAtualizados) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/historico/${historicoAtualizados.id}`,
        {
          ordem : historicosAtualizados.ordem,
          data_encerramento : historicosAtualizados.data_encerramento,
          descricao_manutencao : historicosAtualizados.descricao_manutencao,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDados(
        dados.map((historicos) =>
          historicos.id === historicosAtualizados.id
            ? historicosAtualizados
            : historicos
        )
      );
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar historico:", error);
    }
  };

  const apagar = async (id) => {
    if (window.confirm("Tem certeza que deseja apagar?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/historico/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDados(dados.filter((historicos) => historicos.id !== id));
      } catch (error) {
        console.error("Erro ao apagar historico:", error);
      }
    }
  };

  const criar = async (novoHistorico) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/historico",
        {
            ordem : novoHistorico.ordem,
            data_encerramento : novoHistorico.data_encerramento,
            descricao_manutencao : novoHistorico.descricao_manutencao,
        },
        {
          headers: { Authorization: `Bearer ${token}` }, 
        }
      );
      setDados([...dados, response.data]);
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao criar histórico:", error);
    }
  };

  const historicosFiltrados = dados.filter((historicos) =>
    historicos.historico.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="historico-container">
      <h1>Gestão de históricos</h1>
        <button
          className="btn-adicionar"
          onClick={() => {
            setModalOpen(true);
            sethistoricoSelecionado(null);
          }}
        >
          {/* <FaPlus /> */}
        </button>
        <input
          type="text"
          placeholder="Buscar historico"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        {/* <FaSearch /> */}
      <div className="historico-list">
        <div className="table-header">
            <div className="col-header">Ordem</div>
            <div className="col-header">Data encerramento</div>
            <div className="col-header">Descrição manutenção</div>
          </div>
        {historicosFiltrados.length ? (
          historicosFiltrados.map((historico) => (
            <div className="historico-item" key={historico.id}>
                <span>{historico.ordem}</span>
                <span>{historico.data_encerramento}</span>
                <span>{historico.descricao_manutencao}</span>
              <button
                className="btn edit"
                onClick={() => {
                  setModalOpen(true);
                  sethistoricoSelecionado(historico);
                }}
              >
                {/* <FaEdit /> */}
              </button>
              <button
                className="btn delete"
                onClick={() => apagar(historico.id)}
              >
              {/*  <FaTrash /> */}
              </button>
            </div>
          ))
        ) : (
          <p>Nenhuma historico encontrada.</p>
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
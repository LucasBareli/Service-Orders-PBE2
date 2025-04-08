import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ordemServico.css";
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import ModalOrdemServico from "../modalOrdem/modalOrdem";

const OrdemServico = () => {
  const [dados, setDados] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [ordemServicoSelecionados, setOrdemServicoSelecionados] = useState(null);
  const [busca, setBusca] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/ordemservico", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDados(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [token]);

  const atualizar = async (ordemAtualizada) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/ordemservico/${ordemAtualizada.id}`, 
        ordemAtualizada,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDados((prevDados) =>
        prevDados.map((ordem) =>
          ordem.id === ordemAtualizada.id ? ordemAtualizada : ordem
        )
      );
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar a ordem:", error);
    }
  };

  const apagar = async (id) => {
    if (window.confirm("Tem certeza que deseja apagar?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/ordemservico/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDados(dados.filter((ordem) => ordem.id !== id));
      } catch (error) {
        console.error("Erro ao apagar ordem:", error);
      }
    }
  };

  const criar = async (novaOrdem) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/ordemservico",
        novaOrdem,
        {
          headers: { Authorization: `Bearer ${token}` }, 
        }
      );
      setDados([...dados, response.data]);
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao criar ordem:", error);
    }
  };

  const ordemServicoFiltrado = dados.filter((ordem) =>
    ordem.descricao.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="ordem-container">
      <h1>Gestão de Ordem de Serviço</h1>
      <button
        className="btn-adicionar"
        onClick={() => {
          setModalOpen(true);
          setOrdemServicoSelecionados(null);
        }}
      >
        <FaPlus />
      </button>
      <input
        type="text"
        placeholder="Buscar ordem"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />
      <FaSearch />
      <div className="ordem-list">
        <div className="table-header">
          <div className="col-header">Descrição</div>
          <div className="col-header">Status</div>
          <div className="col-header">Prioridade</div>
          <div className="col-header">Editar</div>
          <div className="col-header">Apagar</div>
        </div>
        {ordemServicoFiltrado.length ? (
          ordemServicoFiltrado.map((ordem) => (
            <div className="ordem-item" key={ordem.id}>
              <span>{ordem.descricao}</span>
              <span>{ordem.status}</span>
              <span>{ordem.prioridade}</span>
              <button
                className="btn edit"
                onClick={() => {
                  setModalOpen(true);
                  setOrdemServicoSelecionados(ordem);
                }}
              >
                <FaEdit />
              </button>
              <button
                className="btn delete"
                onClick={() => apagar(ordem.id)}
              >
                <FaTrash />
              </button>
            </div>
          ))
        ) : (
          <p>Nenhuma ordem encontrada.</p>
        )}
      </div>
      {modalOpen && (
        <ModalOrdemServico
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          ordemServicoSelecionados={ordemServicoSelecionados}
          criar={criar}
          atualizar={atualizar}
        />
      )}
    </div>
  );
};

export default OrdemServico;

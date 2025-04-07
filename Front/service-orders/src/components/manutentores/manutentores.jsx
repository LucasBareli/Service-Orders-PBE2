import React, { useState, useEffect } from "react";
import axios from "axios";
import "./manutentores.css";
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import modalManutentores from "../modalManutentor/modalManutentor";

export default function Manutentores() {
  const [dados, setDados] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [manutentoresSelecionado, setmanutentoresSelecionado] = useState(null);
  const [busca, setBusca] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/manutentores", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDados(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [token]);

  const atualizar = async (manutentorAtualizado) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/manutentores/${manutentorAtualizado.id}`,
        {
          nome : manutentorAtualizado.nome,
          area : manutentorAtualizado.data_encerramento,
          ni : manutentorAtualizado.ni,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDados(
        dados.map((manutentores) =>
          manutentores.id === manutentorAtualizado.id
            ? manutentorAtualizado
            : manutentores
        )
      );
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar manutentor:", error);
    }
  };

  const apagar = async (id) => {
    if (window.confirm("Tem certeza que deseja apagar?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/manutentores/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDados(dados.filter((manutentores) => manutentores.id !== id));
      } catch (error) {
        console.error("Erro ao apagar manutentor:", error);
      }
    }
  };

  const criar = async (novoManutentor) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/manutentores",
        {
            nome : novoManutentor.nome,
            area : novoManutentor.area,
            ni : novoManutentor.ni,
        },
        {
          headers: { Authorization: `Bearer ${token}` }, 
        }
      );
      setDados([...dados, response.data]);
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao criar manutentor:", error);
    }
  };

  const manutentoresFiltrados = dados.filter((manutentor) =>
    manutentor.manutentores.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="manutentor-container">
      <h1>Gestão de manutentores</h1>
        <button
          className="btn-adicionar"
          onClick={() => {
            setModalOpen(true);
            setmanutentoresSelecionado(null);
          }}
        >
          <FaPlus />
        </button>
        <input
          type="text"
          placeholder="Buscar manutentor"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <FaSearch />
      <div className="manutentor-list">
        <div className="table-header">
            <div className="col-header">Nome</div>
            <div className="col-header">Area</div>
            <div className="col-header">NI</div>
          </div>
        {manutentoresFiltrados.length ? (
          manutentoresFiltrados.map((manutentores) => (
            <div className="manutentor-item" key={manutentores.id}>
                <span>{manutentores.ordem}</span>
                <span>{manutentores.data_encerramento}</span>
                <span>{manutentores.descricao_manutencao}</span>
              <button
                className="btn edit"
                onClick={() => {
                  setModalOpen(true);
                  setmanutentoresSelecionado(manutentores);
                }}
              >
              <FaEdit />
              </button>
              <button
                className="btn delete"
                onClick={() => apagar(manutentores.id)}
              >
              <FaTrash /> 
              </button>
            </div>
          ))
        ) : (
          <p>Nenhum manutentor encontrado.</p>
        )}
      </div>
      {modalOpen && (
        <modalManutentores
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          manutentoresSelecionado={manutentoresSelecionado}
          criar={criar}
          atualizar={atualizar}
        />
      )}
    </div>
  );
}
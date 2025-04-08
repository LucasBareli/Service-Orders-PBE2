import React, { useState, useEffect } from "react";
import axios from "axios";
import "./manutentores.css";
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import ModalManutentores from "../modalManutentor/modalManutentor";

export default function Manutentores() {
  const [dados, setDados] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [manutentoresSelecionados, setManutentoresSelecionados] = useState(null);
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
        manutentorAtualizado,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDados((prevDados) =>
        prevDados.map((manutentor) =>
          manutentor.id === manutentorAtualizado.id ? manutentorAtualizado : manutentor
        )
      );
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar o manutentor:", error);
    }
  };

  const apagar = async (id) => {
    if (window.confirm("Tem certeza que deseja apagar?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/manutentores/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDados(dados.filter((manutentor) => manutentor.id !== id));
      } catch (error) {
        console.error("Erro ao apagar manutentor:", error);
      }
    }
  };

  const criar = async (novoManutentor) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/manutentores",
        {
          nome: novoManutentor.nome,
          area: novoManutentor.area,
          ni: novoManutentor.ni,
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

  const manutentoresFiltradas = dados.filter((manutentor) =>
    manutentor.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="manutentor-container">
      <h1>Gestão de manutentores</h1>
        <button
          className="btn-adicionar"
          onClick={() => {
            setModalOpen(true);
            setManutentoresSelecionados(null);
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
            <div className="col-header">Área</div>
            <div className="col-header">NI</div>
            <div className="col-header">Editar</div>
            <div className="col-header">Apagar</div>
          </div>
        {manutentoresFiltradas.length ? (
          manutentoresFiltradas.map((manutentor) => (
            <div className="manutentor-item" key={manutentor.id}>
              <span>{manutentor.nome}</span>
              <span>{manutentor.area}</span>
              <span>{manutentor.ni}</span>
              <button
                className="btn edit"
                onClick={() => {
                  setModalOpen(true);
                  setManutentoresSelecionados(manutentor);
                }}
              >
                <FaEdit />
              </button>
              <button
                className="btn delete"
                onClick={() => apagar(manutentor.id)}
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
        <ModalManutentores
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          manutentoresSelecionados={manutentoresSelecionados}
          criar={criar}
          atualizar={atualizar}
        />
      )}
    </div>
  );
}
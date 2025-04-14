import React, { useState, useEffect } from "react";
import axios from "axios";
import "./gestores.css";
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import ModalGestores from "../modalGestores/modalGestores";

export default function Gestores() {
  const [dados, setDados] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [gestoresSelecionados, setgestoresSelecionados] = useState(null);
  const [busca, setBusca] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/gestores", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDados(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [token]);

  const atualizar = async (gestorAtualizado) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/gestores/${gestorAtualizado.id}`, 
        gestorAtualizado,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDados((prevDados) =>
        prevDados.map((gestor) =>
          gestor.id === gestorAtualizado.id ? gestorAtualizado : gestor
        )
      );
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar o gestor:", error);
    }
  };

  const apagar = async (id) => {
    if (window.confirm("Tem certeza que deseja apagar?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/gestores/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDados(dados.filter((gestor) => gestor.id !== id));
      } catch (error) {
        console.error("Erro ao apagar gestor:", error);
      }
    }
  };

  const criar = async (novoGestor) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/gestores",
        {
          ni: novoGestor.ni,
          nome: novoGestor.nome,
          area: novoGestor.area,
          cargo: novoGestor.cargo
        },
        {
          headers: { Authorization: `Bearer ${token}` }, 
        }
      );
      setDados([...dados, response.data]);
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao criar gestor:", error);
    }
  };

  const gestoresFiltrados = dados.filter((gestor) =>
    gestor.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="gestor-container">
      <h1>Gestão de gestores</h1>
        <button
          className="btn-adicionar"
          onClick={() => {
            setModalOpen(true);
            setgestoresSelecionados(null);
          }}
        >
          <FaPlus />
        </button>
        <input
          type="text"
          placeholder="Buscar gestor"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <FaSearch />
      <div className="gestor-list">
        <div className="table-header">
            <div className="col-header">NI</div>
            <div className="col-header">Nome</div>
            <div className="col-header">Área</div>
            <div className="col-header">Cargo</div>
            <div className="col-header">Editar</div>
            <div className="col-header">Apagar</div>
          </div>
        {gestoresFiltrados.length ? (
          gestoresFiltrados.map((gestor) => (
            <div className="gestor-item" key={gestor.id}>
                <span>{gestor.ni}</span>
                <span>{gestor.nome}</span>
                <span>{gestor.area}</span>
                <span>{gestor.cargo}</span>
              <button
                className="btn edit"
                onClick={() => {
                  setModalOpen(true);
                  setgestoresSelecionados(gestor);
                }}
              >
                <FaEdit />
              </button>
              <button
                className="btn delete"
                onClick={() => apagar(gestor.id)}
              >
                <FaTrash />
              </button>
            </div>
          ))
        ) : (
          <p>Nenhum gestor encontrado.</p>
        )}
      </div>
      {modalOpen && (
        <ModalGestores
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          gestoresSelecionados={gestoresSelecionados}
          criar={criar}
          atualizar={atualizar}
        />
      )}
    </div>
  );
}
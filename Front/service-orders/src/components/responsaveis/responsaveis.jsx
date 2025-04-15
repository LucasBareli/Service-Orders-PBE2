import React, { useState, useEffect } from "react";
import axios from "axios";
import "./responsaveis.css";
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import ModalResponsavel from "../modalResponsaveis/modalResponsaveis";

export default function Responsaveis() {
  const [dados, setDados] = useState([]);
  const [ambientes, setAmbientes] = useState([]);
  const [gestores, setGestores] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [responsaveisSelecionados, setResponsaveisSelecionados] = useState(null);
  const [busca, setBusca] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const [responsaveisRes, ambientesRes, gestoresRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/responsaveis", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://127.0.0.1:8000/api/ambientes", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://127.0.0.1:8000/api/gestores", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setDados(responsaveisRes.data);
        setAmbientes(ambientesRes.data);
        setGestores(gestoresRes.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [token]);

  const atualizar = async (responsavelAtualizado) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/responsaveis/${responsavelAtualizado.id}`,
        responsavelAtualizado,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDados((prevDados) =>
        prevDados.map((responsavel) =>
          responsavel.id === responsavelAtualizado.id ? responsavelAtualizado : responsavel
        )
      );
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar o responsavel:", error);
    }
  };

  const apagar = async (id) => {
    if (window.confirm("Tem certeza que deseja apagar?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/responsaveis/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDados(dados.filter((responsavel) => responsavel.id !== id));
      } catch (error) {
        console.error("Erro ao apagar responsavel:", error);
      }
    }
  };

  const criar = async (novoResponsavel) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/responsaveis",
        novoResponsavel,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDados([...dados, response.data]);
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao criar responsavel:", error);
    }
  };

  const responsaveisFiltradas = dados.filter((responsavel) =>
    responsavel.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="responsavel-container">
      <h1>Gestão de Responsáveis</h1>
      <button
        className="btn-adicionar"
        onClick={() => {
          setModalOpen(true);
          setResponsaveisSelecionados(null);
        }}
      >
        <FaPlus />
      </button>
      <input
        type="text"
        placeholder="Buscar responsável"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />
      <FaSearch />
      <div className="responsavel-list">
        <div className="table-header">
          <div className="col-header">NI</div>
          <div className="col-header">Nome</div>
          <div className="col-header">Ambiente</div>
          <div className="col-header">Gestor</div>
          <div className="col-header">Editar</div>
          <div className="col-header">Apagar</div>
        </div>
        {responsaveisFiltradas.map((responsavel) => (
          <div className="responsavel-item" key={responsavel.id}>
            <span>{responsavel.ni}</span>
            <span>{responsavel.nome}</span>
            <span>{responsavel.ambiente}</span>
            <span>{responsavel.nome}</span>
            <button
              className="btn edit"
              onClick={() => {
                setModalOpen(true);
                setResponsaveisSelecionados(responsavel);
              }}
            >
              <FaEdit />
            </button>
            <button
              className="btn delete"
              onClick={() => apagar(responsavel.id)}
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
      {modalOpen && (
        <ModalResponsavel
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          responsaveisSelecionados={responsaveisSelecionados}
          ambientes={ambientes}
          gestores={gestores}
          criar={criar}
          atualizar={atualizar}
        />
      )}
    </div>
  );
}

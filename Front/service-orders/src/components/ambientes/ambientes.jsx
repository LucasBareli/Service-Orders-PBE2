import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ambientes.css";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import ModalAmbiente from "../modalAmbientes/modalAmbiente";

export default function Ambientes() {
  const [dados, setDados] = useState([]);
  const [responsaveis, setResponsaveis] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [ambientesSelecionados, setAmbientesSelecionados] = useState(null);
  const [busca, setBusca] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const [ambientesRes, responsaveisRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/ambientes", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://127.0.0.1:8000/api/responsaveis", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setDados(ambientesRes.data);
        setResponsaveis(responsaveisRes.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [token]);

  const atualizar = async (ambienteAtualizado) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/ambientes/${ambienteAtualizado.id}`,
        ambienteAtualizado,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDados((prevDados) =>
        prevDados.map((ambiente) =>
          ambiente.id === ambienteAtualizado.id ? ambienteAtualizado : ambiente
        )
      );
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar o ambiente:", error);
    }
  };

  const apagar = async (id) => {
    if (window.confirm("Tem certeza que deseja apagar?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/ambientes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDados(dados.filter((ambiente) => ambiente.id !== id));
      } catch (error) {
        console.error("Erro ao apagar ambiente:", error);
      }
    }
  };

  const criar = async (novoAmbiente) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/ambientes",
        novoAmbiente,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDados([...dados, response.data]);
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao criar ambiente:", error);
    }
  };

  const ambientesFiltrados = dados.filter((ambiente) =>
    ambiente.descricao.toLowerCase().includes(busca.toLowerCase())
  );

  const getResponsavelNome = (id) => {
    const responsavel = responsaveis.find((resp) => resp.id === id);
    return responsavel ? responsavel.nome : "Desconhecido";
  };

  return (
    <div className="ambientes-container">
      <h1>Gestão de Ambientes</h1>
      <button
        className="btn-adicionar"
        onClick={() => {
          setModalOpen(true);
          setAmbientesSelecionados(null);
        }}
      >
        <FaPlus />
      </button>
      <input
        type="text"
        placeholder="Buscar ambiente"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />
      <FaSearch />
      <div className="ambientes-list">
        <div className="table-header">
          <div className="col-header">Número Sala</div>
          <div className="col-header">Descrição</div>
          <div className="col-header">NI</div>
          <div className="col-header">Responsável</div>
          <div className="col-header">Editar</div>
          <div className="col-header">Apagar</div>
        </div>
        {ambientesFiltrados.map((ambiente) => (
          <div className="ambientes-item" key={ambiente.id}>
            <span>{ambiente.num_sala}</span>
            <span>{ambiente.descricao}</span>
            <span>{ambiente.ni}</span>
            <span>{getResponsavelNome(ambiente.responsavel)}</span>
            <button
              className="btn edit"
              onClick={() => {
                setModalOpen(true);
                setAmbientesSelecionados(ambiente);
              }}
            >
              <FaEdit />
            </button>
            <button className="btn delete" onClick={() => apagar(ambiente.id)}>
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
      {modalOpen && (
        <ModalAmbiente
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          ambienteSelecionado={ambientesSelecionados}
          responsaveis={responsaveis}
          criar={criar}
          atualizar={atualizar}
        />
      )}
    </div>
  );
}

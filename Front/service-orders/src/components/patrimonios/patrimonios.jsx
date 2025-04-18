import React, { useState, useEffect } from "react";
import axios from "axios";
import "./patrimonios.css";
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import ModalPatrimonio from "../modalpatrimonio/modalpatrimonio";

export default function Patrimonio() {
  const [dados, setDados] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [patrimonioSelecionados, setPatrimoniosSelecionados] = useState(null);
  const [busca, setBusca] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/patrimonios", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDados(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [token]);

  const atualizar = async (patrimonioAtualizado) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/patrimonios/${patrimonioAtualizado.id}`, 
        patrimonioAtualizado,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDados((prevDados) =>
        prevDados.map((patrimonio) =>
          patrimonio.id === patrimonioAtualizado.id ? patrimonioAtualizado : patrimonio
        )
      );
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar o patrimonio:", error);
    }
  };

  const apagar = async (id) => {
    if (window.confirm("Tem certeza que deseja apagar?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/patrimonios/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDados(dados.filter((patrimonio) => patrimonio.id !== id));
      } catch (error) {
        console.error("Erro ao apagar patrimonio:", error);
      }
    }
  };

  const criar = async (novoPatrimonio) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/patrimonios",
        {
          localizacao: novoPatrimonio.localizacao,
          ni: novoPatrimonio.ni,
          descricao: novoPatrimonio.descricao,
        },
        {
          headers: { Authorization: `Bearer ${token}` }, 
        }
      );
      setDados([...dados, response.data]);
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao criar patrimonio:", error);
    }
  };

  const patrimonioFiltrado = dados.filter((patrimonio) =>
    patrimonio.localizacao.toString().toLowerCase().includes(busca.toLowerCase())
  );  

  return (
    <div className="patrimonio-container">
      <h1>Gestão de patrimonio</h1>
        <button
          className="btn-adicionar"
          onClick={() => {
            setModalOpen(true);
            setPatrimoniosSelecionados(null);
          }}
        >
          <FaPlus />
        </button>
        <input
          type="text"
          placeholder="Buscar patrimonio"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <FaSearch />
      <div className="patrimonio-list">
        <div className="table-header">
            <div className="col-header">Localização</div>
            <div className="col-header">NI</div>
            <div className="col-header">Descrição</div>
            <div className="col-header">Editar</div>
            <div className="col-header">Apagar</div>
          </div>
        {patrimonioFiltrado.length ? (
          patrimonioFiltrado.map((patrimonio) => (
            <div className="patrimonio-item" key={patrimonio.id}>
              <span>{patrimonio.localizacao}</span>
              <span>{patrimonio.ni}</span>
              <span>{patrimonio.descricao}</span>
              <button
                className="btn edit"
                onClick={() => {
                  setModalOpen(true);
                  setPatrimoniosSelecionados(patrimonio);
                }}
              >
                <FaEdit />
              </button>
              <button
                className="btn delete"
                onClick={() => apagar(patrimonio.id)}
              >
                <FaTrash />
              </button>
            </div>
          ))
        ) : (
          <p>Nenhum patrimonio encontrado.</p>
        )}
      </div>
      {modalOpen && (
        <ModalPatrimonio
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          patrimonioSelecionados={patrimonioSelecionados}
          criar={criar}
          atualizar={atualizar}
        />
      )}
    </div>
  );
}
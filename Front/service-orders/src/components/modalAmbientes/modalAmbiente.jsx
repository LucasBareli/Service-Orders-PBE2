import React, { useState, useEffect } from "react";
import "./modalAmbiente.css";

const ModalAmbiente = ({
  isOpen,
  onClose,
  ambienteSelecionado,
  responsaveis,
  criar,
  atualizar,
}) => {
  const [numSala, setNumSala] = useState("");
  const [descricao, setDescricao] = useState("");
  const [ni, setNi] = useState("");
  const [responsavel, setResponsavel] = useState("");

  useEffect(() => {
    if (ambienteSelecionado) {
      setNumSala(ambienteSelecionado.num_sala || "");
      setDescricao(ambienteSelecionado.descricao || "");
      setNi(ambienteSelecionado.ni || "");
      setResponsavel(ambienteSelecionado.responsavel || "");
    } else {
      setNumSala("");
      setDescricao("");
      setNi("");
      setResponsavel("");
    }
  }, [ambienteSelecionado]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoAmbiente = { num_sala: numSala, descricao, ni, responsavel };
    if (ambienteSelecionado) {
      atualizar({ ...ambienteSelecionado, ...novoAmbiente });
    } else {
      criar(novoAmbiente);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>{ambienteSelecionado ? "Editar Ambiente" : "Cadastrar Ambiente"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            value={numSala}
            onChange={(e) => setNumSala(e.target.value)}
            placeholder="Número da Sala"
          />
          <input
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descrição"
          />
          <input
            value={ni}
            onChange={(e) => setNi(e.target.value)}
            placeholder="NI"
          />
          <select
            value={responsavel}
            onChange={(e) => setResponsavel(e.target.value)}
          >
            <option value="">Selecione um responsável</option>
            {responsaveis.map((resp) => (
              <option key={resp.id} value={resp.id}>
                {resp.nome}
              </option>
            ))}
          </select>
          <button type="submit">
            {ambienteSelecionado ? "Atualizar" : "Salvar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalAmbiente;

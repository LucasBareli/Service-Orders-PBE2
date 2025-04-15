import React, { useState, useEffect } from "react";
import "./modalResponsaveis.css";

const ModalResponsavel = ({
  isOpen,
  onClose,
  responsaveisSelecionados,
  ambientes,
  gestores,
  criar,
  atualizar,
}) => {
  const [ni, setNi] = useState("");
  const [nome, setNome] = useState("");
  const [ambiente, setAmbiente] = useState("");
  const [gestor, setGestor] = useState("");

  useEffect(() => {
    if (responsaveisSelecionados) {
      setNi(responsaveisSelecionados.ni || "");
      setNome(responsaveisSelecionados.nome || "");
      setAmbiente(responsaveisSelecionados.ambiente || "");
      setGestor(responsaveisSelecionados.gestor || "");
    } else {
      setNi("");
      setNome("");
      setAmbiente("");
      setGestor("");
    }
  }, [responsaveisSelecionados]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoResponsavel = { ni, nome, ambiente, gestor };
    if (responsaveisSelecionados) {
      atualizar({ ...responsaveisSelecionados, ...novoResponsavel });
    } else {
      criar(novoResponsavel);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>{responsaveisSelecionados ? "Editar Responsável" : "Cadastrar Responsável"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            value={ni}
            onChange={(e) => setNi(e.target.value)}
            placeholder="NI"
          />
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome"
          />
          <select value={ambiente} onChange={(e) => setAmbiente(e.target.value)}>
            <option value="">Selecione um ambiente</option>
            {ambientes.map((amb) => (
              <option key={amb.id} value={amb.id}>
                {amb.nome}
              </option>
            ))}
          </select>
          <select value={gestor} onChange={(e) => setGestor(e.target.value)}>
            <option value="">Selecione um gestor</option>
            {gestores.map((gest) => (
              <option key={gest.id} value={gest.id}>
                {gest.nome}
              </option>
            ))}
          </select>
          <button type="submit">
            {responsaveisSelecionados ? "Atualizar" : "Salvar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalResponsavel;

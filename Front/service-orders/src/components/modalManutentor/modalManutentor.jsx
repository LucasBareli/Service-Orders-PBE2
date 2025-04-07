import React, { useEffect, useState } from "react";
import "./modalManutentor.css";

const modalManutentores = ({
  isOpen,
  onClose,
  manutentorSelecionado,
  criar,
  atualizar,
}) => {
  if (!isOpen) return null;

  console.log("Manutentor Selecionado: ", manutentorSelecionado);

  const [id, setId] = useState(manutentorSelecionado?.id || "");
  const [nome, setNome] = useState(manutentorSelecionado?.nome || "");
  const [area, setArea] = useState(manutentorSelecionado?.area || "");
  const [ni, setNi] = useState(manutentorSelecionado?.ni || "");

  useEffect(() => {
    if (manutentorSelecionado) {
      setId(manutentorSelecionado.id || "");
      setNome(manutentorSelecionado.nome || "");
      setArea(manutentorSelecionado.area || "");
      setNi(manutentorSelecionado.ni || "");
    } else {
      setId("");
      setNome("");
      setArea("");
      setNi("");
    }
  }, [manutentorSelecionado]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoManutentor = {id, nome, area, ni};
    if (manutentorSelecionado) {
      atualizar({ ...manutentorSelecionado, ...novoManutentor });
    } else {
      criar(novoManutentor);
    }
  };
  return (
    <div className="modal-overlay">
      <div className="modal_container">
        <button className="close_button" onClick={onClose}>X</button>
        <h2>{manutentorSelecionado ? "Editar Manutentors" : "Cadastrar Manutentors"}</h2>
        <div className="body_modal">
          <div className="caixa1">
            <form onSubmit={handleSubmit}>
              <input
                className="codigo_modal"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="nome"
              />
              <input
                className="curso_modal"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="area"
              />
              <input
                className="tipo_modal"
                value={ni}
                onChange={(e) => setNi(e.target.value)}
                placeholder="NI"
              />
              <button type="submit">
                {manutentorSelecionado ? "Atualizar" : "Salvar"}
              </button>
            </form>
          </div>
          <div className="caixa2">
          </div>
        </div>
      </div>
    </div>
  );
};

export default modalManutentores;
import React, { useEffect, useState } from "react";
import "./modalGestores.css";

const ModalGestores = ({
  isOpen,
  onClose,
  gestoresSelecionados,
  criar,
  atualizar,
}) => {
  if (!isOpen) return null;

  console.log("Gestor Selecionado: ", gestoresSelecionados);

  const [id, setId] = useState(gestoresSelecionados?.id || "");
  const [nome, setNome] = useState(gestoresSelecionados?.nome || "");
  const [area, setArea] = useState(gestoresSelecionados?.area || "");
  const [cargo, setCargo] = useState(gestoresSelecionados?.area || "");
  const [ni, setNi] = useState(gestoresSelecionados?.ni || "");

  useEffect(() => {
    if (gestoresSelecionados) {
      setId(gestoresSelecionados.id || "");
      setNome(gestoresSelecionados.nome || "");
      setArea(gestoresSelecionados.area || "");
      setArea(gestoresSelecionados.area || "");
      setCargo(gestoresSelecionados.cargo || "");
      setNi(gestoresSelecionados.ni || "");
    } else {
      setId("");
      setNome("");
      setArea("");
      setCargo("");
      setNi("");
    }
  }, [gestoresSelecionados]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoGestor = {id, nome, area, cargo, ni};
    if (gestoresSelecionados) {
      atualizar({ ...gestoresSelecionados, ...novoGestor });
    } else {
      criar(novoGestor);
    }
  };
  return (
    <div className="modal-overlay">
      <div className="modal_container">
        <button className="close_button" onClick={onClose}>X</button>
        <h2>{gestoresSelecionados ? "Editar gestores" : "Cadastrar gestores"}</h2>
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
                className="curso_modal"
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                placeholder="cargo"
              />
              <input
                className="tipo_modal"
                value={ni}
                onChange={(e) => setNi(e.target.value)}
                placeholder="ni"
              />
              <button type="submit">
                {gestoresSelecionados ? "Atualizar" : "Salvar"}
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

export default ModalGestores;
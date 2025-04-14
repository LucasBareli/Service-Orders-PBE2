import React, { useEffect, useState } from "react";
import "./modalManutentor.css";

const ModalManutentores = ({
  isOpen,
  onClose,
  manutentoresSelecionados,
  criar,
  atualizar,
}) => {
  if (!isOpen) return null;

  console.log("Manutentor Selecionado: ", manutentoresSelecionados);

  const [id, setId] = useState(manutentoresSelecionados?.id || "");
  const [nome, setNome] = useState(manutentoresSelecionados?.nome || "");
  const [area, setArea] = useState(manutentoresSelecionados?.area || "");
  const [ni, setNi] = useState(manutentoresSelecionados?.ni || "");

  useEffect(() => {
    if (manutentoresSelecionados) {
      setId(manutentoresSelecionados.id || "");
      setNome(manutentoresSelecionados.nome || "");
      setArea(manutentoresSelecionados.area || "");
      setNi(manutentoresSelecionados.ni || "");
    } else {
      setId("");
      setNome("");
      setArea("");
      setNi("");
    }
  }, [manutentoresSelecionados]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoManutentor = {id, nome, area, ni};
    if (manutentoresSelecionados) {
      atualizar({ ...manutentoresSelecionados, ...novoManutentor });
    } else {
      criar(novoManutentor);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal_container">
        <button className="close_button" onClick={onClose}>X</button>
        <h2>{manutentoresSelecionados ? "Editar manutentores" : "Cadastrar manutentores"}</h2>
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
                placeholder="ni"
              />
              <button type="submit">
                {manutentoresSelecionados ? "Atualizar" : "Salvar"}
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

export default ModalManutentores;
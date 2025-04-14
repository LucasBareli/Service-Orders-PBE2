import React, { useEffect, useState } from "react";
import "./modalPatrimonio.css";

const ModalPatrimonio = ({
  isOpen,
  onClose,
  patrimonioSelecionados,
  criar,
  atualizar,
}) => {
  if (!isOpen) return null;

  console.log("Patrimonio Selecionado: ", patrimonioSelecionados);

  const [id, setId] = useState(patrimonioSelecionados?.id || "");
  const [localizacao, setLocalizacao] = useState(patrimonioSelecionados?.localizacao || "");
  const [ni, setNi] = useState(patrimonioSelecionados?.ni || "");
  const [descricao, setDescricao] = useState(patrimonioSelecionados?.descricao || "");

  useEffect(() => {
    if (patrimonioSelecionados) {
      setId(patrimonioSelecionados.id || "");
      setLocalizacao(patrimonioSelecionados.localizacao || "");
      setNi(patrimonioSelecionados.ni || "");
      setDescricao(patrimonioSelecionados.descricao || "");
    } else {
      setId("");
      setLocalizacao("");
      setNi("");
      setDescricao("");
    }
  }, [patrimonioSelecionados]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoPatrimonio = {id, localizacao, ni, descricao};
    if (patrimonioSelecionados) {
      atualizar({ ...patrimonioSelecionados, ...novoPatrimonio });
    } else {
      criar(novoPatrimonio);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal_container">
        <button className="close_button" onClick={onClose}>X</button>
        <h2>{patrimonioSelecionados ? "Editar patrimonio" : "Cadastrar patrimonio"}</h2>
        <div className="body_modal">
          <div className="caixa1">
            <form onSubmit={handleSubmit}>
              <input
                className="codigo_modal"
                value={localizacao}
                onChange={(e) => setLocalizacao(e.target.value)}
                placeholder="localizacao"
              />
              <input
                className="curso_modal"
                value={ni}
                onChange={(e) => setNi(e.target.value)}
                placeholder="ni"
              />
              <input
                className="tipo_modal"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="descricao"
              />
              <button type="submit">
                {patrimonioSelecionados ? "Atualizar" : "Salvar"}
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

export default ModalPatrimonio;
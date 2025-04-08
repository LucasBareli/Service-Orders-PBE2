import React, { useEffect, useState } from "react";
import "./modalOrdem.css";

const ModalOrdemServico = ({
  isOpen,
  onClose,
  ordemServicoSelecionados,
  criar,
  atualizar,
}) => {
  if (!isOpen) return null;

  const [descricao, setDescricao] = useState(ordemServicoSelecionados?.descricao || "");
  const [status, setStatus] = useState(ordemServicoSelecionados?.status || "");
  const [prioridade, setPrioridade] = useState(ordemServicoSelecionados?.prioridade || "");

  useEffect(() => {
    if (ordemServicoSelecionados) {
      setDescricao(ordemServicoSelecionados.descricao || "");
      setStatus(ordemServicoSelecionados.status || "");
      setPrioridade(ordemServicoSelecionados.prioridade || "");
    } else {
      setDescricao("");
      setStatus("");
      setPrioridade("");
    }
  }, [ordemServicoSelecionados]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const novaOrdem = { descricao, status, prioridade };

    if (ordemServicoSelecionados) {
      atualizar({ ...ordemServicoSelecionados, ...novaOrdem });
    } else {
      criar(novaOrdem);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>{ordemServicoSelecionados ? "Editar Ordem de Serviço" : "Criar Ordem de Serviço"}</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="descricao">Descrição</label>
            <input
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descrição"
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <input
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              placeholder="Status"
            />
          </div>
          <div className="form-group">
            <label htmlFor="prioridade">Prioridade</label>
            <input
              id="prioridade"
              value={prioridade}
              onChange={(e) => setPrioridade(e.target.value)}
              placeholder="Prioridade"
            />
          </div>
          <button type="submit" className="submit-button">
            {ordemServicoSelecionados ? "Atualizar" : "Salvar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalOrdemServico;

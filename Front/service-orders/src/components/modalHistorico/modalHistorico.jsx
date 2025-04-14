import React, { useEffect, useState } from "react";
import "./modalHistorico.css";

const ModalHistorico = ({
  isOpen,
  onClose,
  historicoSelecionado,
  criar,
  atualizar,
  ordens, 
}) => {
  if (!isOpen) return null;

  

  const [id, setId] = useState(historicoSelecionado?.id || "");
  const [ordem, setOrdem] = useState(historicoSelecionado?.ordem || "");
  const [data_encerramento, setData_encerramento] = useState(
    historicoSelecionado?.data_encerramento || ""
  );
  const [descricao_manutencao, setDescricao_manutencao] = useState(
    historicoSelecionado?.descricao_manutencao || ""
  );

  useEffect(() => {
    if (historicoSelecionado) {
      setId(historicoSelecionado.id || "");
      setOrdem(historicoSelecionado.ordem || "");
      setData_encerramento(historicoSelecionado.data_encerramento || "");
      setDescricao_manutencao(historicoSelecionado.descricao_manutencao || "");
    } else {
      setId("");
      setOrdem("");
      setData_encerramento("");
      setDescricao_manutencao("");
    }
  }, [historicoSelecionado]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoHistorico = {
      id,
      ordem,
      data_encerramento,
      descricao_manutencao,
    };
    if (historicoSelecionado) {
      atualizar({ ...historicoSelecionado, ...novoHistorico });
    } else {
      criar(novoHistorico);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal_container">
        <button className="close_button" onClick={onClose}>
          X
        </button>
        <h2>
          {historicoSelecionado
            ? "Editar Histórico"
            : "Cadastrar Histórico"}
        </h2>
        <div className="body_modal">
          <div className="caixa1">
            <form onSubmit={handleSubmit}>
              <select
                className="codigo_modal"
                value={ordem}
                onChange={(e) => setOrdem(e.target.value)}
              >
                <option value="">Selecione uma ordem</option>
                {ordens.map((ordemItem) => (
                  <option key={ordemItem.id} value={ordemItem.id}>
                    {ordemItem.nome}
                  </option>
                ))}
              </select>

              <input
                className="curso_modal"
                type="datetime-local"
                value={data_encerramento}
                onChange={(e) => setData_encerramento(e.target.value)}
                placeholder="Data de Encerramento"
              />

              <textarea
                className="tipo_modal"
                value={descricao_manutencao}
                onChange={(e) => setDescricao_manutencao(e.target.value)}
                placeholder="Descrição da Manutenção"
              />

              <button type="submit">
                {historicoSelecionado ? "Atualizar" : "Salvar"}
              </button>
            </form>
          </div>
          <div className="caixa2"></div>
        </div>
      </div>
    </div>
  );
};

export default ModalHistorico;

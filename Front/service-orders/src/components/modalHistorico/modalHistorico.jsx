import React, { useEffect, useState } from "react";
import "./modalCursos.css";

const ModalHistorico = ({
  isOpen,
  onClose,
  historicoSelecionado,
  criar,
  atualizar,
}) => {
  if (!isOpen) return null;

  console.log("Curso Selecionado: ", historicoSelecionado);

  const [id, setId] = useState(historicoSelecionado?.id || "");
  const [ordem, setOrdem] = useState(historicoSelecionado?.ordem || "");
  const [data_encerramento, setData_encerramento] = useState(historicoSelecionado?.data_encerramento || "");
  const [descricao_manutencao, setDescricao_manutencao] = useState(historicoSelecionado?.descricao_manutencao || "");

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
    const novoHistorico = {id, ordem, data_encerramento, descricao_manutencao};
    if (historicoSelecionado) {
      atualizar({ ...historicoSelecionado, ...novoHistorico });
    } else {
      criar(novoHistorico);
    }
  };
//parei aqui 
  return (
    <div className="modal-overlay">
      <div className="modal_container">
        <button className="close_button" onClick={onClose}>X</button>
        <h2>{historicoSelecionado ? "Editar cursos" : "Cadastrar cursos"}</h2>
        <div className="body_modal">
          <div className="caixa1">
            <form onSubmit={handleSubmit}>
              <input
                className="codigo_modal"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                placeholder="codigo"
              />
              <input
                className="curso_modal"
                value={curso}
                onChange={(e) => setCurso(e.target.value)}
                placeholder="curso"
              />
              <input
                className="tipo_modal"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                placeholder="Tipo"
              />
              <input
                className="ha_modal"
                value={ha}
                onChange={(e) => setHa(e.target.value)}
                placeholder="Horas/Aula"
              />
              <input
                className="sigla_modal"
                value={sigla}
                onChange={(e) => setSigla(e.target.value)}
                placeholder="Sigla"
              />
              <button type="submit">
                {historicoSelecionado ? "Atualizar" : "Salvar"}
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

export default ModalHistorico;
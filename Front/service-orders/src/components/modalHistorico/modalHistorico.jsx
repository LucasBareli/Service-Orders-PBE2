import React, { useEffect, useState } from "react";
import axios from "axios";
import "./modalHistorico.css";

const ModalHistorico = ({
  isOpen,
  onClose,
  historicoSelecionado,
  criar,
  atualizar,
  ordens,
  setOrdens
}) => {
  if (!isOpen) return null;
  const [id, setId] = useState(historicoSelecionado?.id || "");
  // const [ordem, setOrdem] = useState(historicoSelecionado?.ordem || "");
  const [data_encerramento, setData_encerramento] = useState(
    historicoSelecionado?.data_encerramento || ""
  );
  const [descricao_manutencao, setDescricao_manutencao] = useState(
    historicoSelecionado?.descricao_manutencao || ""
  );
  const [dadosOrdem, setDadosOrdens] = useState([])
  const token = localStorage.getItem("token")

  useEffect(() => {
    if (historicoSelecionado) {
      setId(historicoSelecionado.id || "");
      setData_encerramento(historicoSelecionado.data_encerramento || "");
      setDescricao_manutencao(historicoSelecionado.descricao_manutencao || "");
    } else {
      setId("");
      setData_encerramento("");
      setDescricao_manutencao("");
    }

    const carregarOrdens = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/ordemservico", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDadosOrdens(response.data);

      } catch (error) {
        console.error("Erro ao buscar ordens de serviço:", error);
      }
    };

    carregarOrdens()
  }, [historicoSelecionado]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoHistorico = {
      id,
      ordem: ordens,
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
                value={ordens}
                onChange={(e) => setOrdens(e.target.value)}
              >
                <option value="">Selecione uma ordem</option>
                {dadosOrdem.map((ordemItem) => (
                  <option key={ordemItem.id} value={ordemItem.id}>
                    {ordemItem.descricao}
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

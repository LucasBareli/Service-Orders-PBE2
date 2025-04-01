import React, { useState } from "react";
import "./signup.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const cadastrar = async () => {
    if (password !== passwordConfirm) {
      alert("Passwords não coincidem!");
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/signup', 
        { 
          username: user,
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      console.log("Usuário cadastrado com sucesso", response.data);
      navigate('/');
    } catch (error) {
      console.error("Erro ao cadastrar: ", error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.detail || 'Erro desconhecido.');
      } else {
        setErrorMessage('Erro na requisição.');
      }
    }
  };

  return (
    <div className="container-login">
      <h1>Cadastro</h1>

      {errorMessage && <div className="error">{errorMessage}</div>}

      <input
        className="caixa"
        value={user}
        onChange={(e) => { setUser(e.target.value) }}
        placeholder="Nome de Usuário"
      />

      <input
        className="caixa"
        value={email}
        onChange={(e) => { setEmail(e.target.value) }}
        placeholder="Email"
        type="email"
      />

      <input
        className="caixa"
        value={password}
        onChange={(e) => { setPassword(e.target.value) }}
        placeholder="Senha"
        type="password"
      />

      <input
        className="caixa"
        value={passwordConfirm}
        onChange={(e) => { setPasswordConfirm(e.target.value) }}
        placeholder="Confirme a Senha"
        type="password"
      />

      <button className="btn" onClick={cadastrar}>
        Cadastrar
      </button>
    </div>
  );
}

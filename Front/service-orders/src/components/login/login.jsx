import React, { useState } from "react";
import "./login.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const logar = async () => {
    console.log("XXXXXXXX", user, password);
    
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/token/',
        {
          username: user,
          password: password
        }
      );
      console.log("TokenLogin: ", response.data.access);
      localStorage.setItem('token', response.data.access);
      navigate('/home');
    } catch (error) {
      console.error(error);
    }
  };

  const irParaCadastro = () => {
    navigate('/signup');
  };

  return (
    <div className="container-login">
      <h1>Login</h1>

      <input
        className="caixa"
        value={user}
        onChange={(e) => { setUser(e.target.value); }}
        placeholder="User"
      />

      <input
        className="caixa"
        value={password}
        onChange={(e) => { setPassword(e.target.value); }}
        placeholder="Password"
        type="password"
      /> <br />

      <button className="btn" onClick={logar}>
        Enter
      </button> <br />

      <button className="btn" onClick={irParaCadastro}>
        Sign Up
      </button>

    </div>
  );
}
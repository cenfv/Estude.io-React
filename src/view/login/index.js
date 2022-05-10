import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./login.css";
import { Spinner } from "react-bootstrap";

import GoogleIcon from "../../assets/google_icon.png";
import FacebookIcon from "../../assets/facebook_icon.png";

import firebase from "../../config/firebase";
import "firebase/auth";
import { Redirect } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [carregando, setCarregando] = useState(0);

  const dispatch = useDispatch();
  function auth() {
    setCarregando(1);

    firebase
      .auth()
      .signInWithEmailAndPassword(email, senha)
      .then((resultado) => {
        dispatch({ type: "LOGIN", usuarioEmail: email });
        setCarregando(0);
      })
      .catch((erro) => {
        alert(erro);
        setCarregando(0);
      });
  }

  return (
    <>
      {useSelector((state) => state.usuarioLogado) > 0 ? (
        <Redirect to="/anotacoes" />
      ) : null}
      <div className="container__principal">
        <div className="div__login">
          <div className="div__titulo">
            <h2>Entrar</h2>
          </div>
          <div className="div__inputs">
            <h5>Email</h5>
            <input
              type="text"
              className="form-control input"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <h5>Senha</h5>
            <input
              type="password"
              className="form-control input"
              id="senha"
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <div className="esqueceu__senha">
            <p className="esqueceu__senha">Esqueceu sua senha?</p>
          </div>
          {carregando ? (
            <Spinner variant="primary" animation="border" role="status">
              <span className="visually-hidden">Carregando...</span>
            </Spinner>
          ) : (
            <a>
              <button className="main__acessar" onClick={auth}>
                Acessar
              </button>
            </a>
          )}

          <div className="div__social">
            <a>
              <button className="entrar__google">
                <img src={GoogleIcon} className="icone__social" /> Entrar com o{" "}
                <b>Google</b>
              </button>
            </a>
            <a>
              <button className="entrar__facebook">
                <img src={FacebookIcon} className="icone__social" /> Entrar com
                o <b>Facebook</b>
              </button>
            </a>
          </div>
          <span className="criar__conta">
            Não possui uma conta?{" "}
            <span className="criar__conta" style={{ color: "#2C7AED" }}>
              <b>Crie uma conta agora</b>
            </span>
          </span>
        </div>
      </div>
    </>
  );
}

export default Login;

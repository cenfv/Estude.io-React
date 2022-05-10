import React, { useState, useEffect } from "react";
import NavBar from "../../components/navbar-dashboard";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import "./dashboard-home.css";
import { Link } from "react-router-dom";

function DashboardHome() {
  const dispatch = useDispatch();

  function sair() {
    dispatch({ type: "LOGOUT" });
  }

  const usuarioEmail = useSelector((state) => state.usuarioEmail);
  return (
    <>
      {useSelector((state) => state.usuarioLogado) == 0 ? (
        <Redirect to="/" />
      ) : null}
      <NavBar paginaSelecionada="home" sair={sair} />
      <div className="home-content">
        {usuarioEmail && <h2>Olá, seja bem-vindo {usuarioEmail}</h2>}
      </div>
    </>
  );
}

export default DashboardHome;

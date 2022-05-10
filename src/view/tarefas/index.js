import React, { useState, useEffect } from "react";
import NavBar from "../../components/navbar-dashboard";
import "./tarefas.css";
import firebase from "../../config/firebase";
import { useSelector } from "react-redux";

import Tarefa from "../../components/tarefa";
import CadastrarTarefa from "../../components/cadastrarTarefa";

const db = firebase.firestore();

function Tarefas() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const usuarioEmail = useSelector((state) => state.usuarioEmail);
  const [tarefas, setTarefas] = useState([]);
  const listaTarefas = [];

  useEffect(() => {
    db.collection("tarefas")
      .where("usuario", "==", usuarioEmail)
      .get()
      .then(async (res) => {
        await res.docs.forEach((doc) => {
          listaTarefas.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setTarefas(listaTarefas);
      });
  });

  return (
    <>
      <NavBar
        paginaSelecionada="tarefas"
        btnTexto="Tarefa"
        criar={handleShow}
      />
      <div className="tarefas-content">
        {tarefas.map((item) => (
          <Tarefa item={item} />
        ))}
      </div>
      {show && <CadastrarTarefa open={handleShow} close={handleClose} />}
    </>
  );
}

export default Tarefas;

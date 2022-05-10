import React, { useState, useEffect } from "react";
import NavBar from "../../components/navbar-dashboard";
import "./anotacoes.css";
import firebase from "../../config/firebase";
import { useSelector } from "react-redux";

import Anotacao from "../../components/anotacao";
import CadastrarAnotacao from "../../components/cadastrarAnotacao";

const db = firebase.firestore();

function Anotacoes() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const usuarioEmail = useSelector((state) => state.usuarioEmail);
  const [anotacoes, setAnotacoes] = useState([]);
  const listaAnotacoes = [];
  
  useEffect(() => {
    db.collection("anotacoes")
      .where("usuario", "==", usuarioEmail)
      .get()
      .then(async (res) => {
        await res.docs.forEach((doc) => {
          listaAnotacoes.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setAnotacoes(listaAnotacoes);
      });
  });


  return (
    <>
      <NavBar
        paginaSelecionada="anotacoes"
        btnTexto="Anotação"
        criar={handleShow}
      />
      <div className="tarefas-content">
      {anotacoes.map((item) => (
          <Anotacao item={item} />
        ))}
      </div>
      {
        show && <CadastrarAnotacao open={handleShow} close={handleClose}/>
      }
      
    </>
  );
}

export default Anotacoes;

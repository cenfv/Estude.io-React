import React, { useState, useEffect } from "react";
import NavBar from "../../components/navbar-dashboard";
import "./livros.css";
import firebase from "../../config/firebase";
import { useSelector } from "react-redux";

import CadastrarLivro from "../../components/cadastrarLivro";
import Livro from "../../components/livro";

const db = firebase.firestore();

function Livros() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const usuarioEmail = useSelector((state) => state.usuarioEmail);
  const [livros, setLivros] = useState([]);
  const listaLivros = [];

  useEffect(() => {
    db.collection("livros")
      .where("usuario", "==", usuarioEmail)
      .get()
      .then(async (res) => {
        await res.docs.forEach((doc) => {
          listaLivros.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setLivros(listaLivros);
      });
  });

  return (
    <>
      <NavBar paginaSelecionada="livros" btnTexto="Livro" criar={handleShow} />
      <div className="livros-content2">
        {livros.map((item) => (
          <Livro item={item} />
        ))}
      </div>

      {show && <CadastrarLivro open={handleShow} close={handleClose} />}
    </>
  );
}

export default Livros;

import React, { useState, useEffect } from "react";
import { Modal, Button, Spinner, Alert } from "react-bootstrap";
import firebase from "../../config/firebase";
import { useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import "./cadastrarLivro.css";
import axios from "axios";
const db = firebase.firestore();

function ModalLivro(props) {
  const usuarioEmail = useSelector((state) => state.usuarioEmail);
  const [show, setShow] = useState(true);

  const [livros, setLivros] = useState([]);
  const [pesquisa, setPesquisa] = useState("");

  function cadastrarLivro(livro) {
    db.collection("livros")
      .add({
        titulo: livro.volumeInfo.title,
        url: livro.volumeInfo.imageLinks.thumbnail,
        usuario: usuarioEmail,
        criacao: new Date(),
      })
      .then((res) => {})
      .catch((error) => {
        alert(error);
      });
  }

  const api = axios.create({
    baseURL: "https://www.googleapis.com/books/v1/volumes?q=",
  });

  function carregarLivros(titulo) {
    api
      .get(titulo)
      .then((res) => {
        setLivros(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="modal">
      <Modal show={show} onHide={props.close}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Livro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="div-livro">
            <input
              type="text"
              className="form-control input__livro"
              onChange={(e) => setPesquisa(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-primary btn__livro"
              onClick={() => carregarLivros(pesquisa)}
            >
              <BsSearch />
            </button>
          </div>
          <div className="livros-content">
            {livros.map((l, index) => {
              return(
                l.volumeInfo.imageLinks ? <div
                className="livro-content"
                onClick={() => {
                  cadastrarLivro(l);
                  livros.splice(index, 1);
                  const listaLivros = [];
                  setLivros(livros);
                  livros.forEach((livro)=>{
                    listaLivros.push(livro);
                  });
                  setLivros(listaLivros);
                }}
              >
                {l.volumeInfo.title && <h5>{l.volumeInfo.title}</h5>}
                {l.volumeInfo.imageLinks.thumbnail && <img src={l.volumeInfo.imageLinks.thumbnail}></img>}
              </div> : null
              
            )})}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.close}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalLivro;

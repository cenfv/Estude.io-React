import React, { useState, useEffect } from "react";
import { Modal, Button, Spinner, Alert } from "react-bootstrap";
import firebase from "../../config/firebase";
import { useSelector } from "react-redux";

const db = firebase.firestore();

function ModalAnotacao(props) {
  const usuarioEmail = useSelector((state) => state.usuarioEmail);
  const [show, setShow] = useState(true);

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  function cadastrarAnotacao() {
    db.collection("anotacoes")
      .add({
        titulo: titulo,
        descricao: descricao,
        usuario: usuarioEmail,
        criacao: new Date(),
      })
      .then((res) => {
        alert("Cadastrado com sucesso!");
        props.close();
      })
      .catch((error) => {
        alert(error);
      });
  }

  function atualizar(id) {
    if(id){
        db.collection("anotacoes")
        .doc(id)
        .update({
            titulo: titulo,
            descricao: descricao,
            usuario: usuarioEmail,
            criacao: new Date(),
        })
        .then(() => {
            alert("Atualização realiza com sucesso")
            props.close();
        })
        .catch((error) => {});
    }
  }


  useEffect(() => {
    props.item ? setTitulo(props.item.titulo) : setTitulo("");
    props.item ? setDescricao(props.item.descricao) : setDescricao("");
  }, []);

  return (
    <div className="modal">
      <Modal show={show} onHide={props.close}>
        <Modal.Header closeButton>
          {props.item ? (
            <Modal.Title>Alterar Anotação</Modal.Title>
          ) : (
            <Modal.Title>Criar Anotação</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <div className="my-2">
            Titulo da Anotação
            <input
              type="text"
              className="form-control"
              id="tituloAnotacao"
              onChange={(e) => setTitulo(e.target.value)}
              value={props.item && titulo}
            />
          </div>
          <div className="my-2">
            Conteúdo da Anotação
            <textarea
              className="form-control"
              id="textoAnotacao"
              onChange={(e) => setDescricao(e.target.value)}
              value={props.item && descricao}
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.close}>
            Fechar
          </Button>
          <Button
            variant="primary"
            onClick={props.item ? ()=> {atualizar(props.item.id)} : cadastrarAnotacao}
          >
            Salvar alterações
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalAnotacao;

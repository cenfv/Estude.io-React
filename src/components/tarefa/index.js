import React, { useState,useEffect } from "react";
import "./tarefa.css";
import { BsThreeDotsVertical } from "react-icons/bs";

import firebase from "../../config/firebase";
import ModalTarefa from "../../components/cadastrarTarefa";
const db = firebase.firestore();
var id;

function Tarefa(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [horaFormatada, setHoraFormatada] = useState("00:00");

  var data = new Date(props.item.dataHoraEntrega.toDate());
  id = props.item.id;

  function adicionaZero(numero) {
    if (numero <= 9) return "0" + numero;
    else return numero;
  }

  var rand = Math.floor(Math.random() * 360);
  function excluir(id) {
    if (id) {
      db.collection("tarefas")
        .doc(id)
        .delete()
        .then(() => {
          alert("Deletado com sucesso!");
        })
        .catch((err) => console.log(err));
    }
  }
  useEffect(()=>{
    props.item &&
    setHoraFormatada(
      adicionaZero(data.getHours()) + ":" + adicionaZero(data.getMinutes())
    );
  },[])
  
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="title-btn">
            <h3
              className="card-title"
              style={{ fontWeight: "700", marginTop: 8 }}
            >
              {props.item.materia}
            </h3>
            <button
              className="btn btnDetalhes"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
            >
              <BsThreeDotsVertical />
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li className="dropdown-item" onClick={handleShow}>
                Alterar
              </li>
              <li
                className="dropdown-item"
                onClick={() => {
                  excluir(props.item.id);
                }}
              >
                Excluir
              </li>
            </ul>
          </div>

          <div
            className="div-marcacao"
            style={{ backgroundColor: "hsl(" + rand + ", 84%, 55%)" }}
          ></div>
          <h5
            className="card-title"
            style={{ fontWeight: "700", marginTop: -4 }}
          >
            {props.item.titulo}
          </h5>
          <p className="card-text">{props.item.descricao}</p>
        </div>
        <p className="data-hora">
          Data de entrega:{" "}
          <b>
            {data.toLocaleDateString()} às {horaFormatada}{" "}
          </b>
        </p>
      </div>
      {show == true && (
        <ModalTarefa item={props.item} close={handleClose} show={handleShow} />
      )}
    </>
  );
}

export default Tarefa;

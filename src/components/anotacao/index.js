import React,{useState} from "react";
import "./anotacao.css";
import { BsThreeDotsVertical } from "react-icons/bs";


import firebase from "../../config/firebase";
import ModalAnotacao from "../../components/cadastrarAnotacao";
const db = firebase.firestore();
var id;

function Tarefa(props) {

  function excluir(id) {
    if(id){
      db.collection("anotacoes")
      .doc(id)
      .delete()
      .then(() => {
        alert("Deletado com sucesso!");
      })
      .catch((err) => console.log(err));
    }
   
  }

  id = props.item.id;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="title-btn">
            <h5
              className="card-title"
              style={{ fontWeight: "700", marginTop: 8 }}
            >
              {props.item.titulo}
            </h5>
            <button
              className="btn btnDetalhes"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
            >
              <BsThreeDotsVertical />
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li className="dropdown-item" onClick={handleShow}>Alterar</li>
              <li className="dropdown-item" onClick={()=>{excluir(props.item.id)}}>
                Excluir
              </li>
            </ul>
          </div>
          <p className="card-text">{props.item.descricao}</p>
        </div>
      </div>
      {show == true && <ModalAnotacao item={props.item} close={handleClose} show={handleShow} />}
    </>
  );
}

export default Tarefa;

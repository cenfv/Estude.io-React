import React, { useState, useEffect } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import "./livro.css";

import firebase from "../../config/firebase";
const db = firebase.firestore();
var id;

function Livro(props) {
  id = props.item.id;

  function excluir(id) {
    if (id) {
      db.collection("livros")
        .doc(id)
        .delete()
        .then(() => {
          alert("Deletado com sucesso!");
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <>
      <div className="livros-content">
        <div className="livro-content">
          <div style={{display:"flex",alignItems:"center",justifyContent:"center", marginBottom: 8}}>
            {props.item.titulo && <h5 style={{marginTop:0,marginRight: 8}}>{props.item.titulo}</h5>}
            <BsFillTrashFill onClick={()=>excluir(props.item.id)}/>
          </div>
          {props.item.url && <img src={props.item.url}></img>}
        </div>
      </div>
    </>
  );
}

export default Livro;

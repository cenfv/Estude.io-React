import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Spinner,
  Alert,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import firebase from "../../config/firebase";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";

const db = firebase.firestore();

function ModalTarefa(props) {
  const usuarioEmail = useSelector((state) => state.usuarioEmail);
  const [show, setShow] = useState(true);

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [materia, setMateria] = useState("Selecione uma disciplina");
  const [startDate, setStartDate] = useState(new Date());
  const [horario, setHorario] = useState();
  const [horaFormatada, setHoraFormatada] = useState("00:00");

  const materias = [
    "Desenvolvimento Web 1",
    "Programação Desktop",
    "Teste De Software",
    "Teoria da computação",
    "Redes de computadores",
  ];

  function cadastrarTarefa() {
    var horarioAux;
    horarioAux = horario.split(":", 2);
    startDate.setHours(horarioAux[0], horarioAux[1], 0);

    db.collection("tarefas")
      .add({
        titulo: titulo,
        descricao: descricao,
        usuario: usuarioEmail,
        materia: materia,
        dataHoraEntrega: startDate,
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
    var horarioAux;
    horarioAux = horario.split(":", 2);
    startDate.setHours(horarioAux[0], horarioAux[1], 0);
    if (id) {
      db.collection("tarefas")
        .doc(id)
        .update({
          titulo: titulo,
          descricao: descricao,
          usuario: usuarioEmail,
          materia: materia,
          dataHoraEntrega: startDate,
          criacao: new Date(),
        })
        .then(() => {
          alert("Atualização realiza com sucesso");
          props.close();
        })
        .catch((error) => {});
    }
  }

  function adicionaZero(numero) {
    if (numero <= 9) return "0" + numero;
    else return numero;
  }

  useEffect(() => {
    if (props.item) {
      var data = new Date(props.item.dataHoraEntrega.toDate());
    }
    props.item ? setTitulo(props.item.titulo) : setTitulo("");
    props.item ? setDescricao(props.item.descricao) : setDescricao("");
    props.item && setStartDate(data);
    props.item &&
      setHoraFormatada(
        adicionaZero(data.getHours()) + ":" + adicionaZero(data.getMinutes())
      );
    props.item && setMateria(props.item.materia);
    props.item && setHorario(horaFormatada);
  }, []);

  return (
    <div className="modal">
      <Modal show={show} onHide={props.close}>
        <Modal.Header closeButton>
          {props.item ? (
            <Modal.Title>Alterar Tarefa</Modal.Title>
          ) : (
            <Modal.Title>Criar Tarefa</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <div className="my-2">
            Titulo da Tarefa
            <input
              type="text"
              className="form-control"
              id="tituloTarefa"
              onChange={(e) => setTitulo(e.target.value)}
              value={props.item && titulo}
            />
          </div>
          <div className="my-2">
            Conteúdo da Tarefa
            <textarea
              className="form-control"
              id="textoTarefa"
              onChange={(e) => setDescricao(e.target.value)}
              value={props.item && descricao}
            ></textarea>
          </div>
          <div className="my-2">
            Disciplina
            <DropdownButton
              variant="secondary"
              id="dropdown-basic-button"
              title={materia}
            >
              {materias.map((materia) => {
                return (
                  <Dropdown.Item
                    onClick={() => {
                      setMateria(materia);
                    }}
                  >
                    {materia}
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
          </div>
          <div className="my-2">
            Data de entrega
            <DatePicker
              dateFormat="P"
              locale={ptBR}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div className="my-2">
            Horário de entrega
            <br />
            <input
              type="time"
              id="appt"
              name="appt"
              value={props.item ? horaFormatada : horario}
              onChange={(e) => {
                setHorario(e.target.value);
                setHoraFormatada(e.target.value);
              }}
              required
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.close}>
            Fechar
          </Button>
          <Button
            variant="primary"
            onClick={
              props.item
                ? () => {
                    atualizar(props.item.id);
                  }
                : cadastrarTarefa
            }
          >
            Salvar alterações
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalTarefa;

import React, { useEffect } from "react";
import axios from "axios";
import Header from "../header/header";
import {
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import * as ReactBootStrap from "react-bootstrap";

const Detalle_ticket = () => {
  const url_ticket = "http://localhost:8000/api/tickets/";

  const [tickets, set_tickets] = React.useState([]);

  const [modal_canjear, set_modal_canjear] = React.useState(false);

  const { id } = useParams();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setLoading(true);

    get_ticket();
  }, []);

  const get_ticket = async () => {
    await axios
      .get(url_ticket + id)
      .then((response) => {
        set_tickets(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
    setLoading(false);
  };

  const fecha_formateada = (ticket) => {
    if (ticket) {
      let una_fecha = ticket.split("-");
      una_fecha = una_fecha[2] + "-" + una_fecha[1] + "-" + una_fecha[0];
      return una_fecha;
    }
    return null;
  };

  const canjear = async () => {
    await axios
      .patch(url_ticket + id + "/", { canjeado: true })
      .then((response) => {})
      .catch((error) => {
        console.log(error.message);
      });
      setLoading(false);
  };

  return (
    <>
      {Header()}
      <div>
        <Breadcrumb tag="nav" listTag="div">
          <BreadcrumbItem tag="a" href="/home">
            Comedor
          </BreadcrumbItem>
          <BreadcrumbItem active tag="span">
            Detalle ticket
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      <main>
        <h1 className="text-center mt-5 mb-5">Detalle ticket</h1>

        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="col-3">
              <div className="d-flex justify-content-center mb-4">
                <ReactBootStrap.Spinner animation="border"></ReactBootStrap.Spinner>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-center">
              <ReactBootStrap.Card
                border="secondary"
                className="mb-4"
                style={{ width: "18rem" }}
              >
                <ReactBootStrap.Card.Header className="h4">
                  DNI del cliente: {tickets.user.dni}
                </ReactBootStrap.Card.Header>
                <ReactBootStrap.Card.Header className="h5">
                  Nombre: {tickets.user.first_name+' ' + tickets.user.last_name
                  }
                </ReactBootStrap.Card.Header>
                <ReactBootStrap.ListGroup variant="flush" className="h5">
                  <ReactBootStrap.ListGroup.Item >
                    Fecha: {fecha_formateada(tickets.date)}
                  </ReactBootStrap.ListGroup.Item>
                  <ReactBootStrap.ListGroup.Item >
                    Menú: {tickets.menu.name}
                  </ReactBootStrap.ListGroup.Item>
                  <ReactBootStrap.ListGroup.Item >
                    Modalidad: {tickets.take_away ? "Vianda" : "Comedor"}
                  </ReactBootStrap.ListGroup.Item>
                  <ReactBootStrap.ListGroup.Item >
                    Sede: {tickets.campus.name}
                  </ReactBootStrap.ListGroup.Item>
                </ReactBootStrap.ListGroup>
              </ReactBootStrap.Card>
            </div>
          </>
        )}

        {loading ? (
          ""
        ) : (
          <div className="d-flex justify-content-center mt-4">
            <Link to={"/tickets/canjear"}>
              <button className="btn btn-secondary me-3">Cancelar</button>
            </Link>
            <button
              className="btn btn-primary ms-3"
              onClick={() => {
                setLoading(true);
                canjear();
                set_modal_canjear(true);
              }}
            >
              Canjear
            </button>
          </div>
        )}
      </main>

      <Modal isOpen={modal_canjear} className="modal-dialog-centered">
        <ModalBody>
          <div className="mt-4 row justify-content-center">
            <div className="col text-center">
              <FontAwesomeIcon
                icon={faCheckCircle}
                color={"#6BC04B"}
                className="fa-3x"
              />
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col text-center">
              <p className="mt-4 fs-4">El ticket se ha canjeado con éxito</p>
            </div>
          </div>
        </ModalBody>

        <ModalFooter className="d-flex justify-content-center">
          <Link to="/tickets/canjear">
            <button className="btn btn-primary">Aceptar</button>
          </Link>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Detalle_ticket;

import "./pagar_tickets.css";
import Header from "../header/header";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
// @feli .. asi se reutiliza un componente! :
import ServerError from "../Modals/ServerError";
import InputMask from 'react-input-mask';

const Pagar_tickets = ({ mis_tickets, set_mis_tickets }) => {
  const url_menus = "http://localhost:8000/api/menus/";
  const url_sedes = "http://localhost:8000/api/campuses/";
  const url_tickets = "http://localhost:8000/api/tickets/";

  const [menus, set_menus] = useState([]);
  const [sedes, set_sedes] = useState([]);

  const [menu_a_borrar, set_menu_a_borrar] = useState([]);
  const [fecha_a_borrar, set_fecha_a_borrar] = useState([]);
  const [sede_a_borrar, set_sede_a_borrar] = useState([]);
  const [modal_eliminar, set_modal_eliminar] = useState(false);

  const [numero_elegido, set_numero_elegido] = useState("");
  const [codigo_elegido, set_codigo_elegido] = useState("");
  const [fecha_elegida, set_fecha_elegida] = useState("1000-01-01");
  const [titular_elegido, set_titular_elegido] = useState("");

  const [error_numero_de_tarjeta, set_error_numero_de_tarjeta] =
    useState(false);
  const [error_codigo_de_seguridad, set_error_codigo_de_seguridad] =
    useState(false);
  const [error_codigo_de_seguridad_vacio, set_error_codigo_de_seguridad_vacio] =
    useState(false);
  const [error_fecha, set_error_fecha] = useState(false);
  const [error_titular, set_error_titular] = useState(false);

  const [modal_pagar, set_modal_pagar] = useState(false);

  //
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Ha ocurrido un error en la carga de los datos"
  );
  const handleError = () => {
    setError(false);
  };
  //
  useEffect(() => {
    get_menus();
    get_sedes();
  }, []);

  const get_menus = () => {
    axios
      .get(url_menus)
      .then((response) => {
        set_menus(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const get_sedes = () => {
    axios
      .get(url_sedes)
      .then((response) => {
        set_sedes(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const nombre_del_menu = (id) => {
    let nombre;
    menus.map((menu) => {
      if (menu.id === id) {
        nombre = menu.name;
      }
    });
    return nombre;
  };

  const nombre_de_la_sede = (id) => {
    let nombre;
    sedes.map((sede) => {
      if (sede.id == id) {
        nombre = sede.name;
      }
    });
    return nombre;
  };

  const fecha_formateada = (fecha) => {
    let una_fecha = fecha.split("-");
    una_fecha = una_fecha[2] + "-" + una_fecha[1] + "-" + una_fecha[0];
    return una_fecha;
  };

  const guardar_datos_temporalmente = (menu, fecha, sede) => {
    set_menu_a_borrar(menu);
    set_fecha_a_borrar(fecha);
    set_sede_a_borrar(sede);
  };

  const borrar = () => {
    let tickets = mis_tickets.filter(
      (ticket) =>
        ticket.menu !== menu_a_borrar ||
        ticket.date !== fecha_a_borrar ||
        ticket.campus !== sede_a_borrar
    );
    set_mis_tickets(tickets);
  };

  const total = () => {
    let suma = 0;
    mis_tickets.map((ticket) => {
      suma = suma + ticket.price;
    });
    return suma;
  };

  const capturar_el_ingreso_de_numero = async (n) => {
    n.persist();
    let number = n.target.value.replace("/[^0-9]{4}/", "-");
    console.log(number)
    set_numero_elegido(number);
  };

  const capturar_el_ingreso_de_codigo = async (c) => {
    c.persist();
    set_codigo_elegido(c.target.value);
  };

  const capturar_el_ingreso_de_fecha = async (f) => {
    f.persist();
    set_fecha_elegida(f.target.value);
  };

  const capturar_el_ingreso_de_titular = async (t) => {
    t.persist();
    set_titular_elegido(t.target.value);
  };

  const cancelar_compra = () => {
    window.location.href = "/tickets/comprar";
  };

  const pagar = async (p) => {
    p.preventDefault();

    let no_hay_errores = true;

    let numero = numero_elegido.split("-");
    if (numero.length === 4) {
      let error = false;
      numero.map((num) => {
        if (num.length !== 4 || !num.match(/^[0-9]+$/)) {
          error = true;
          no_hay_errores = false;
        }
      });
      set_error_numero_de_tarjeta(error);
    } else {
      set_error_numero_de_tarjeta(true);
      no_hay_errores = false;
    }

    if (codigo_elegido.length === 3 && codigo_elegido.match(/^[0-9]+$/)) {
      set_error_codigo_de_seguridad(false);
      set_error_codigo_de_seguridad_vacio(false);
    } else {
      if (codigo_elegido !== "") {
        set_error_codigo_de_seguridad(true);
        set_error_codigo_de_seguridad_vacio(false);
      } else {
        set_error_codigo_de_seguridad_vacio(true);
        set_error_codigo_de_seguridad(false);
      }
      no_hay_errores = false;
    }

    if (fecha_elegida === "1000-01-01" || fecha_elegida === "") {
      set_error_fecha(true);
      no_hay_errores = false;
    } else {
      set_error_fecha(false);
    }

    let apellido_y_nombre = titular_elegido.split(" ");
    if (apellido_y_nombre.length >= 2) {
      let error = false;
      apellido_y_nombre.map((item) => {
        if (!item.match(/^[A-Za-zÁ-Úá-ú]+$/)) {
          error = true;
          no_hay_errores = false;
        }
      });
      set_error_titular(error);
    } else {
      set_error_titular(true);
      no_hay_errores = false;
    }

    if (no_hay_errores) {
      await axios
        .post(url_tickets, mis_tickets)
        .then((response) => {
          console.log("upa", response);
          set_modal_pagar(true);
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response.status === 400) {
            setErrorMessage(
              "Solo puede comprar un ticket por fecha. Por favor, deje un solo ticket por fecha eliminando los restantes."
            );
            setError(true);
          }
        });
    }else{
      window.scrollTo(0, 150);
    }
  };

  return (
    <>
      {Header()}
      <main>
        <div>
          <Breadcrumb tag="nav" listTag="div">
            <BreadcrumbItem tag="a" href="/home">
              Comedor
            </BreadcrumbItem>
            <BreadcrumbItem active tag="span">
              Pagar tickets
            </BreadcrumbItem>
          </Breadcrumb>
        </div>

        <div className="row mt-4 mb-3">
          <div className="col-10 offset-1">
            <h1 className="text-center">Pagar tickets</h1>
          </div>
        </div>

        <div className="container-fluid col-10 mt-2">
          <h3 className="text-start mb-4">Datos de la tarjeta</h3>

          <div className="row justify-content-around ">
            <div className="col-4">
              <div>
                <h6 className="text">Titular de la cuenta</h6>
                <div className="row pb-3 ">
                  <input
                    type="text"
                    className="form-control text-center"
                    id="titular_pagar_ticket"
                    autoFocus={true}
                    placeholder="Ingrese su apellido y nombre"
                    onChange={capturar_el_ingreso_de_titular}
                  />
                </div>
                {error_titular ? (
                  <span className="text-danger row pb-3">
                    Ingrese su apellido y nombre con el formato pedido
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div>
                <h6 className="text">Número de la tarjeta</h6>
                <div className="row pb-3 ">
                  <InputMask
                    type="text"
                    className="form-control text-center"
                    id="numero_de_tarjeta_pagar_ticket"
                    name="numero_de_tarjeta_pagar_ticket"
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    mask="9999-9999-9999-9999"
                    value={numero_elegido}
                    onChange={capturar_el_ingreso_de_numero}
                  />
                </div>
                {error_numero_de_tarjeta ? (
                  <span className="text-danger row pb-3">
                    Ingrese su número de tarjeta con el formato pedido
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="col-4">
              <div>
                <h6 className="text">Fecha de vencimiento</h6>
                <div className="row pb-3 ">
                  <InputMask
                    type="text"
                    placeholder="MM/AA"
                    mask="99/99"
                    className="form-control text-center text-secondary"
                    id="fecha_de_vencimiento_pagar_ticket"
                    onChange={capturar_el_ingreso_de_fecha}
                  />
                </div>
                {error_fecha ? (
                  <span className="text-danger row pb-3">
                    Complete los tres campos de la fecha (día, mes y año)
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div>
                <h6 className="text">Código de seguridad</h6>
                <div className="row pb-3 ">
                  <InputMask
                    type="text"
                    className="form-control text-center"
                    id="codigo_de_seguridad_pagar_ticket"
                    placeholder="Ingrese su código"
                    mask="999"
                    placeholder="XXX"
                    onChange={capturar_el_ingreso_de_codigo}
                  />
                </div>
                {error_codigo_de_seguridad ? (
                  <span className="text-danger row pb-3">Código inválido</span>
                ) : (
                  ""
                )}
                {error_codigo_de_seguridad_vacio ? (
                  <span className="text-danger row pb-3">Código vacío</span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          <br />
          <h3 className="text-start mb-3">Tickets</h3>
        </div>

        <div className="row mt-2">
          <div className="col-10 offset-1">
            <table className="table table-striped">
              <thead>
                <tr id="lista_de_titulos_de_columnas_menus_habilitados">
                  <th>Menú</th>
                  <th>Fecha</th>
                  <th>Sede</th>
                  <th>Modalidad</th>
                  <th id="columna_para_el_precio_en_pagar_tickets">Precio</th>
                  <th id="columna_para_eliminar_en_pagar_tickets"></th>
                </tr>
              </thead>

              <tbody>
                {mis_tickets.length === 0 && (
                  <tr>
                    <td colSpan="12">
                      <h6>No ha elegido ningún ticket.</h6>
                    </td>
                  </tr>
                )}
                {mis_tickets.map((ticket) => {
                  return (
                    <tr>
                      <td className="pt-3">{nombre_del_menu(ticket.menu)}</td>
                      <td className="pt-3">{fecha_formateada(ticket.date)}</td>
                      <td className="pt-3">
                        {nombre_de_la_sede(ticket.campus)}
                      </td>
                      <td className="pt-3">
                        {ticket.take_away === "true" ? "Vianda" : "Comedor"}
                      </td>
                      <td className="pt-3">${ticket.price}</td>
                      <td>
                        <button
                          className="btn btn-primary-outline"
                          onClick={() => {
                            guardar_datos_temporalmente(
                              ticket.menu,
                              ticket.date,
                              ticket.campus
                            );
                            set_modal_eliminar(true);
                          }}
                        >
                          <FontAwesomeIcon
                            className="text-danger"
                            icon={faTrashAlt}
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {mis_tickets.length === 0 ? (
          <div className="d-flex justify-content-center mt-3">
            <button
              className="btn btn-secondary fs-5"
              onClick={cancelar_compra}
            >
              Cancelar
            </button>
          </div>
        ) : (
          <div>
            <h4 className="text-center mt-3 mb-5">Total ${total()}</h4>

            <div className="d-flex justify-content-center">
              <button
                className="btn btn-secondary me-3 fs-5"
                onClick={cancelar_compra}
              >
                Cancelar
              </button>
              <button className="btn btn-primary ms-3 fs-5" onClick={pagar}>
                Pagar
              </button>
            </div>
          </div>
        )}
      </main>

      <Modal isOpen={modal_eliminar}>
        <ModalBody>
          ¿Estás seguro que querés eliminar el menú:{" "}
          {nombre_del_menu(menu_a_borrar)}?
        </ModalBody>
        <ModalFooter>
          <button
            className="btn btn-secondary"
            onClick={() => set_modal_eliminar(false)}
          >
            No
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              borrar();
              set_modal_eliminar(false);
            }}
          >
            Sí
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modal_pagar} className="modal-dialog-centered">
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
              <p className="mt-4 fs-4">El pago se ha realizado con éxito</p>
            </div>
          </div>
        </ModalBody>

        <ModalFooter className="d-flex justify-content-center">
          <Link to="/mistickets">
            <button className="btn btn-primary">Ver mis tickets</button>
          </Link>
        </ModalFooter>
      </Modal>
      {/* asi */}
      {error && (
        <ServerError
          setError={setError}
          showError="true"
          message={errorMessage}
          handleError={handleError}
        />
      )}
    </>
  );
};

export default Pagar_tickets;

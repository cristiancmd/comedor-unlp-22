import './elegir_tickets.css'
import React, {useState, useEffect, useContext} from 'react'
import axios from "axios"
import Header from '../header/header'
import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart, faCalendarAlt, faPlusCircle, faMinusCircle} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from '../../UserContext';

const Elegir_tickets = ({set_termine_de_elegir,set_mis_tickets}) => {

  const url = "http://localhost:8000/api";

  const [data, setData] = useState([]);
  const [campus, setCampus] = useState([]);
  const [fecha_elegida, set_fecha_elegida] = useState("1000-01-01");
  const [sede_elegida, set_sede_elegida] = useState("");
  const [amount, setAmount] = useState(0);
  const [menus_seleccionados, set_menus_seleccionados] = useState([]);
  const [tickets_seleccionados, set_tickets_seleccionados] = useState([]);
  const [error_fecha, set_error_fecha] = useState(false);
  const [error_sede, set_error_sede] = useState(false);

  const { user, loginUser } = useContext(UserContext)

  useEffect(() => {
    campusGet();
    console.log(data);
  }, [])

  const campusGet = () => {
    axios.get(`${url}/campuses`).then(response => {
      console.log(response);
      setCampus(response.data);
    }).catch(error=>{
        console.log(error.message);
    })
  }

  const capturar_el_ingreso_de_fecha = async f => {
    f.persist();
    await set_fecha_elegida(f.target.value);
  }

  const capturar_el_ingreso_de_sede = async s => {
    s.persist()
    await set_sede_elegida(s.target.value)
  };

  const buscar_menus = () => {
    if (fecha_elegida === "1000-01-01" || fecha_elegida === "") {
      set_error_fecha(true)
    }
    else {
      set_error_fecha(false)
    }
    if (sede_elegida === "") {
      set_error_sede(true)
    }
    else {
      set_error_sede(false)
    }
    if (fecha_elegida !== "1000-01-01" && sede_elegida !== "") {
      axios.get(`${url}/enabledmenus`, {params: {date:fecha_elegida}}).then(response => {
        setData(response.data.filter(menu => menu.campus.id == sede_elegida));
      }).catch(error => {
        console.log(error.message);
      })
    }
  }

  const agregar_al_carrito = (menu_habilitado_id,menu_id,precio) => {
    let ticket = {
      "price":precio,
      "date":fecha_elegida,
      "take_away":document.getElementById("select_modalidad"+menu_id).value,
      "menu":menu_id,
      "campus":sede_elegida,
      "user":user.user.id
    }
    setAmount(amount+1)
    set_menus_seleccionados([...menus_seleccionados,menu_habilitado_id])
    set_tickets_seleccionados([...tickets_seleccionados,ticket])
  };

  const quitar_del_carrito = (menu_habilitado_id,menu_id) => {
    let menus = menus_seleccionados.filter(menu => menu !== menu_habilitado_id)
    let tickets = tickets_seleccionados.filter(ticket => (ticket.menu !== menu_id || ticket.date !== fecha_elegida || ticket.campus !== sede_elegida))
    setAmount(amount-1)
    set_menus_seleccionados(menus)
    set_tickets_seleccionados(tickets)
  };

  const ya_esta_elegido = (id) => {
    let ya_esta_elegido = false
    menus_seleccionados.map(
      menu => {
        if (menu === id) {
          ya_esta_elegido = true
        }
      }
    )
    return ya_esta_elegido
  };

  const pagar = () => {
    set_mis_tickets(tickets_seleccionados)
    set_termine_de_elegir(true)
  }

  return (
    <>
      {Header()}
      <main id="comprar-tickets">
        <div>
          <Breadcrumb tag="nav" listTag="div">
            <BreadcrumbItem tag="a" href="/home">Comedor</BreadcrumbItem>
            <BreadcrumbItem active tag="span">Comprar tickets</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="row mt-4 mb-3">
          <div className="col-10 offset-1">
            <h2 className="text-center">Comprar tickets</h2>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-10 offset-1">
            <div className="row justify-content-between">
              <div className="col-4">
                <label className="fs-5">Fecha</label>
                <div className="input-group justify-content-between">
                  <input type="date" className="form-control ps-0"
                    aria-describedby="basic-addon2"
                    onChange={capturar_el_ingreso_de_fecha}
                  />
                  <div className="input-group-append">
                    <span id="basic-addon2"><FontAwesomeIcon icon={faCalendarAlt}/></span>
                  </div>
                </div>
                {error_fecha?<h5 className="text-danger mb-0">Complete los tres campos de la fecha (día, mes y año)</h5>:""}
              </div>
              <div className="col-6 text-right d-flex justify-content-end align-items-end">
                <a className="btn btn-primary" onClick={pagar}><span className="mr-05"><FontAwesomeIcon
                  icon={faShoppingCart} className="me-2"/>Pagar tickets</span>
                  {amount}</a>
              </div>
            </div>
            <div className="row mt-4 justify-content-between">
              <div className="col-4">
                <label className="fs-5">Sede</label>
                <div className="justify-content-between">
                  <select className="form-select"
                    value={sede_elegida}
                    onChange={capturar_el_ingreso_de_sede}
                  >
                    <option value=''>Seleccionar sede...</option>
                    {campus.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                {error_sede?<h5 className="text-danger mb-0">Seleccione una sede</h5>:""}
              </div>
            </div>
            <div>
              <button className="btn btn-outline-success mt-4" onClick={buscar_menus}>Buscar</button>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-10 offset-1">
            <table className="table">
              <thead>
              <tr id="lista_de_titulos_de_columnas_menus_habilitados">
                <th>Nombre</th>
                <th>Precio</th>
                <th>Vegetariano</th>
                <th>Celíaco</th>
                <th>Modalidad</th>
                <th>Seleccionar</th>
              </tr>
              </thead>

              <tbody>
                {data.length === 0 && <tr><td colSpan="12"><h6>Ningún resultado para la fecha y sede seleccionadas.</h6></td></tr>}
                {data.map(data => {
                  return (
                    <tr key={data.id}>
                      <td>{data.menu.name}</td>
                      <td>${data.menu.price}</td>
                      <td>
                        {
                          data.menu.vegetarian?
                          <span>&#10003;</span>:
                          <span>&#x2715;</span>
                        }
                      </td>
                      <td>
                        {
                          data.menu.celiac?
                          <span>&#10003;</span>:
                          <span>&#x2715;</span>
                        }
                      </td>
                      <td>
                        <select id={"select_modalidad"+data.menu.id}>
                          <option value={false}>Comedor</option>
                          <option value={true}>Vianda</option>
                        </select>
                      </td>
                      <td>
                        {ya_esta_elegido(data.id)?
                          <span onClick={()=>quitar_del_carrito(data.id,data.menu.id)} className="btn btn-danger btn-sm">
                            <span className="mr-05"><FontAwesomeIcon icon={faMinusCircle}/></span>Quitar del carrito
                          </span>:
                          <span onClick={()=>agregar_al_carrito(data.id,data.menu.id,data.menu.price)} className="btn btn-primary btn-sm">
                            <span className="mr-05"><FontAwesomeIcon icon={faPlusCircle}/></span>Agregar al carrito
                          </span>
                        }
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  )
}

export default Elegir_tickets
import './comprar_tickets.css'
import React, {useState, useEffect} from 'react'
import axios from "axios"
import Header from '../header/header'
import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart, faCalendarAlt, faSortDown, faPlusCircle} from "@fortawesome/free-solid-svg-icons";

const ComprarTickets = () => {

  const url = "http://localhost:8000/api";

  const [data, setData] = useState([]);
  const [campus, setCampus] = useState([]);
  const [fecha_elegida, set_fecha_elegida] = useState([]);
  const [sede_elegida, set_sede_elegida] = useState([]);
  const [modalidad_elegida, set_modalidad_elegida] = useState([]);
  const [amount, setAmount] = useState(0);

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
    axios.get(`${url}/enabledmenus`, {params: {date:fecha_elegida}}).then(response => {
      setData(response.data.filter(menu => menu.campus.id == sede_elegida));
    }).catch(error => {
      console.log(error.message);
    })
  }

  const agregar_al_carrito = (id,precio) => {
    let ticket = {
      "price":precio,
      "date":fecha_elegida,
      "take_away":document.getElementById("select_modalidad"+id).value,
      "menu":id,
      "campus":sede_elegida,
      "user":0
    }
    setAmount(amount+1)
  };

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
                  <input type="date" className="form-control"
                         aria-describedby="basic-addon2"
                         onChange={capturar_el_ingreso_de_fecha}
                         id="fecha_menus_habilitados"
                  />
                  <div className="input-group-append">
                    <span id="basic-addon2"><FontAwesomeIcon icon={faCalendarAlt}/></span>
                  </div>
                </div>
              </div>
              <div className="col-6 text-right d-flex justify-content-end align-items-end">
                <a href="/carrito" className="btn btn-primary"><span className="mr-05"><FontAwesomeIcon
                  icon={faShoppingCart}/></span>
                  {amount}</a>
              </div>
            </div>
            <div className="row mt-4 justify-content-between">
              <div className="col-4">
                <label className="fs-5">Sede</label>
                <div className="input-group justify-content-between">
                  <select className="form-control"
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
                  <div className="input-group-append">
                    <span id="basic-addon2"><FontAwesomeIcon icon={faSortDown}/></span>
                  </div>
                </div>
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
                {data.length === 0 && <tr><td colSpan="12"><h6>Ningún resultado para la fecha seleccionada.</h6></td></tr>}
                {data.map(data => {
                  return (
                    <tr key={data.id}>
                      <td>{data.menu.name}</td>
                      <td>{data.menu.price}</td>
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
                        <span onClick={()=>agregar_al_carrito(data.menu.id,data.menu.price)} className="btn btn-primary btn-sm"><span className="mr-05"><FontAwesomeIcon icon={faPlusCircle}/></span>Agregar al carrito</span>
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

export default ComprarTickets
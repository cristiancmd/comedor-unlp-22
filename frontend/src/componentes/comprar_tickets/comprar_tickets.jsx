import './comprar_tickets.css'
import React, {useState, useEffect} from 'react'
import axios from "axios"
import Header from '../header/header'
import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faShoppingCart, faCalendarAlt, faSortDown, faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';

const ComprarTickets = () => {

  const url = "http://localhost:8000/api";

  const fecha_actual = () => {
    let hoy = new Date()
    let año = hoy.getFullYear()
    let mes = hoy.getMonth() + 1
    if (mes.toString().length === 1) {
      mes = '0' + mes
    }
    let dia = hoy.getDate()
    if (dia.toString().length === 1) {
      dia = '0' + dia
    }
    hoy = año + "-" + mes + "-" + dia
    return hoy
  }
  const [data, setData] = useState([]);
  const [amount, setAmount] = useState(0);
  const [campus, setCampus] = useState([]);

  const [filters, setFilters] = useState({
    date: fecha_actual(),
    campus: '',
    vegetarian: false,
    celiac: false,
  });

  const updateFilter = e => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };
  const campusGet = () => {
    axios.get(`${url}/campuses`).then(response => {
      console.log(response);
      setCampus(response.data);
    }).catch(error=>{
        console.log(error.message);
    })
  }

  const peticionGet = () => {
    axios.get(`${url}/enabledmenus`, {params: {date: filters.date}}).then(response => {
      setData(response.data);
    }).catch(error => {
      console.log(error.message);
    })
  }

  const capturar_el_ingreso_de_fecha = async f => {
    f.persist();
    await setFilters({...filters, date: f.target.value});
    console.log(filters.date);
  }

  useEffect(() => {
    campusGet();
    console.log(data);
  }, [])

  useEffect(() => {
    peticionGet()
    console.log(data)
  }, [filters.date])

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
                <label>Fecha</label>
                <div className="input-group justify-content-between">
                  <input type="date" className="form-control"
                         aria-describedby="basic-addon2"
                         defaultValue={filters.date}
                         onChange={capturar_el_ingreso_de_fecha}
                         name="filters.date"
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
                <div className="input-group justify-content-between">
                <select className="form-control"
                          name="campus"
                          value={filters.campus}
                          onChange={updateFilter}
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
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-10 offset-1">
            <table className="table">
              <thead>
              <tr id="lista_de_titulos_de_columnas_menus_habilitados">
                <th>Fecha</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Apto</th>
                <th>Sede</th>
                <th>Modalidad</th>
                <th>Seleccionar</th>
              </tr>
              </thead>
              <tbody>

              {data.length === 0 && <tr><td colSpan="12"><h6>Ningún resultado para la fecha seleccionada.</h6></td></tr>}
              {data.filter(item => filters.campus ? filters.campus == item.campus.id : item).map(data => {
                return (
                  <tr key={data.id}>
                    <td>{moment(filters.date).format("DD/MM/YYYY")}</td>
                    <td>{data.menu.name}</td>
                    <td>{data.menu.price}</td>
                    <td>{
                        data.menu.vegetarian?
                        <span>&#10003;</span>:
                        <span>&#x2715;</span>
                    }
                    {
                        data.menu.celiac?
                        <span>&#10003;</span>:
                        <span>&#x2715;</span>
                    }</td>
                    <td>{data.campus.name}</td>
                    <td><select
                            name="modalidad"
                            onChange={''}
                    >
                      <option value='0'>Comedor</option>
                      <option value='1'>Vianda</option>
                      ))}
                    </select></td>
                    <td>
                      <span onClick={''} className="btn btn-primary btn-sm"><span className="mr-05"><FontAwesomeIcon icon={faPlusCircle}/></span>
                          Agregar al carrito</span>
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
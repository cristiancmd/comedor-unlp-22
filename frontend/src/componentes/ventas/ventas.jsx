import './ventas.css'
import React, {useState, useEffect, useContext} from 'react'
import axios from "axios"
import Header from '../header/header'
import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import { UserContext } from '../../UserContext';

const Ventas = () => {

  const url = "http://localhost:8000/api";

  const [data, setData] = useState([]);
  const [campus, setCampus] = useState([]);
  const [fecha_elegida, set_fecha_elegida] = useState("1000-01-01");
  const [sede_elegida, set_sede_elegida] = useState("");
  const [error_fecha, set_error_fecha] = useState(false);
  const [error_sede, set_error_sede] = useState(false);

  const { user, loginUser } = useContext(UserContext)

  useEffect(() => {
    campusGet();
    buscar_menus();
  }, [])

  const campusGet = () => {
    axios.get(`${url}/campuses`).then(response => {
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
    axios.get(`${url}/enabledmenus`).then(response => {
      setData(response.data);
    }).catch(error => {
      console.log(error.message);
    })
  }

  const filterResult = data.filter(
    (item) => sede_elegida != '' ? item.campus.id == sede_elegida : item
  ).filter(
    (item) => fecha_elegida !== "1000-01-01" ? item.date === fecha_elegida : item
  )

  return (
    <>
      {Header()}
      <main id="comprar-tickets">
        <div>
          <Breadcrumb tag="nav" listTag="div">
            <BreadcrumbItem tag="a" href="/home">Comedor</BreadcrumbItem>
            <BreadcrumbItem active tag="span">Ventas</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="row mt-4 mb-3">
          <div className="col-10 offset-1">
            <h2 className="text-center">Cantidades vendidas</h2>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-8 offset-2">
            <div className="row">
              <div className="col-6">
                <label className="fs-5">Fecha</label>
                <div className="justify-content-between">
                  <input type="date" className="form-control ps-2" id="icon_date"
                    aria-describedby="basic-addon2"
                    onChange={capturar_el_ingreso_de_fecha}
                  />
                </div>
                {error_fecha?<h5 className="text-danger mb-0">Complete los tres campos de la fecha (día, mes y año)</h5>:""}
              </div>
              <div className="col-6">
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
              </tr>
              </thead>

              <tbody>
                { (sede_elegida == '' || fecha_elegida === "1000-01-01") ? <tr><td colSpan="12"><h6>Seleccione una fecha y una sede.</h6></td></tr>
                  : filterResult.map(data => {
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
                    </tr>
                  )
                })}
                { sede_elegida != '' && fecha_elegida !== "1000-01-01" && filterResult.length === 0 && <tr><td colSpan="12"><h6>Ningún resultado para la fecha y sede seleccionadas.</h6></td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  )
}

export default Ventas
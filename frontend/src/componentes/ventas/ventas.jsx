import './ventas.css'
import React, {useState, useEffect, useContext} from 'react'
import axios from "axios"
import Header from '../header/header'
import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import { UserContext } from '../../UserContext';

const Ventas = () => {

  const url = "http://localhost:8000/api";

  const [menus, setMenus] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [campus, setCampus] = useState([]);
  const [fecha_elegida, set_fecha_elegida] = useState("1000-01-01");
  const [sede_elegida, set_sede_elegida] = useState("");
  const [error_fecha, set_error_fecha] = useState(false);
  const [error_sede, set_error_sede] = useState(false);

  const { user, loginUser } = useContext(UserContext)

  useEffect(() => {
    campusGet();
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
    if (f.target.value !== "1000-01-01" && sede_elegida != ""){
      buscar_menus(f.target.value, sede_elegida);
    }
  }

  const capturar_el_ingreso_de_sede = async s => {
    s.persist()
    await set_sede_elegida(s.target.value)
    if (fecha_elegida !== "1000-01-01" && s.target.value != ""){
      buscar_menus(fecha_elegida, s.target.value);
    }
  };
  const buscar_menus = (fecha, sede) => {
    axios.get(`${url}/quantity/?date=${fecha}&campus=${sede}`).then(response => {
      if (response.data[0] && response.data[1]){
        setMenus(response.data[0]);
        console.log(response.data[1])
        setIngredients(response.data[1]);
      }
    }).catch(error => {
      console.log(error.message);
    })
  }

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
                <th>Menú</th>
                <th>Cantidad de tickets vendidos</th>
                <th>Cantidad de ingredientes</th>
              </tr>
              </thead>
              <tbody>
                { (sede_elegida == '' || fecha_elegida === "1000-01-01") ? <tr><td colSpan="12"><h6>Seleccione una fecha y una sede.</h6></td></tr>
                  : menus.map(menu => {
                  return (
                    <tr key={`ventas-${menu.id}`}>
                      <td className="ingredients-list">{menu.name}</td>
                      <td>{menu.tickets_vendidos}</td>
                      <td className="ingredients-list"><ul className="list-unstyled">
                        {menu.ingredientes.map(ingredient => (
                          <li key={`ventas-ingredients-${ingredient.ingredient_id}`}>{ingredient.cantidad} {ingredient.ingredient.measure} {ingredient.ingredient.name}</li>
                        ))}
                        </ul>
                      </td>

                    </tr>
                  )
                })}
                {ingredients.length !== 0 &&
                  <tr className="bg-total">
                    <td className="ingredients-list"><strong>Total</strong></td>
                    <td></td>
                    <td className="ingredients-list"><ul className="list-unstyled">
                      {ingredients.map(ingredient => (
                        <li key={`ventas-ingredients-2-${ingredient.ingredient_id}`}>{ingredient.cantidad_total} {ingredient.ingredient.measure} {ingredient.ingredient.name}</li>
                      ))}
                      </ul>
                    </td>
                  </tr>
                }
                { sede_elegida != '' && fecha_elegida !== "1000-01-01" && menus.length === 0 && <tr><td colSpan="12"><h6>Ningún resultado para la fecha y sede seleccionadas.</h6></td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  )
}

export default Ventas
import React, { useState } from 'react'
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { Link } from 'react-router-dom';
import Header from '../header/header';
import { Rating } from 'react-simple-star-rating'

const Listado_de_menus_con_la_calificación = () => {

  const url = "http://localhost:8000/api/menus/";

  const [data, setData] = useState([])

  React.useEffect(() => {
    peticionGet()
  }, [])

  const peticionGet = () => {
    axios.get(url).then(response => {
      setData(response.data);
    }).catch(error=>{
      console.log(error.message);
    })
  }

  const DataList = () => {
    return (<tbody >
      {data.map(menu => {
        return (
          <tr key={menu.id}>
            <td className="col-3">{menu.name}</td>
            {
              menu.vegetarian?
              <th className="col-1" ><span>&#10003;</span></th>:
              <th className="col-1"><span>&#x2715;</span></th>
            }
            {
              menu.celiac?
              <th className="col-1"><span>&#10003;</span></th>:
              <th className="col-1"><span>&#x2715;</span></th>
            }
            <td><h5 className="col-1 float-end mt-2">{menu.ratingAvg}</h5></td>
            <td>
              {menu.ratingAvg !== null?
              <Rating ratingValue={menu.ratingAvg} allowHalfIcon={true} readonly={true}/>:
              'El menú no posee calificaciones'}
            </td>
            <td>
              <div className="col-1">
                <Link to={"/menu/informacion/"+menu.id}><button className="btn btn-primary">Detalle</button></Link>
              </div>
            </td>
          </tr>
        )
      })}
    </tbody>
    )
  }
  return (
    <>
      {Header()}
      <main>
        <div>
          <Breadcrumb tag="nav" listTag="div">
            <BreadcrumbItem tag="a" href="/home">Comedor</BreadcrumbItem>
            <BreadcrumbItem active tag="span">Menús</BreadcrumbItem>
          </Breadcrumb>
        </div>

        <div className="row mt-5">
          <div className="col-10 offset-1">
            <h2 className="text-center mb-5">Menús</h2>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-10 offset-1">
          <table className="table align-middle table-striped">
            <thead>
              <tr id="lista_de_titulos_de_columnas_de_componentes">
                <th className="col-3">Nombre</th>
                <th className="col-2">Vegetariano</th>
                <th className="col-2">Celíaco</th>
                <th className="col-1"></th>
                <th className="col-2">Calificación</th>
                <th className="col-1"></th>
              </tr>
            </thead>
            <DataList></DataList>
          </table>
          </div>
        </div>
      </main>
    </>
  )

}

export default Listado_de_menus_con_la_calificación

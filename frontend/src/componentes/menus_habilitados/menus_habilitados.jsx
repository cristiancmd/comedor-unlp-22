import './menus_habilitados.css'
import React from 'react'
import axios from "axios"
import Header from '../header/header'
import {Breadcrumb, BreadcrumbItem} from "reactstrap";

const Menus_habilitados = () => {

    const url = "http://localhost:8000/api/enabledmenus"

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
    const [data, setData] = React.useState([])
    const [fecha, setFecha] = React.useState(fecha_actual());
    
 
    
    
    const peticionGet = () => {
        axios.get(url, { params: {date:fecha} }).then(response => {
            setData(response.data);
        }).catch(error=>{
            console.log(error.message);
        })
    }

    const capturar_el_ingreso_de_fecha = async f => {
        f.persist();
        await setFecha(f.target.value);
        console.log(fecha);
    }

    React.useEffect(() => {
        peticionGet()
        console.log(data)
    }, [fecha])
    
    return (
        <>
            {Header()}
            <div>
                  <Breadcrumb tag="nav" listTag="div">
                    <BreadcrumbItem tag="a" href="/home">Comedor</BreadcrumbItem>
                    <BreadcrumbItem tag="a" href="/menus">Menús</BreadcrumbItem>
                    <BreadcrumbItem active tag="span">Menus habilitados</BreadcrumbItem>
                  </Breadcrumb>
                </div>
            <main>
               
            <h1 id="titulo_menus_habilitados">Menús habilitados</h1>    
            <h3 id="elegir_fecha_menus_habilitados">Elegir fecha</h3>
            <div className="d-flex justify-content-center">
                <input type="date" name="fecha" id="fecha_menus_habilitados" className="form-control" defaultValue={fecha} onChange={capturar_el_ingreso_de_fecha}/>
            </div>
            <div id="contenedor_menus_habilitados">
                <table className="table">
                    <thead>
                        <tr id="lista_de_titulos_de_columnas_menus_habilitados">
                            <th className="titulo_de_columna_menus_habilitados">Nombre</th>
                            <th className="titulo_de_columna_menus_habilitados">Precio</th>
                            <th className="titulo_de_columna_menus_habilitados">Vegetariano</th>
                            <th className="titulo_de_columna_menus_habilitados">Celíaco</th>
                            
                            <th className="titulo_de_columna_menus_habilitados">Porciones</th>
                            <th className="titulo_de_columna_menus_habilitados">Sede</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    {data.length===0 && <h6 >Ningun resultado para la fecha seleccionada.</h6>   }
                        {data.map(data => { 
                            return (
                                <tr >
                                    <td >{data.menu.name}</td>
                                    <td >{data.menu.price}</td>
                                    {
                                        data.menu.vegetarian?
                                        <td><span>&#10003;</span></td>:
                                        <td><span>&#x2715;</span></td>
                                    }
                                    {
                                        data.menu.celiac?
                                        <td><span>&#10003;</span></td>:
                                        <td><span>&#x2715;</span></td>
                                    }
                                    <td >{data.servings }</td>
                                    <td >{data.campus.name +' - '+ data.campus.address}</td>
                                    
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </main>
        </>
    )
}

export default Menus_habilitados
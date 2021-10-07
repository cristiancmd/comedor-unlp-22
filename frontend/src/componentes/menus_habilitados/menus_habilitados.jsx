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
        hoy = año + "-" + mes + "-" + dia
        return hoy
    }
    const [data, setData] = React.useState([])
    const [fecha, setFecha] = React.useState(fecha_actual());

    
    
    const peticionGet = () => {
        axios.get(url).then(response => {
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
            <main>
                <div>
                  <Breadcrumb tag="nav" listTag="div">
                    <BreadcrumbItem active tag="span">Home</BreadcrumbItem>
                  </Breadcrumb>
                </div>
            <h1 id="titulo_menus_habilitados">Menús habilitados</h1>    
            <h3 id="elegir_fecha_menus_habilitados">Elegir fecha</h3>
            <div className="container" ><input type="date" name="fecha" 
            defaultValue={fecha_actual()} onChange={capturar_el_ingreso_de_fecha}/>
            </div>
            <div id="contenedor_menus_habilitados">
                <table className="table">
                    <thead>
                        <tr id="lista_de_titulos_de_columnas_menus_habilitados">
                            <th className="titulo_de_columna_menus_habilitados">Nombre</th>
                            <th className="titulo_de_columna_menus_habilitados">Vegetariano</th>
                            <th className="titulo_de_columna_menus_habilitados">Celíaco</th>
                            
                            <th className="titulo_de_columna_menus_habilitados">Porciones</th>
                            <th className="titulo_de_columna_menus_habilitados">Sede</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(data => {
                            return (
                                <tr >
                                    <td >{data.menu.name}</td>
                                    {
                                        data.menu.vegetarian?
                                        <td><span className="tilde_vegetariano_menus_habilitados">&#10003;</span></td>:
                                        <td><span className="tilde_vegetariano_menus_habilitados">&#x2715;</span></td>
                                    }
                                    {
                                        data.menu.celiac?
                                        <td><span className="tilde_celiaco_menus_habilitados">&#10003;</span></td>:
                                        <td><span className="tilde_celiaco_menus_habilitados">&#x2715;</span></td>
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
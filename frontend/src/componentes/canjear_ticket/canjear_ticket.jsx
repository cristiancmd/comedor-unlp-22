import React from 'react'
import axios from "axios"
import Header from '../header/header'
import {Breadcrumb, BreadcrumbItem} from "reactstrap";

const Canjear_ticket = () => {

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

    const capturar_el_ingreso_de_fecha = async f => {
        f.persist();
        await setFecha(f.target.value);
        console.log(fecha);
    }
    
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

        </main>
        </>
    )
}

export default Canjear_ticket
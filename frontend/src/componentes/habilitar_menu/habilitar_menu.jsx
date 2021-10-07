import './habilitar_menu.css'
import React from 'react'
import Header from '../header/header'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import Select from 'react-select'
import { Link } from 'react-router-dom'
import axios from "axios"


const Habilitar_menu = (props) => {

    const INSTITUTIONS = [
        {value:0, label:"Facultad de Arquitectura y Urbanismo"},
        {value:1, label:"Facultad de Artes"},
        {value:2, label:"Facultad de Ciencias Agrarias y Forestales"},
        {value:3, label:"Facultad de Ciencias Astronómicas y Geofísicas"}
    ]

    const url = "http://localhost:8000/api/enabledmenus/"

    const [fechas, setFecha] = React.useState([])
    const [porciones, set_porciones] = React.useState([])
    const [sede, set_sede] = React.useState([])

    const capturar_el_ingreso_de_fecha = async f => {
        f.persist();
        let fechas_totales = [...fechas,f.target.value];
        let fechas_totales_sin_duplicados = new Set(fechas_totales);
        await setFecha([...fechas_totales_sin_duplicados]);
        f.target.value = "";
    }

    const borrar_fecha = (fecha) => {
        let fechas_sin_la_fecha_a_eliminar = fechas.filter(una_fecha => una_fecha !== fecha);
        setFecha(fechas_sin_la_fecha_a_eliminar);
    }

    const capturar_porciones = p => {
        set_porciones(p.target.value);
    }

    const capturar_sede = s => {
        set_sede(s.value);
    }

    const guardar_menu = async m => {
        m.preventDefault();

        let menu = {
            "date":fechas,
            "menu":props.match.params.id,
            "campus":sede,
            "servings":porciones
        }

        console.log(menu)

        await axios.post(url,menu).then(response=>{
        }).catch(error=>{
            console.log(error.message);
        })

        window.location.href = "http://localhost:3000/menus";
    }

    return (
        <>
            {Header()}
            <main>
                <div>
                  <Breadcrumb tag="nav" listTag="div">
                    <BreadcrumbItem tag="a" href="/home">Comedor</BreadcrumbItem>
                    <BreadcrumbItem tag="a" href="/menus">Menús</BreadcrumbItem>
                    <BreadcrumbItem active tag="span">Habilitar menú</BreadcrumbItem>
                  </Breadcrumb>
                </div>
                <h1 id="titulo_habilitar_menu">Habilitar menú</h1>
                <div className="d-flex justify-content-center">
                    <div id="contenedor_de_los_input">
                        <h4>Días</h4>
                        <input className="form-control" type="date" name="dias" onChange={capturar_el_ingreso_de_fecha}/>
                        {fechas.map(fecha => {
                            return (
                                <button type="button" className="btn btn-secondary" id="boton_con_una_fecha" onClick={()=>{borrar_fecha(fecha)}}>{fecha} <span aria-hidden="true">&times;</span></button>
                            )
                        })}
                        <h4>Porciones</h4>
                        <input className="form-control" type="text" name="porciones" onChange={capturar_porciones}/>
                        <h4>Sede</h4>
                        <Select options={INSTITUTIONS} onChange={capturar_sede}/>
                    </div>
                </div>

                <div className="row justify-content-center mt-5">
                    <div className="d-flex justify-content-center">
                        <Link to={"/menus"}><button className="btn btn-secondary">Cancelar</button></Link>
                        <button className="btn btn-primary" onClick={guardar_menu}>Guardar</button>
                    </div>
                </div>
            </main>
        </>
    )

}

export default Habilitar_menu
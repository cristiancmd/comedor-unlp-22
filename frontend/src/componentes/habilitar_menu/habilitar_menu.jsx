import './habilitar_menu.css'
import React from 'react'
import Header from '../header/header'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

// ESTO ES SOLO PARA TENER UNA IMAGEN PARA PROBAR, DESPUÉS HAY 
// QUE SACARLO Y USAR LA IMAGEN DEL MENÚ CORRESPONDIENTE.
import imagen_del_menu from '../../imagenes/imagen_menu_de_prueba.png'


const Habilitar_menu = () => {

    const [fechas, setFecha] = React.useState([]);

    const capturar_el_ingreso_de_fecha = async f => {
        f.persist();
        let fechas_totales = [...fechas,f.target.value];
        let fechas_totales_sin_duplicados = new Set(fechas_totales);
        await setFecha([...fechas_totales_sin_duplicados]);
        f.target.value = "";
        console.log(fechas);
    }

    const borrar_fecha = (fecha) => {
        let fechas_sin_la_fecha_a_eliminar = fechas.filter(una_fecha => una_fecha !== fecha);
        setFecha(fechas_sin_la_fecha_a_eliminar);
        console.log(fecha);
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
                <div>
                    <div id="contenedor_del_menu">
                        <h3>Milanesas con papas fritas</h3>
                        <img src={imagen_del_menu} id="imagen_del_menu"/>
                    </div>
                    <aside id="contenedor_de_los_input">
                        <h4>Días</h4>
                        <input className="form-control" type="date" name="dias" id="dias" onChange={capturar_el_ingreso_de_fecha}/>
                        {fechas.map(fecha => {
                            return (
                                <button type="button" className="btn btn-secondary" id="boton_con_una_fecha" onClick={()=>{borrar_fecha(fecha)}}>{fecha} <span aria-hidden="true">&times;</span></button>
                            )
                        })}
                        <h4>Precio</h4>
                        <input className="form-control" type="text" name="precio" id="precio"/>
                        <h4>Porciones</h4>
                        <input className="form-control" type="text" name="porciones" id="porciones"/>
                        <h4>Sede</h4>
                        <select className="form-select">
                            <option>Todas las sedes</option>

                            
                            {/* ACÁ HAY QUE CAMBIAR fechas POR UNA VARIABLE QUE TENGA LAS SEDES DE LA API */}
                            {fechas.map(sede => {
                            return (
                                <option>{sede}</option>
                            )
                        })}
                        </select>
                    </aside>
                </div>
            </main>
        </>
    )

}

export default Habilitar_menu
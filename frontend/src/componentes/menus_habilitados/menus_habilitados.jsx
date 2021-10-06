import './menus_habilitados.css'
import React from 'react'
import axios from "axios"
import Header from '../header/header'
import {Breadcrumb, BreadcrumbItem} from "reactstrap";

const Menus_habilitados = () => {

    const url = "http://localhost:4000/menus"

    const [data, setData] = React.useState([])

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

    const [fecha, setFecha] = React.useState(fecha_actual());

    const capturar_el_ingreso_de_fecha = async f => {
        f.persist();
        await setFecha(f.target.value);
        console.log(fecha);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // CUANDO ESTÉ LA API DE VERDAD SUPONGO QUE HABRÍA QUE HACER LOS SIGUIENTES CAMBIOS:

    // 1) CAMBIAR LA VARIABLE url, PARA QUE QUEDE DE FORMA TAL QUE AL AGREGARLE /una_fecha TE DE LOS MENÚS DE ESA FECHA.

    // 2) CAMBIAR peticionGet HACIENDO QUE LE AGREGUE LA FECHA QUE ESTÁ EN EL ESTADO fecha. COMO fecha SE INICIALIZA CON
    // LA FECHA ACTUAL, PRIMERO BUSCA LOS MENÚS DE HOY, PERO CUANDO SE CAMBIA fecha, BUSCA LOS DE ESA FECHA.
    // SUPONGO QUE QUEDARÍA ALGO ASÍ:

    // const peticionGet = () => {
    //     axios.get(url+"/"+fecha).then(response => {
    //         setData(response.data);
    //     }).catch(error=>{
    //         console.log(error.message);
    //     })
    // }

    // PUEDE QUE HAYA QUE MOVER peticionGet DE LUGAR PORQUE POR AHÍ NO PUEDE USAR fecha PORQUE ESTÁ DECLARADO MÁS ABAJO.
    // TAMBIÉN HABRÍA QUE VER QUÉ PASA CUANDO SE TOCA LA CRUZ DONDE SE PONE LA FECHA, PORQUE AHÍ QUEDA fecha EN "empty 
    // string" Y PODRÍA LLEGAR A EXPLOTAR, Y HABRÍA QUE HACER ALGÚN CAMBIO BOLUDO PARA QUE NO EXPLOTE.

    // 3) HACER UN LLAMADO A peticionGet EN capturar_el_ingreso_de_fecha PARA QUE TRAIGA LOS MENÚS HABILITADOS EN LA FECHA
    // SELECCIONADA.
    // SUPONGO QUE QUEDARÍA ALGO ASÍ:

    // const capturar_el_ingreso_de_fecha = async f => {
    //     f.persist();
    //     await setFecha(f.target.value);
    //     peticionGet();
    //     console.log(fecha);
    // }

    // 4) CAMBIAR 5===5, 5===6 Y Sede POR ALGO DEL ESTILO menu.vegetariano, menu.caliaco Y menu.sede.

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
            <input className="form-control" type="date" name="fecha" id="fecha_menus_habilitados" defaultValue={fecha_actual()} onChange={capturar_el_ingreso_de_fecha}/>
            <div id="contenedor_menus_habilitados">
                <table className="table">
                    <thead>
                        <tr id="lista_de_titulos_de_columnas_menus_habilitados">
                            <th className="titulo_de_columna_menus_habilitados">Nombre</th>
                            <th className="titulo_de_columna_menus_habilitados">Vegetariano</th>
                            <th className="titulo_de_columna_menus_habilitados">Celíaco</th>
                            <th className="titulo_de_columna_menus_habilitados">Sede</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(menu => {
                            return (
                                <tr>
                                    <td>{menu.nombre}</td>
                                    {
                                        5 === 5?
                                        <td><span className="tilde_vegetariano_menus_habilitados">&#10003;</span></td>:
                                        <td><span className="tilde_vegetariano_menus_habilitados">&#x2715;</span></td>
                                    }
                                    {
                                        5 === 6?
                                        <td><span className="tilde_celiaco_menus_habilitados">&#10003;</span></td>:
                                        <td><span className="tilde_celiaco_menus_habilitados">&#x2715;</span></td>
                                    }
                                    <td>Sede</td>
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
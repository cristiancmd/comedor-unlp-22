import React, { useEffect } from 'react'
import axios from "axios"
import Header from '../header/header'
import {Breadcrumb, BreadcrumbItem} from "reactstrap";

const Canjear_ticket = () => {

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

    const url_ticket = "http://localhost:8000/api/tickets/";
    const url_usuario = "http://localhost:8000/api/usuarios/";

    const [dni, set_dni] = React.useState("");
    const [fecha, set_fecha] = React.useState(fecha_actual());

    const [error_dni, set_error_dni] = React.useState(false);
    const [error_fecha, set_error_fecha] = React.useState(false);

    const [ticket, set_ticket] = React.useState([]);

    const [verificando, set_verificando] = React.useState(false);

    const [sin_ticket, set_sin_ticket] = React.useState(false);

    useEffect(() => {
        if (verificando) {
            set_verificando(false)
            if (ticket.length === 0 || ticket[0].canjeado) {
                console.log(ticket)
                set_sin_ticket(true)
            }
            else {
                console.log('exito', ticket)
                window.location.href = "/tickets/detalle/"+ticket[0].id;
            }
        }
    }, [ticket]);

    const capturar_el_ingreso_de_dni = async (d) => {
        d.persist();
        await set_dni(d.target.value);
    };

    const capturar_el_ingreso_de_fecha = async f => {
        f.persist();
        await set_fecha(f.target.value);
    }

    const get_usuario =  () => {
        axios.get(url_usuario,{params:{dni:dni}}).then(response => {
            console.log('res1', response) 
            if(response.data.length>0){
                console.log('get user', response.data)
                get_ticket(response.data[0].id)
        }else {set_sin_ticket(true)}
        }).catch(error=>{
            console.log(error.message);
        })
    }

    const get_ticket = (usuario) => {
        axios.get(url_ticket, {params: {user: usuario, date: fecha}}).then(response => {
            console.log('res2', response)
            set_ticket(response.data)
        }).catch(error=>{
            console.log(error.message);
        })
    }

    const verificar = async (v) => {
        v.preventDefault();

        set_sin_ticket(false)
    
        let no_hay_errores = true;
    
        if (dni.match(/^[0-9]+$/)) {
            set_error_dni(false);
        } 
        else {
            set_error_dni(true);
            no_hay_errores = false;
        }
    
        if (fecha === "") {
            set_error_fecha(true);
            no_hay_errores = false;
        } 
        else {
          set_error_fecha(false);
        }
    
        if (no_hay_errores) {
            set_verificando(true)
            get_usuario()
        }
    }

    return (
        <>
            {Header()}
            <div>
                <Breadcrumb tag="nav" listTag="div">
                    <BreadcrumbItem tag="a" href="/home">Comedor</BreadcrumbItem>
                    <BreadcrumbItem active tag="span">Canjear ticket</BreadcrumbItem>
                </Breadcrumb>
            </div>

            <main>
                <h1 className="text-center mt-5 mb-5">Canjear ticket</h1>   
                <div className="d-flex justify-content-center">
                    <div className="col-3 mt-4">
                        <h4>DNI</h4> 
                        <div className="d-flex justify-content-center">
                            <input type="text" className="form-control" placeholder="Ingrese su DNI" onChange={capturar_el_ingreso_de_dni}/>
                        </div>
                        {error_dni ? (
                            <h7 className="text-danger row pb-3 ms-1">
                                Ingrese su DNI
                            </h7>
                            ) : (
                            ""
                        )}
                        <h4 className="mt-3">Fecha</h4>
                        <div className="d-flex justify-content-center">
                            <input type="date" name="fecha" className="form-control" defaultValue={fecha} onChange={capturar_el_ingreso_de_fecha}/>
                        </div>
                        {error_fecha ? (
                            <h7 className="text-danger row pb-3 ms-1">
                                Complete los tres campos de la fecha (día, mes y año)
                            </h7>
                            ) : (
                            ""
                        )}
                    </div>
                </div>
                <div className="d-flex justify-content-center mt-4">
                    {sin_ticket?(<h4 className="text-danger">Este cliente no tiene un ticket para la fecha seleccionada</h4>):("")}
                </div>
                <div className="d-flex justify-content-center mt-5">
                    <button className="btn btn-primary" onClick={verificar}>Verificar</button>
                </div>
            </main>
        </>
    )
}

export default Canjear_ticket
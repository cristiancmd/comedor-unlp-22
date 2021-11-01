import React, {useEffect, useState, useContext} from 'react'
import axios from "axios"
import Header from '../header/header'
import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import { UserContext } from '../../UserContext';

const Mis_tickets = () => {

    const url_tickets = "http://localhost:8000/api/tickets/";
    const url_menus = "http://localhost:8000/api/menus/";
    const url_sedes = "http://localhost:8000/api/campuses/";

    const [tickets, set_tickets] = React.useState([]);
    const [menus, set_menus] = useState([]);
    const [sedes, set_sedes] = useState([]);

    const { user, loginUser } = useContext(UserContext)

    useEffect(() => {
        get_tickets()
        get_menus()
        get_sedes()
      }, [])
  
    const get_tickets = () => {
        axios.get(url_tickets, {params: {user: user.user.id}}).then(response => {
            set_tickets(response.data.filter(ticket => ticket.date >= fecha_actual()).sort((ticket1, ticket2) => ticket1.date > ticket2.date))
        }).catch(error=>{
            console.log(error.message);
        })
    }

    const get_menus = () => {
        axios.get(url_menus).then(response => {
          set_menus(response.data)
        }).catch(error=>{
            console.log(error.message);
        })
      }
  
    const get_sedes = () => {
        axios.get(url_sedes).then(response => {
             set_sedes(response.data)
        }).catch(error=>{
            console.log(error.message);
        })
    }
  
    const nombre_del_menu = (id) => {
        let nombre
        menus.map(menu => {
            if (menu.id === id) {
                nombre = menu.name
            }
        })
        return nombre
    }
  
    const nombre_de_la_sede = (id) => {
        let nombre
        sedes.map(sede => {
          if (sede.id == id) {
            nombre = sede.name
          }
        })
        return nombre
    }

    const fecha_formateada = (fecha) => {
        let una_fecha = fecha.split("-")
        una_fecha = una_fecha[2] + "-" + una_fecha[1] + "-" + una_fecha[0]
        return una_fecha
    }

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
    
    return (
        <>
            {Header()}
            <div>
                <Breadcrumb tag="nav" listTag="div">
                    <BreadcrumbItem tag="a" href="/home">Comedor</BreadcrumbItem>
                    <BreadcrumbItem active tag="span">Mis tickets</BreadcrumbItem>
                </Breadcrumb>
            </div>

            <main>
                <h2 className="text-center">Mis tickets</h2>   
                <div className="row mt-5">
                    <div className="col-10 offset-1">
                        <table className="table">
                            <thead>
                                <tr id="lista_de_titulos_de_columnas_menus_habilitados">
                                    <th>Fecha</th>
                                    <th>Menú</th>
                                    <th>Modalidad</th>
                                    <th>Sede</th>
                                    <th>Canjeado</th>
                                </tr>
                            </thead>
            
                            <tbody>
                                {tickets.length === 0 && <tr><td colSpan="12"><h6>No tiene tickets comprados por usar.</h6></td></tr>}
                                {tickets.map(ticket => {
                                return (
                                    <tr>
                                        <td className="pt-3">{fecha_formateada(ticket.date)}</td>
                                        <td className="pt-3">{nombre_del_menu(ticket.menu)}</td>
                                        <td className="pt-3">{ticket.take_away?"Vianda":"Comedor"}</td>
                                        <td className="pt-3">{nombre_de_la_sede(ticket.campus)}</td>
                                        <td className="pt-3">{ticket.canjeado?"SI":"NO"}</td>
                                    </tr>
                                )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Mis_tickets
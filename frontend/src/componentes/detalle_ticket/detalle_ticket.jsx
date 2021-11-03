import React, { useEffect } from 'react'
import axios from "axios"
import Header from '../header/header'
import {Breadcrumb, BreadcrumbItem, Modal, ModalBody, ModalFooter} from "reactstrap"
import { useParams, Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const Detalle_ticket = () => {

    const url_ticket = "http://localhost:8000/api/tickets/";
    const url_usuario = "http://localhost:8000/api/usuarios/";
    const url_menu = "http://localhost:8000/api/menus/";
    const url_sede = "http://localhost:8000/api/campuses/";

    const [tickets, set_tickets] = React.useState([]);
    const [usuarios, set_usuarios] = React.useState([]);
    const [menus, set_menus] = React.useState([]);
    const [sedes, set_sedes] = React.useState([]);

    const [modal_canjear, set_modal_canjear] = React.useState(false);

    const {id} = useParams()

    useEffect(() => {
        get_ticket()
        get_usuarios()
        get_menus()
        get_sedes()
    }, []);

    const get_ticket = () => {
        axios.get(url_ticket).then(response => {
            set_tickets(response.data)
        }).catch(error=>{
            console.log(error.message);
        })
    }

    const get_usuarios = () => {
        axios.get(url_usuario).then(response => {
            set_usuarios(response.data)
        }).catch(error=>{
            console.log(error.message);
        })
    }

    const get_menus = () => {
        axios.get(url_menu).then(response => {
            set_menus(response.data)
        }).catch(error=>{
            console.log(error.message);
        })
    }

    const get_sedes = () => {
        axios.get(url_sede).then(response => {
            set_sedes(response.data)
            console.log(response.data)
        }).catch(error=>{
            console.log(error.message);
        })
    }

    const dni = (id) => {
        let un_dni
        usuarios.map(user => {
            if (user.id == id) {
                un_dni = user.dni
            }
        })
        return un_dni
    }

    const fecha_formateada = (fecha) => {
        let una_fecha = fecha.split("-")
        una_fecha = una_fecha[2] + "-" + una_fecha[1] + "-" + una_fecha[0]
        return una_fecha
    }

    const menu = (id) => {
        let nombre
        menus.map(menu => {
            if (menu.id === id) {
                nombre = menu.name
            }
        })
        return nombre
    }

    const sede = (id) => {
        let nombre
        sedes.map(sede => {
            if (sede.id === id) {
                nombre = sede.name
            }
        })
        return nombre
    }

    const canjear = () => {
        axios.patch(url_ticket+id+"/",{canjeado:true}).then(response => {
        }).catch(error=>{
            console.log(error.message);
        })
    }

    return (
        <>
            {Header()}
            <div>
                <Breadcrumb tag="nav" listTag="div">
                    <BreadcrumbItem tag="a" href="/home">Comedor</BreadcrumbItem>
                    <BreadcrumbItem active tag="span">Detalle ticket</BreadcrumbItem>
                </Breadcrumb>
            </div>

            <main>
                <h1 className="text-center mt-5 mb-5">Detalle ticket</h1>   

                {/* FORMA POCO PRÁCTICA DE HACERLO PERO ME DABA ERROR SINO */}
                {tickets.filter(ticket => ticket.id == id).map(ticket => {
                    return (
                        <>
                            <div className="d-flex justify-content-center">
                                <div className="col-3">
                                    <div className="d-flex justify-content-between mb-4">
                                        <h3 className="fw-bold">DNI del cliente:</h3>
                                        <h3>{dni(ticket.user)}</h3>
                                    </div>
                                    <div className="d-flex justify-content-between mb-4">
                                        <h3 className="fw-bold">Fecha:</h3>
                                        <h3>{fecha_formateada(ticket.date)}</h3>
                                    </div>
                                    <div className="d-flex justify-content-between mb-4">
                                        <h3 className="fw-bold">Menú:</h3>
                                        <h3>{menu(ticket.menu)}</h3>
                                    </div>
                                    {
                                        ticket.take_away?
                                        <div className="d-flex justify-content-between mb-4">
                                            <h3 className="fw-bold">Modalidad:</h3>
                                            <h3>Vianda</h3>
                                        </div>:
                                        <div className="d-flex justify-content-between mb-4">
                                            <h3 className="fw-bold">Modalidad:</h3>
                                            <h3>Comedor</h3>
                                        </div>
                                    }
                                    <div className="d-flex justify-content-between mb-4">
                                        <h3 className="fw-bold">Sede:</h3>
                                        <h3>{sede(ticket.campus)}</h3>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}  

                <div className="d-flex justify-content-center mt-5">
                    <Link to={"/tickets/canjear"}><button className="btn btn-secondary me-3">Cancelar</button></Link>
                    <button className="btn btn-primary ms-3" onClick={()=>{canjear();set_modal_canjear(true)}}>Canjear</button>
                </div>
            </main>

            <Modal isOpen={modal_canjear} className="modal-dialog-centered">
                <ModalBody>
                    <div className="mt-4 row justify-content-center">
                        <div className="col text-center">
                            <FontAwesomeIcon
                                icon={faCheckCircle}
                                color={"#6BC04B"}
                                className="fa-3x"
                            />
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col text-center">
                            <p className="mt-4 fs-4">El ticket se ha canjeado con éxito</p>
                        </div>
                    </div>
                </ModalBody>

                <ModalFooter className="d-flex justify-content-center">
                    <Link to="/tickets/canjear">
                        <button className="btn btn-primary">Aceptar</button>
                    </Link>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default Detalle_ticket
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Header from "../header/header";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { UserContext } from "../../UserContext";
import { Spinner } from "react-bootstrap";

const Mis_tickets = () => {
  const url_tickets = "http://localhost:8000/api/tickets/";
  

  const [tickets, set_tickets] = React.useState([]);
  

  const { user, loginUser } = useContext(UserContext);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setLoading(true)
    get_tickets();
    
    console.log(tickets);
  }, []);

  const get_tickets = async () => {
    await axios
      .get(url_tickets, { params: { user: user.user.id } })
      .then((response) => {
        set_tickets(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
      setLoading(false)
  };



  const fecha_formateada = (fecha) => {
    let una_fecha = fecha.split("-");
    una_fecha = una_fecha[2] + "-" + una_fecha[1] + "-" + una_fecha[0];
    return una_fecha;
  };

  return (
    <>
      {Header()}
      <div>
        <Breadcrumb tag="nav" listTag="div">
          <BreadcrumbItem tag="a" href="/home">
            Comedor
          </BreadcrumbItem>
          <BreadcrumbItem active tag="span">
            Mis tickets
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      <main>
        <h2 className="text-center">Mis tickets</h2>
        <div className="row mt-5">
          <div className="col-10 offset-1">
            {loading ? (
             <center> <Spinner animation="border"></Spinner> </center>
            ) : (
              <table className="table">
                <thead>
                  <tr id="lista_de_titulos_de_columnas_menus_habilitados">
                    <th>Fecha</th>
                    <th>Menú</th>
                    <th>Modalidad</th>
                    <th>Sede</th>
                  </tr>
                </thead>

                <tbody>
                  {tickets.length === 0 && (
                    <tr>
                      <td colSpan="12">
                        <h6>No tiene tickets comprados por usar.</h6>
                      </td>
                    </tr>
                  )}
                  {tickets.map((ticket) => {
                    return (
                      <tr>
                        <td className="pt-3">
                          {fecha_formateada(ticket.date)}
                        </td>
                        <td className="pt-3">{ticket.menu.name}</td>
                        <td className="pt-3">
                          {ticket.take_away ? "Vianda" : "Comedor"}
                        </td>
                        <td className="pt-3">{ticket.campus.name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Mis_tickets;

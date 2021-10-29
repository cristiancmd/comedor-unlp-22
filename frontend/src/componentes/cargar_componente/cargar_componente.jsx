import './cargar_componente.css';
import Header from '../header/header';
import React from 'react';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import ComponentForm from "../cargar_componente/formulario";

const Cargar_componente = () => {

  return (
    <>
      {Header()}
      <main>
        <div>
          <Breadcrumb tag="nav" listTag="div">
            <BreadcrumbItem tag="a" href="/home">Comedor</BreadcrumbItem>
            <BreadcrumbItem tag="a" href="/platos">Platos</BreadcrumbItem>
            <BreadcrumbItem active tag="span">Cargar plato</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="row my-5">
          <div className="col-10 offset-1">
            <h2 className="text-center mb-5">Cargar plato</h2>
            <ComponentForm></ComponentForm>
          </div>
        </div>
      </main>
    </>
  )
}

export default Cargar_componente
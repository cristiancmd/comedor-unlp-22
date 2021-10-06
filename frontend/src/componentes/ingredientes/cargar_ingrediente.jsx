import '../ingredientes/ingredientes.css';
import React, {useState} from 'react';
import Header from '../header/header';
import IngredientForm from "./form";
import axios from "axios";
import ModalSuccess from "../Modals/ModalSuccess";
import ServerError from "../Modals/ServerError";
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

const Cargar_ingrediente = () => {
  const [ingredient, setIngredient] = useState({
    id: "",
    name: "",
    measure: "",
  });

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Ha ocurrido un error en la carga de los datos");
  const [saving, setSaving] = useState(false);

  const api_url = "http://localhost:8000/api";

  const handleSubmit = async (data, e) => {
    await axios.post(`${api_url}/ingredients/`, data).then(response=>{
      setSaved(true);
      setError(false);
      setSaving(false);
    }).catch(error=>{
      console.log(error.message);
      setError(true);
    })
  }

  const handleError = () => {
    setError(false);
  } 

  return ( <>
      {Header()}
      <main id="new-ingredient">
        <div>
          <Breadcrumb tag="nav" listTag="div">
            <BreadcrumbItem tag="a" href="/home">Home</BreadcrumbItem>
            <BreadcrumbItem tag="a" href="/ingredientes">Ingredientes</BreadcrumbItem>
            <BreadcrumbItem active tag="span">Cargar ingrediente</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="row justify-content-center mt-3">
          <div className="col">
            <h2 className="text-center">Cargar ingrediente</h2>
            <div className="row justify-content-center mt-3">
              <div className="col-6">
                <IngredientForm setError={setError} setSaving={setSaving} ingredient={ingredient} setIngredient={setIngredient} handleSubmit={handleSubmit}/>
              </div>
            </div>
          </div>
        </div>
        {saved && <ModalSuccess setSaved={setSaved} showModal={saved} url="/ingredientes" message="¡Su ingrediente fue creado con éxito!" continue="Cargar otro"/>}
        {error && <ServerError setError={setError} showError="true" message={errorMessage} handleError={handleError}/>}
      </main>
    </>
  )
}

export default Cargar_ingrediente
import '../ingredientes/ingredientes.css';
import React from 'react';
import Header from '../header/header';
import IngredientForm from "./form";
import axios from "axios";


const Cargar_ingrediente = () => {
  const [ingredient, setIngredient] = React.useState({
    id: "",
    name: "",
    measure: "",
  });

  const api_url = "http://localhost:8000/api";

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${api_url}/ingredients/`, ingredient).then(response=>{
      window.location.href = "http://localhost:3000/ingredientes";
    }).catch(error=>{
      console.log(error.message);
    })
  }

  return ( <>
      {Header()}
      <main id="new-ingredient">
        <div className="row justify-content-center mt-3">
          <div className="col">
            <h2 className="text-center">Cargar ingrediente</h2>
            <div className="row justify-content-center mt-3">
              <div className="col-6">
                <IngredientForm ingredient={ingredient} setIngredient={setIngredient} handleSubmit={handleSubmit}/>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Cargar_ingrediente
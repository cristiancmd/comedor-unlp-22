import '../ingredientes/ingredientes.css';
import React, {useState} from 'react';
import Header from '../header/header';
import IngredientForm from "./form";
import axios from "axios";
import ModalSuccess from "../Modals/ModalSuccess";

const Cargar_ingrediente = () => {
  const [ingredient, setIngredient] = useState({
    id: "",
    name: "",
    measure: "",
  });

  const [success, setSuccess] = useState(false);

  const api_url = "http://localhost:8000/api";

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    await axios.post(`${api_url}/ingredients/`, ingredient).then(response=>{
      // setSuccess(true);
      window.location.href = "/ingredientes";
    }).catch(error=>{
      console.log(error.message);
    })
  }

  const another = () => {

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
        {success && <ModalSuccess another={another} showModal="true" url="/ingredientes" message="¡Su consulta fue enviada con éxito!" />}
        {/*{error && <ServerError showError="true" handleError={handleError}/>}*/}
      </main>
    </>
  )
}

export default Cargar_ingrediente
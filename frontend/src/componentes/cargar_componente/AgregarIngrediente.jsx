import React, { useEffect, useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle, faMinusCircle} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import Select from 'react-select';
import IngredientForm from "../ingredientes/form";
import './cargar_componente.css';
import { useForm, useFieldArray } from 'react-hook-form';

const AgregarIngrediente = (props) => {
  const url = "http://localhost:8000/api";

  const [data, setData] = useState([]);
  const [newIngredient, setNewIngredient] = useState(false);
  const [measure, setMeasure] = useState([]);
  const [formIndex, setFormIndex] = useState(null);
  const [ingredientes_a_mostrar, set_ingrediente_a_mostrar] = useState([]);
  const [error, setError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [cantidad_elegida, set_cantidad_elegida] = useState("1");
  const { control } = useForm();

  const [ingredient, setIngredient] = useState({
    id: "",
    name: "",
    measure: "",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients"
  });

  useEffect(() => {
    peticionGet();
    addIngredient();
  }, []);

  const peticionGet = () => {
    axios.get(`${url}/ingredients/`).then(response => {
      setData(response.data);
    }).catch(error => {
      console.log(error.message);
    })
  }

  const opciones = () => {
    let devolver = []
    {
      data.map(ingrediente => {
        let no_se_eligio = true
        ingredientes_a_mostrar.map(ing => {
          if (ing.id === ingrediente.id) {
            no_se_eligio = false
          }
        })
        if (no_se_eligio) {
          devolver.push({label: ingrediente.name, value: ingrediente.id})
        }
      })
    }
    return devolver
  }

  useEffect(() => {
    peticionGet()
    opciones()
    ingredientes_a_mostrar.map((item, index)=> console.log(index, item))
  }, [newIngredient]);


  const getMeasure = (id) => {
    let ingrediente = data.filter(item => item.id === id)
    if (ingrediente.length > 0) {
      return ingrediente[0].measure
    }else{
      return "UN"
    }
  };

  const addIngredient = async () => {
    append({"ingredient_id": null, amount: 1});
  };

  const removeIngredient = (index) => () => {
    setNewIngredient(false);
    remove(index);
  };

  const capturar_ingrediente = async (ingredient, index) => {
    ingredientes_a_mostrar[index] = {"ingredient_id": ingredient.value, "amount": cantidad_elegida}
    measure[index] = getMeasure(ingredient.value);
    props.setValue(`ingredients[${index}].ingredient_id`, ingredient.value);
  }

  const capturar_cantidad = (event, index)=> {
    event.persist();
    set_cantidad_elegida(event.target.value);
    props.setValue(`ingredients[${index}].amount`, event.target.value)
    ingredientes_a_mostrar[index] = {"ingredient_id": ingredientes_a_mostrar[index].ingredient_id, "amount": event.target.value}
  }

  const openIngredientForm = (index) => {
    setNewIngredient(true);
    setFormIndex(index);
  }

  const ingredientHandleSubmit = async (data, e) => {
    await axios.post(`${url}/ingredients/`, data).then(response=>{
      setError(false);
      setSaving(false);
      setNewIngredient(false);
      capturar_ingrediente({"value":response.data.id, "label":response.data.name}, formIndex);
    }).catch(error=>{
      console.log(error.message);
    })
  }

  const closeIngredientForm = () => {
    setNewIngredient(false);
  }

  return(
    <>
    {fields.map((item, index) => {
      let errors = props.errors.ingredients && props.errors.ingredients[index];

      return (
        <li key={item.id} className="list-unstyled my-3">
          <fieldset name={`ingredients[${index}]`} key={`ingredients[${index}]`}>
            <div className="row justify-content-between align-items-end">
              <div className="col-5">
                <div className="form-group">
                  <label htmlFor={`ingredients[${index}].ingredient_id`}>Ingrediente *</label>
                  <Select id={`ingredients[${index}].ingredient_id`}
                          name={`ingredients[${index}].ingredient_id`}
                          placeholder="Seleccionar..."
                          options={opciones()}
                          {...props.register(`ingredients[${index}].ingredient_id`, { required: true})}
                          onChange={(e) => capturar_ingrediente(e, index)}
                          defaultValue={`ingredients[${index}].ingredient_id`}
                  />
                </div>
              </div>
              <div className="col-3">
                <div className="form-group">
                  <label htmlFor={`ingredients.${index}.amount`}>Cantidad *</label>
                  <input id={`ingredients.${index}.amount`}
                         name={`ingredients.${index}.amount`}
                         className="form-control"
                         type="number"
                         {...props.register(`ingredients[${index}].amount`, { required: true, pattern: /^['0-9']+$/i })}
                         defaultValue="1"
                         onChange={(e) => capturar_cantidad(e, index)}/>
                </div>
              </div>
              <div className="col-2">
                <div className="form-group">
                  <input name="measure" disabled className="form-control text-center" type="text"
                         value={(measure[index]) ? measure[index] : "UN"}/>
                </div>
              </div>
              <div className="col-1 offset-1">
                <button type="button" title="Agrega un nuevo ingrediente al listado"
                        className="btn btn-secondary d-flex justify-content-center w-100"
                        onClick={() => openIngredientForm(index)}>
                  <span><FontAwesomeIcon icon={faPlusCircle}/></span>
                </button>
              </div>
              <div className="col-12 error">
                {props.errors.ingredients && props.errors.ingredients[index] && props.errors.ingredients[index].ingredient_id?.type === 'required' && "Debe seleccionar un ingrediente y su cantidad"}
              </div>
              <div className="col-12 error">
                {props.errors.ingredients && props.errors.ingredients[index] && props.errors.ingredients[index].amount?.type === 'required' && "Debe seleccionar un ingrediente y su cantidad"}
                {props.errors.ingredients && props.errors.ingredients[index] && props.errors.ingredients[index].amount?.type === 'pattern' && "El campo de cantidad solo acepta caracteres numéricos"}
              </div>
            </div>

            <div className="col-3 px-3 py-1">
              { fields.length > 1 ? (
                <button type="button" className="btn-sm btn-danger w-75" onClick={removeIngredient(index)}><span
                    className="mr-05"><FontAwesomeIcon icon={faMinusCircle}/></span>Quitar
              </button>
              ): (<></>)}
            </div>
          </fieldset>
        </li>
      );
    })}
    <div className="row w-100">
      <div className="col-12">
        <button type="button" className="btn btn-primary" id="agregar_cargar_componente" onClick={addIngredient}><span
          className="mr-05"><FontAwesomeIcon icon={faPlusCircle}/></span>Agregar otro ingrediente
        </button>
      </div>
    </div>

    <Modal isOpen={newIngredient}>
      <ModalHeader>
        Agregar un nuevo ingrediente
      </ModalHeader>
      <ModalBody>
        <IngredientForm formClose={closeIngredientForm} setError={setError} setSaving={setSaving} ingredient={ingredient}
                        setIngredient={setIngredient} handleSubmit={ingredientHandleSubmit}/>
      </ModalBody>
    </Modal>
  </>)
}

export default AgregarIngrediente;

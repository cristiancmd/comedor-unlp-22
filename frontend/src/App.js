import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
// Componentes
import header from './componentes/header/header';
import header_login from './componentes/header_login/header_login';
import login from './componentes/login/login';
import listado_de_menus from './componentes/listado_de_menus/listado_de_menus';
import habilitar_menu from './componentes/habilitar_menu/habilitar_menu';
import menus_habilitados from './componentes/menus_habilitados/menus_habilitados';
import ingredients from './componentes/ingredientes/listado_de_ingredientes';
import CargarIngrediente from './componentes/ingredientes/cargar_ingrediente';
import EditarIngrediente from "./componentes/ingredientes/editar_ingrediente";
import listado_de_componentes from './componentes/listado_de_componentes/listado_de_componentes';
import cargar_componente from './componentes/cargar_componente/cargar_componente';

function App() {
  return (
    <Router>
      <Route exact path='/header' component={header}/> 
      <Route exact path='/header_login' component={header_login}/> 
      <Route exact path='/login' component={login}/> 
      <Route exact path='/home' component={menus_habilitados}/> 
      <Route exact path='/menus' component={listado_de_menus}/> 
      <Route exact path='/platos' component={listado_de_componentes}/> 
      <Route exact path='/platos/nuevo' component={cargar_componente}/> 
      <Route exact path='/ingredientes' component={ingredients}/>
      <Route exact path='/ingredientes/nuevo' component={CargarIngrediente}/>
      <Route exact path='/ingredientes/editar/:id' component={EditarIngrediente}/>
      <Route exact path='/detalle/:id'/>
      <Route exact path='/habilitar/:id' component={habilitar_menu}/> 
      <Route exact path='/listados'/> 
      <Route exact path='/' component={listado_de_menus}/>
    </Router>
  );
}

export default App;
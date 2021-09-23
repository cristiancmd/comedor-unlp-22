import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Componentes
import header from './componentes/header/header';
import header_login from './componentes/header_login/header_login';
import login from './componentes/login/login';
import listado_de_menus from './componentes/listado_de_menus/listado_de_menus';

function App() {
  return (
    <Router>
      <Route exact path='/header' component={header}/> 
      <Route exact path='/header_login' component={header_login}/> 
      <Route exact path='/login' component={login}/> 
      <Route exact path='/home'/> 
      <Route exact path='/listado_de_menus' component={listado_de_menus}/> 
      <Route exact path='/detalle/:id'/> 
      <Route exact path='/habilitar/:id'/> 
      <Route exact path='/listados'/> 
    </Router>
  );
}

export default App;
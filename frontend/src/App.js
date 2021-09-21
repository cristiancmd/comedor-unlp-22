import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Componentes
import login from './componentes/login/login';
import listado_de_menus from './componentes/listado_de_menus/listado_de_menus';

function App() {
  return (
    <Router>
      <Route exact path='/login' component={login}/> 
      <Route exact path='/listado_de_menus' component={listado_de_menus}/> 
      <Route exact path='/detalle/:id'/> 
      <Route exact path='/habilitar/:id'/> 
    </Router>
  );
}

export default App;
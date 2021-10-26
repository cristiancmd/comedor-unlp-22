import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

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
import cargar_menu from './componentes/cargar_menu/cargar_menu';
import detalle_menu from './componentes/detalle_menu/detalle_menu';
import detalle_componente from './componentes/detalle_componente/detalle_componente';
import ComprarTickets from './componentes/comprar_tickets/comprar_tickets';
import ProtectedRoute from './componentes/login/ProtectedRoute';

function App() {

  const NotFound = () => (
    <div>
      <br/>
      <h1>404 - Pagina no encontrada!</h1> <p/>
      <a name="Volver" id="back" class="btn btn-secondary" 
      href="/home" role="button">Volver</a>
    </div>
  );
  return (

    <Router>
      <Switch>
        <Route exact path='/header_login' component={header_login} />
        <Route exact path='/login' component={login} />
        <ProtectedRoute path="/home" component={menus_habilitados} />
        <ProtectedRoute exact path='/header' component={header} />
        <ProtectedRoute exact path='/menus' component={listado_de_menus} />
        <ProtectedRoute exact path='/menus/nuevo' component={cargar_menu} />
        <ProtectedRoute exact path='/menus/detalle/:id' component={detalle_menu} />
        <ProtectedRoute exact path='/comprar-tickets' component={ComprarTickets}/>
        <ProtectedRoute exact path='/platos' component={listado_de_componentes} />
        <ProtectedRoute exact path='/platos/nuevo' component={cargar_componente} />
        <ProtectedRoute exact path='/platos/detalle/:id' component={detalle_componente} />
        <ProtectedRoute exact path='/ingredientes' component={ingredients} />
        <ProtectedRoute exact path='/ingredientes/nuevo' component={CargarIngrediente} />
        <ProtectedRoute exact path='/ingredientes/editar/:id' component={EditarIngrediente} />
        <ProtectedRoute exact path='/habilitar/:id' component={habilitar_menu} />
        <ProtectedRoute exact path='/listados' />
        <ProtectedRoute exact path='/' component={listado_de_menus} />

        {/* dejar al final -> */}
        <Route component={NotFound} /> 

      </Switch>
    </Router>
  );
}

export default App;
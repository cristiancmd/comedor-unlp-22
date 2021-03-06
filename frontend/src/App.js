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
import comprar_tickets from './componentes/comprar_tickets/comprar_tickets';
import canjear_ticket from './componentes/canjear_ticket/canjear_ticket';
import detalle_ticket from './componentes/detalle_ticket/detalle_ticket';
import mis_tickets from './componentes/mis_tickets/mis_tickets';
import ProtectedRoute from './componentes/login/ProtectedRoute';
import Ventas from './componentes/ventas/ventas';
import listado_de_menus_con_la_calificación from './componentes/calificar_menus/listado_de_menus';
import detalle_menu_a_calificar from './componentes/calificar_menus/detalle_menu';
import calificar_menu from './componentes/calificar_menus/calificar_menu';

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
    // !!   a las rutas del cliente se les debe agregar staff={ false }
    <Router>
      <Switch>
        <Route exact path='/header_login' component={header_login} />
        <Route exact path='/login' component={login} />
        <ProtectedRoute path="/home" component={canjear_ticket} staff={true }/>
        <ProtectedRoute exact path='/header' component={header} staff={true } />
        <ProtectedRoute exact path='/ventas' component={Ventas} staff={true } />
        <ProtectedRoute exact path='/menus' component={listado_de_menus} staff={true } />
        <ProtectedRoute exact path='/menus/nuevo' component={cargar_menu} staff={true } />
        <ProtectedRoute exact path='/menus/habilitados' component={menus_habilitados} staff={true } />
        <ProtectedRoute exact path='/menus/detalle/:id' component={detalle_menu} staff={true } />
        <ProtectedRoute exact path='/platos' component={listado_de_componentes} staff={true } />
        <ProtectedRoute exact path='/platos/nuevo' component={cargar_componente} staff={true } />
        <ProtectedRoute exact path='/platos/detalle/:id' component={detalle_componente} staff={true } />
        <ProtectedRoute exact path='/ingredientes' component={ingredients} staff={true }/>
        <ProtectedRoute exact path='/ingredientes/nuevo' component={CargarIngrediente} staff={true }/>
        <ProtectedRoute exact path='/ingredientes/editar/:id' component={EditarIngrediente} staff={true }/>
        <ProtectedRoute exact path='/habilitar/:id' component={habilitar_menu} staff={true } />
        <ProtectedRoute exact path='/listados' component={listado_de_menus} staff={true }/>
        <ProtectedRoute exact path='/' component={listado_de_menus} staff={true }/>
        <ProtectedRoute exact path='/tickets/comprar' component={comprar_tickets} staff={ false }/>
        <ProtectedRoute exact path='/mistickets' component={mis_tickets} staff={ false }/>
        <ProtectedRoute exact path='/tickets/canjear' component={canjear_ticket} staff={true }/>
        <ProtectedRoute exact path='/tickets/detalle/:id' component={detalle_ticket} staff={true }/>
        <ProtectedRoute exact path='/menus/calificaciones' component={listado_de_menus_con_la_calificación} staff={ false }/>
        <ProtectedRoute exact path='/menu/informacion/:id' component={detalle_menu_a_calificar} staff={ false }/>
        <ProtectedRoute exact path='/menu/calificar/:id' component={calificar_menu} staff={ false }/>

        {/* dejar al final -> */}
        <Route component={NotFound} /> 

      </Switch>
    </Router>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Componentes
import login from './componentes/login/login';
import menu from './componentes/menu/menu';

function App() {
  return (
    <Router>
      <Route exact path='/login/usuario' component={login}/> 
      <Route exact path='/login/usuaria' component={menu}/> 
    </Router>
  );
}

export default App;
import AuthLayout from "layouts/AuthLayout";
import PrivateLayout from "layouts/PrivateLayout";
import PublicLayout from "layouts/PublicLayout";
import Admin from "pages/admin/Index";
import Usuarios from "pages/admin/Usuarios";
import Productos from "pages/admin/Productos";
import Ventas from "pages/admin/Ventas"
import Index from "pages/Index"
import Login from "pages/Login";
import Registro from "pages/Registro";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "styles/styles.css";
import {DarkModeContext} from "context/darkMode"
import { Auth0Provider } from "@auth0/auth0-react"; 

function App() {
    return (
      <Auth0Provider
      domain="misiontic-concesionario2.us.auth0.com"
      clientId="hhcz7kYvqDx0oIaBJisfB9cZ3lsZi9kd"
      redirectUri={window.location.origin}
      >
        <div className="App">
    <DarkModeContext.Provider >
    <Router>
    <Switch>
      <Route path={['/admin', '/admin/productos', '/admin/usuarios', '/admin/ventas']}>
        <PrivateLayout>
          <Switch>
            <Route path='/admin/productos'>
              <Productos />
            </Route>
            <Route path='/admin/usuarios'>
              <Usuarios />
            </Route>
            <Route path='/admin/ventas'>
              <Ventas />
            </Route>
            <Route path='/admin'>
              <Admin />
            </Route>
          </Switch>
        </PrivateLayout>
      </Route>
      <Route path={['/login', '/registro']}>
        <AuthLayout>
          <Switch>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/registro'>
              <Registro />
            </Route>
          </Switch>
        </AuthLayout>
      </Route>
      <Route path={['/']}>
        <PublicLayout>
          <Switch>
            <Route path='/'>
              <Index />
            </Route>
          </Switch>
        </PublicLayout>
      </Route>
    </Switch>
  </Router>

    </DarkModeContext.Provider>
        </div>    
      </Auth0Provider>
  );
}

export default App;

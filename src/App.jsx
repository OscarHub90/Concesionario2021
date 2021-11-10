import AuthLayout from "layouts/AuthLayout";
import PrivateLayout from "layouts/PrivateLayout";
import PublicLayout from "layouts/PublicLayout";
import Admin from "pages/admin/Index";
import Usuarios from "pages/admin/Usuarios";
import Productos from "pages/admin/Productos";
import Index from "pages/Index"
import Login from "pages/Login";
import Registro from "pages/Registro";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "styles/styles.css";
import {DarkModeContext} from "context/darkMode"

function App() {
  return (
    <div className="App">
    <DarkModeContext.Provider >
    <Router>
    <Switch>
      <Route path={['/admin', '/admin/productos', '/admin/usuarios']}>
        <PrivateLayout>
          <Switch>
            <Route path='/admin/productos'>
              <Productos />
            </Route>
            <Route path='/admin/usuarios'>
              <Usuarios />
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
  );
}

export default App;

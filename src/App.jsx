import Index from "pages/Index"
import Admin from "pages/Admin";
import Login from "pages/Login";
import Registro from "pages/Registro";
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import "styles/styles.css";
import PublicLayout from "layouts/PublicLayout";
import PrivateLayout from "layouts/PrivateLayout";
import AuthLayout from "layouts/AuthLayout";

function App() {
  return (
    <Router>
      <Switch>
        <Route path={['/admin']}>
          <PrivateLayout>
            <Switch>
              <Route path='/admin'>
                <Admin />
              </Route>
            </Switch>
          </PrivateLayout>
        </Route>
        <Route path={['/login', '/registro']}>
          <AuthLayout>
            <Switch>
              <Route path ='/login'>
                <Login />
              </Route>
              <Route path = '/registro'>
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
  )
}

export default App;

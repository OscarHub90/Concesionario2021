import Index from "pages/Index"
import Admin from "pages/Admin";
import Login from "pages/Login";
import Registro from "pages/Registro";
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import "styles/styles.css";
import PublicLayout from "layouts/PublicLayout";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/registro">
          <Registro/>
        </Route>
        <Route path="/admin">
          <Admin/>
        </Route>
        <Route path="/">
        <PublicLayout>
          <Index />
        </PublicLayout>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

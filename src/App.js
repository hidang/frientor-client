import { auth } from "./Auth/firebase";
import UserFeature from "./features/User";
import Home from "./pages/Home";
import { NavLink, Route, Switch } from "react-router-dom";

//--------------------------------------------------------
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Home auth={auth} />
        </Route>
        <Route path="/user">
          <UserFeature auth={auth} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

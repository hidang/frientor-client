import UserPage from "./pages/User";
import HomePage from "./pages/Home";
import NewsFeedPage from "./pages/NewsFeed";
import { Route, Switch } from "react-router-dom";

//--------------------------------------------------------
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/user">
          <UserPage />
        </Route>
        <Route path="/search" exact>
          <NewsFeedPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

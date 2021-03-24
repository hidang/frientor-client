import { Route, Switch } from "react-router-dom";

import UserPage from "./pages/User";
import HomePage from "./pages/Home";
import NewsFeedPage from "./pages/NewsFeed";
import NotFound from "./components/NotFound";
import QuestionPage from "./pages/Question";
import ChatPage from "./pages/Chat";
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
        <Route path="/question" exact>
          <QuestionPage />
        </Route>
        <Route path="/chat" exact>
          <ChatPage />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

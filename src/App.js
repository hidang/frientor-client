import { auth } from "./Auth/firebase";
import Home from "./pages/Home";
//--------------------------------------------------------
function App() {
  return (
    <div className="App">
      <Home auth={auth} />
    </div>
  );
}

export default App;

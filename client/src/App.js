
import { useAuth } from "./hooks/auth.hook";
import { useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import UseRoutes from "./Routes";
import Header from "./components/header/header";
import "./App.scss";
function App() {
  //const { login, logout, token, userId } = useAuth();
  const auth = useSelector((state) => state.auth)
  const isAuthenticated = !!auth.token;
  const routes = UseRoutes(auth.isAuthenticated);
  console.log(auth)
  return (
    <Router>
      <div className="d-flex">
        {isAuthenticated && <Header />}
        <div>{routes}</div>
      </div>
    </Router>
  );
}

export default App;

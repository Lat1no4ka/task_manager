import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import UseRoutes from "./Routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import Header from "./components/header/header";

function App() {
  const { login, logout, token, userId } = useAuth();
  
  const isAuthenticated = !!token;
  const routes = UseRoutes(isAuthenticated);
  return (
    <AuthContext.Provider
      value={{ login, logout, token, userId, isAuthenticated }}
    >
      <Router>
        <div className="d-flex">
          {isAuthenticated && <Header />}
          <div>{routes}</div>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import * as ROUTES from './constants/routes';
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import useAuthListener from "./hooks/useAuthListener";
import UserContext from "./context/user";


function App() {
  const {user} = useAuthListener();
  const Login = lazy(() => import('./pages/Login'));
  const Signup = lazy(() => import('./pages/Signup'));
  const Dashboard = lazy(() => import('./pages/Dashboard'));
  const NotFound = lazy(()=>import('./pages/NotFound'));
  return (
   
    <div className = "App" >
      <UserContext.Provider value={{user}}>
      <Router>
        <Suspense fallback = {<p>Loading... </p> }>
          <Switch>
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.SIGN_UP} component={Signup} />
            <Route path={ROUTES.DASHBOARD} component={Dashboard} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;

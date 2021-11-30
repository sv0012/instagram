import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import * as ROUTES from './constants/routes'


function App() {
  const Login = lazy(() => import('./pages/Login'));
  return (
   
    <div className = "App" >
      <Router>
        <Suspense fallback = {<p>Loading... </p> }>
          <Switch>
            <Route path={ROUTES.LOGIN} component={Login} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;

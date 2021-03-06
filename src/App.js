import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from './constants/routes';
import useAuthListener from "./hooks/useAuthListener";
import UserContext from "./context/user";
import IsUserLoggedIn from "./helpers/IsUserLoggedIn";
import ProtectedRoute from "./helpers/ProtectedRoute";
import Profile from "./pages/Profile";
import ImageUpload from "./pages/ImageUpload";
import PropicUpload from "./pages/PropicUpload";
import EditPost from "./pages/EditPost";


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
            <IsUserLoggedIn user={user} path={ROUTES.LOGIN} loggedInPath={ROUTES.DASHBOARD} exact>
            <Login />
            </IsUserLoggedIn>
            
            <IsUserLoggedIn user={user} path={ROUTES.SIGN_UP} loggedInPath={ROUTES.DASHBOARD} exact>
            <Signup />
            </IsUserLoggedIn>
            <ProtectedRoute path={ROUTES.PROFILE} user={user} exact>
            <Profile />
            </ProtectedRoute>
            <ProtectedRoute path={ROUTES.IMAGE_UPLOAD} user={user} exact>
            <ImageUpload user={user}/>
            </ProtectedRoute>
            <ProtectedRoute path={ROUTES.PROPIC_UPLOAD} user={user} exact>
            <PropicUpload />
            </ProtectedRoute>
           
            <ProtectedRoute path={ROUTES.DASHBOARD} user={user} exact>
            <Dashboard user={user} />
            </ProtectedRoute>
            <ProtectedRoute path={ROUTES.EDIT_POST} user={user} exact>
            <EditPost />
            </ProtectedRoute>
            
            
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;

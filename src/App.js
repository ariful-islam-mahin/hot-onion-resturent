import React, { createContext, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/Home';
import NoMatch from './components/NoMatch/NoMatch';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import FoodDetails from './components/FoodDetails/FoodDetails';
import Login from './components/Login/Login';
import CheckOut from './components/CheckOut/CheckOut';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({
    isLoggedIn:false,
    name:'',
    email:'',
    password:'',
    error:'',
    success:false
  });
  return (
    <UserContext.Provider value={[user, setUser]}>
      <Router>
        <Switch>
          <Route path='/home'>
            <Home></Home>
          </Route>
          <Route exact path='/'>
            <Home></Home>
          </Route>
          <Route  path='/login'>
            <Login></Login>
          </Route>
          <Route path='/:category/:foodName'>
            <FoodDetails></FoodDetails>
          </Route>
          <PrivateRoute path='/checkout'>
            <CheckOut></CheckOut>
          </PrivateRoute>
          <Route path='*'>
            <NoMatch></NoMatch>
          </Route>
          </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

import React from 'react';
import './App.css';
import Login from './components/Login';
import {BrowserRouter, Route} from 'react-router-dom';
import AdminComponent from './components/AdminComponent';
import UserComponent from './components/UserComponent';
import UserDetailsComponent from './components/UserDetailsComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
            <div>
               <Route exact path = "/" component = {Login} />
               <Route exact path = "/user" component = {UserComponent} />
               <Route exact path = "/admin" component = {AdminComponent} />
               <Route exact path = "/userDetails/:labId" component = {UserDetailsComponent} />
            </div>
        </BrowserRouter>
    </div>
  );
}

export default App;

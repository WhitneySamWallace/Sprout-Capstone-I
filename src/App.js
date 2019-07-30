import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import LandingPage from './components/LandingPage/LandingPage';
import LogIn from './components/LogIn/LogIn';
import Main from './components/Main/Main';
import AddStudent from './components/AddStudent/AddStudent';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="App">
      <Nav className="Nav" />
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route path="/login" component={LogIn}/>
        <Route path="/main" component={Main}/>
        <Route path="/add" component={AddStudent}/>
        <Route path="/notfound" component={NotFound}/>
      </Switch>
      
    </div>
  );
}

export default App;

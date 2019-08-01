import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav/Nav';
import LandingPage from './components/LandingPage/LandingPage';
import LogIn from './components/LogIn/LogIn';
import Main from './components/Main/Main';
import AddStudent from './components/AddStudent/AddStudent';
import NotFound from './components/NotFound/NotFound';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
          <Switch>
            <Route exact path="/" component={LandingPage}/>
            <Route path="/login" component={LogIn}/>
            <Route path="/main" component={Main}/>
            <Route path="/add" component={AddStudent}/>
            <Route path="/404" component={NotFound}/>
          </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

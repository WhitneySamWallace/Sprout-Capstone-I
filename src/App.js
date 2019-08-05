import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav/Nav';
import LandingPage from './components/LandingPage/LandingPage';
import LogIn from './components/LogIn/LogIn';
import Main from './components/Main/Main';
import AddStudent from './components/AddStudent/AddStudent';
import NotFound from './components/NotFound/NotFound';
import Footer from './components/Footer/Footer';
import Context from './context/Context';


class App extends Component {

  state = {
    hasError: null,
    isLoading: false,
    hasAuthToken: true,
    students: [],
    addStudent: '',
  }

  handleAddStudent = (student) => {
    this.setState({
      addStudent: student
    })
  }

  handleAddStudentSubmit = (e) => {
    e.preventDefault();

    this.setState({
      students: [...this.state.students, this.state.addStudent],
      addStudent: ''
    })
  }
  
  render() {
    return (
      <Router>
        <Context.Provider
          value={{
            hasAuthToken: this.state.hasAuthToken,
            students: this.state.students,
            hasError: this.state.hasError,
            isLoading: this.state.isLoading,
            handleAddStudent: this.handleAddStudent,
            handleAddStudentSubmit: this.handleAddStudentSubmit,

          }}>
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
        </Context.Provider>
      </Router>
    );
  }
  
}

export default App;

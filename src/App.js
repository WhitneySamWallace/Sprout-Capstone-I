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
    students: [
      {
        id: 0,
        name: 'Annie',
        goal: 'Write an opening paragraph',
        priority: 'low',
        expand: false,
      },{
        id: 1,
        name: 'Mathis',
        goal: 'Come up with 3 supporting facts',
        priority: 'medium',
        expand: false,
      },{
        id: 2,
        name: 'Kurt',
        goal: 'Finish brain map',
        priority: 'high',
        expand: false,
      }
    ],
    addStudent: '',
    username: 'USERNAME', //STATIC FOR NOW
  }

  handleAddStudent = (student) => {
    this.setState({
      addStudent: student
    })
  }

  handleAddStudentSubmit = (e) => {
    e.preventDefault();
    document.getElementById('student-name').value = '';
    this.setState({
      students: [...this.state.students, this.state.addStudent],
      addStudent: ''
    })
  }

  handleDeleteStudent = (deleteStudent) => {
    const filteredStudents = this.state.students.filter(student => student !== deleteStudent)
    this.setState({
      students: filteredStudents
    })
  }

  toggleExpand = (studentId) => {
    const studentToExpand = this.state.students.find(student => student.id === studentId);
    const expandedStudent = {...studentToExpand, expand: !studentToExpand.expand}
    console.log(expandedStudent);
    this.setState({
      students: this.state.students.map(student => student.id !== studentId ? student : expandedStudent)
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
            username: this.state.username,
            handleAddStudent: this.handleAddStudent,
            handleAddStudentSubmit: this.handleAddStudentSubmit,
            handleDeleteStudent: this.handleDeleteStudent,
            toggleExpand: this.toggleExpand,

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

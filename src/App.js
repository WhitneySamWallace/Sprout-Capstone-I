import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import uuid from 'uuid';
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
    username: 'USERNAME', //STATIC FOR NOW
    minigoal: '',
    priority: 'high',
    newStudentName: '',
    signup: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  }

  updateUsername = (username) => {
    this.setState({
      signup: {
        ...this.state.signup,
        username
      }
    })
  }

  updateEmail = (email) => {
    this.setState({
      signup: {
        ...this.state.signup,
        email
      }
    })
  }

  updatePassword = (password) => {
    this.setState({
      signup: {
        ...this.state.signup,
        password
      }
    })
  }

  updateConfirmPassword = (confirmPassword) => {
    this.setState({
      signup: {
        ...this.state.signup,
        confirmPassword
      }
    })
  }

  updateMiniGoal = (goal) => {
    this.setState({
      minigoal: goal
    })
  }

  updatePriority = (priority) => {
    this.setState({
      priority: priority
    })
  }

  updateNewStudentName = (name) => {
    this.setState({
      newStudentName: name
    })
  }

  handleUpdateGoal = (e, studentId) => {
    e.preventDefault();

    const studentToUpdate = this.state.students.find(student => student.id === studentId)
    const updatedStudent = {...studentToUpdate, goal: this.state.minigoal, priority: this.state.priority, expand: false}
    this.setState({
      students: this.state.students.map(student => student.id !== studentId ? student : updatedStudent),
      minigoal: '',
      priority: '',
    })
  }

  handleAddStudentSubmit = (e) => {
    e.preventDefault();
    const newStudent = {
      id: uuid(),
      name: this.state.newStudentName,
      goal: '',
      priority: '',
      expand: false,
    }
    console.log(newStudent);
    this.setState({
      students: [...this.state.students, newStudent],
      newStudentName: ''
    })
  }

  handleDeleteStudent = (deleteStudent) => {
    const filteredStudents = this.state.students.filter(student => student !== deleteStudent)
    this.setState({
      students: filteredStudents
    })
  }

  handleSignUpSubmit = (e) => {
    e.preventDefault();
    const newUser = {...this.state.signup}
    console.log(newUser)

    this.setState({
      signup: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      }
    })
  }

  toggleExpand = (studentId) => {
    const studentToExpand = this.state.students.find(student => student.id === studentId);
    const expandedStudent = {...studentToExpand, expand: !studentToExpand.expand}
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
            minigoal: this.state.minigoal,
            priority: this.state.priority,
            signUpUsername: this.state.signup.username,
            signUpEmail: this.state.signup.email,
            signUpPassword: this.state.signup.password,
            signUpConfirmPassword: this.state.signup.confirmPassword,
            newStudentName: this.state.newStudentName,
            handleAddStudent: this.handleAddStudent,
            handleAddStudentSubmit: this.handleAddStudentSubmit,
            handleDeleteStudent: this.handleDeleteStudent,
            toggleExpand: this.toggleExpand,
            updateMiniGoal: this.updateMiniGoal,
            updatePriority: this.updatePriority,
            handleUpdateGoal: this.handleUpdateGoal,
            updateNewStudentName: this.updateNewStudentName,
            updateConfirmPassword: this.updateConfirmPassword,
            updatePassword: this.updatePassword,
            updateEmail: this.updateEmail,
            updateUsername: this.updateUsername,
            handleSignUpSubmit: this.handleSignUpSubmit,

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

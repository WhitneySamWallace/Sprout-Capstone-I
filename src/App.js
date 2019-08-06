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
        id: uuid(),
        name: 'Annie',
        goal: 'Write an opening paragraph',
        priority: 'low',
        expand: false,
        alert: false,
        order: 0,
      },{
        id: uuid(),
        name: 'Mathis',
        goal: 'Come up with 3 supporting facts',
        priority: 'medium',
        expand: false,
        alert: false,
        order: 0,
      },{
        id: uuid(),
        name: 'Kurt',
        goal: 'Finish brain map',
        priority: 'None',
        expand: false,
        alert: false,
        order: 0,
      }
    ],
    username: 'USERNAME', //STATIC FOR NOW
    minigoal: '',
    priority: 'low',
    newStudentName: '',
    signup: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  }

  // all 'update' prefixes set state
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
    const updatePriority = priority === 'None' ? 'low' : priority 
    this.setState({
      priority: updatePriority
    })
  }

  updateNewStudentName = (name) => {
    this.setState({
      newStudentName: name
    })
  }

  // Updates mini-goal and priority for student having check-in (Main view)
  handleUpdateGoal = (e, studentId) => {
    e.preventDefault();

    const studentToUpdate = this.state.students.find(student => student.id === studentId)
    const updatedStudent = {...studentToUpdate, goal: this.state.minigoal, priority: this.state.priority, expand: false, order: 0}
    this.handleTimer(studentId, this.state.priority)
    this.setState({
      students: this.state.students.map(student => student.id !== studentId ? student : updatedStudent),
      minigoal: '',
      priority: 'None',
    })
  }

  // Sets timer for specified priority (Main view)
  // High - 5 min/300000, Medium - 10min/600000, Low - 20 min/1200000 ------------ //CHANGED FOR TESTING
  handleTimer = (studentId, priority) => {
    const time = priority === 'high' ? 3000 : (priority === 'medium') ? 6000 : 12000;
    setTimeout(this.handleAlert, time, studentId)
  }

  // Callback fn for priority timers, enables alert status and reorders (Main view)
  handleAlert = (studentId) => {
    const alertStudent = this.state.students.find(student => student.id === studentId);
    // toggle alert
    const studentOrder = {...alertStudent, alert: true, order: new Date()}
    // re-order
    this.setState({
      students: this.state.students.map(student => student.id !== studentId ? student : studentOrder)
    })
  }

  //Updates student and adds them to student list (Add Student view)
  handleAddStudentSubmit = (e) => {
    e.preventDefault();
    const newStudent = {
      id: uuid(),
      name: this.state.newStudentName,
      goal: '',
      priority: '',
      expand: false,
      order: 0,
    }
    console.log(newStudent);
    this.setState({
      students: [...this.state.students, newStudent],
      newStudentName: ''
    })
  }

  //Deletes student from list (Add Student view)
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

  // Source: https://stackoverflow.com/questions/52844028/using-setstate-to-change-multiple-values-within-an-array-of-objects-reactjs
  handleReset = (e) => {
    const resetStudents = ({priority, order, goal, expand, alert, id, name}) => ({id, name, priority: 'high', order: 0, goal: '', expand: false, alert: false});

    this.setState(state => ({students: state.students.map(resetStudents)}))
    console.log('Reset!')
  }

  // Expands student checkin and updates alert and order conditions (Main view)
  toggleExpand = (studentId) => {
    const studentToExpand = this.state.students.find(student => student.id === studentId);
    const alertCheck = studentToExpand.alert === false ? 0 : studentToExpand.order
    const expandedStudent = {...studentToExpand, expand: !studentToExpand.expand, alert: false, order: alertCheck}
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
            handleReset: this.handleReset,

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

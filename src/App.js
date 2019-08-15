import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import LogIn from './components/LogIn/LogIn';
import Main from './components/Main/Main';
import AddStudent from './components/AddStudent/AddStudent';
import NotFound from './components/NotFound/NotFound';
import Footer from './components/Footer/Footer';
import Context from './context/Context';
import StudentsApiService from './services/students-api-service';
import AuthApiService from './services/auth-api-service';
import TokenService from './services/token-service';
import IdleService from './services/idle-service';


class App extends Component {

  state = {
    error: 'Testing error',
    hasError: true,
    students: [],
    username: '',
    user_id: '', 
    minigoal: '',
    priority: 'low',
    newStudentName: '',
    loggedIn: false,
  }

  setError = (error) => {
    console.error(error);
    this.setState({ 
      error,
      hasError: true,
    })
  }

  clearError = () => {
    this.setState({ 
      error: null,
      hasError: false,
    })
  }

  setStudents = (students) => {
    const addKeysStudents = students.map(student => {
      student.expand = false;
      student.alert = false;
      student.order = 0;
      student.priority = 'low';

      return student;
    })
    this.setState({
      students: addKeysStudents
    })
  }

  setNewStudent = (newStudent) => {
    this.setState({
      students: [...this.state.students, newStudent]
    })
  }

  // Auth/Idle
  componentDidMount() {
    IdleService.setIdleCallback(this.logoutFromIdle);

    if (TokenService.hasAuthToken()) {
      IdleService.registerIdleTimerResets();
      TokenService.queueCallbackBeforeExpiry(() => {
        AuthApiService.postRefreshToken();
      })
    }
  }

  componentWillUnmount() {
    IdleService.unRegisterIdleResets();
    TokenService.clearCallbackBeforeExpiry();
  }

  logoutFromIdle = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    this.forceUpdate();
    this.setState({
      loggedIn: false,
    })
  }

  // all 'update' prefixes set state 

  updateUsername = (username) => {
    this.setState({
      username
    })
  }

  updateUserId = (user_id) => {
    this.setState({
      user_id
    })
  }

  updateMiniGoal = (goal) => {
    this.setState({
      minigoal: goal
    })
  }

  updatePriority = (priority) => {
    const updatePriority = priority === '' ? 'low' : priority 
    this.setState({
      priority: updatePriority
    })
  }

  updateNewStudentName = (name) => {
    this.setState({
      newStudentName: name
    })
  }

  updatedLoggedIn = () => {
    this.setState({
      loggedIn: false,
    })
  }

  // Updates mini-goal and priority for student having check-in (Main view)
  handleUpdateGoal = (e, studentId) => {
    e.preventDefault();
    this.clearError();
    const data = {goal: this.state.minigoal, priority: this.state.priority}
    StudentsApiService.updateStudent(studentId, data)
      .then(res => {
        const studentToUpdate = this.state.students.find(student => student.id ===studentId)
        const updatedStudent = {...studentToUpdate, ...data, expand: false, order: 0};
        this.handleTimer(updatedStudent.id, this.state.priority);
        this.setState({
          students: this.state.students.map(student => student.id !== studentId ? student : updatedStudent),
          minigoal: '',
          priority: 'low',
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({
          hasError: true,
          error: err.message  
        });
      });
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
    this.clearError();
    const newStudentName = this.state.newStudentName
    
    StudentsApiService.postStudent(newStudentName)
    .then(student => {
      this.setState({
        students: [...this.state.students, student],
        newStudentName: '',
      })
    })
    .catch(err => {
      console.error(err);
      this.setError(err);
    })
  }

  //Deletes student from list (Add Student view)
  handleDeleteStudent = (deleteStudent) => {
    this.clearError();
    const studentId = deleteStudent.id;

    StudentsApiService.deleteStudent(studentId)
      .then(() => {
        this.setState({
          students: this.state.students.filter(student => student.id !== studentId)
        })
      })
      .catch(err => {
        console.error(err);
        this.setError(err);
      })
  }

  handleSignUpSubmit = (e) => {
    e.preventDefault();
    const {username, password, email, confirm_password} = e.target;
    
    this.setState({ 
      hasError: false,
      error: null 
    })

    //VALIDATE THAT PASSWORD MATCHES
    if (password.value !== confirm_password.value) {
      this.setState({
        hasError: true,
        error: 'Passwords do not match!'
      })
      return Promise.reject()
    } else {
      return AuthApiService.postUser({
        username: username.value,
        password: password.value,
        email: email.value,
      })
      .then(res => {
        console.log("RES =>", res);
        if (res.username) { 
        console.log('User posted');
        return AuthApiService.postLogin({
          username: username.value,
          password: password.value,
        })
      }
      })
      .then(() => {
        if (TokenService.hasAuthToken) {
          this.setState({
            loggedIn: true,
            username: username.value,
          })
        }
        username.value = '';
        password.value = '';
        email.value = '';
        confirm_password.value = '';
      })
      .catch(res => {
        this.setState({ 
          hasError: true,
          error: res.error 
        })
      })
    }
  }

  // Source: https://stackoverflow.com/questions/52844028/using-setstate-to-change-multiple-values-within-an-array-of-objects-reactjs
  handleReset = (e) => {
    const resetStudents = ({priority, order, goal, expand, alert, id, name}) => ({id, name, priority: 'high', order: 0, goal: '', expand: false, alert: false});

    this.setState(state => ({students: state.students.map(resetStudents)}))
  }

  handleMenuClick = () => {
    this.setState({
      menuOpen: !this.state.menuOpen,
    });
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
            students: this.state.students,
            hasError: this.state.hasError,
            error: this.state.error,
            isLoading: this.state.isLoading,
            username: this.state.username,
            user_id: this.state.user_id,
            minigoal: this.state.minigoal,
            priority: this.state.priority,
            loggedIn: this.state.loggedIn,
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
            updatedLoggedIn: this.updatedLoggedIn,
            updateUserId: this.updateUserId,
            handleSignUpSubmit: this.handleSignUpSubmit,
            handleReset: this.handleReset,
            setError: this.setError,
            clearError: this.clearError,
            setStudents: this.setStudents,

          }}>
          <div className="App">
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

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
import StudentsApiService from './services/students-api-service';


class App extends Component {

  state = {
    error: null,
    hasError: null,
    hasAuthToken: true,
    students: [],
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
    this.setState({
      students
    })
  }

  setNewStudent = (newStudent) => {
    this.setState({
      students: [...this.state.students, newStudent]
    })
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
          error: err
        });
      });

    //const studentToUpdate = this.state.students.find(student => student.id === studentId)
    //const updatedStudent = {...studentToUpdate, goal: this.state.minigoal, priority: this.state.priority, expand: false, order: 0}
    //this.handleTimer(studentId, this.state.priority)
    // this.setState({
    //   students: this.state.students.map(student => student.id !== studentId ? student : updatedStudent),
    //   minigoal: '',
    //   priority: 'low',
    // })
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
      console.log(student);
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
        console.log(studentId);
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
            setError: this.setError,
            clearError: this.clearError,
            setStudents: this.setStudents,

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

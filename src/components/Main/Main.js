import React from 'react';
import './Main.css';
import Context from '../../context/Context';
import StudentsApiService from '../../services/students-api-service';

class Main extends React.Component {
  static contextType = Context;

  componentDidMount() {
    this.context.clearError();
    StudentsApiService.getStudents()
      .then(students => this.context.setStudents(students))
      .catch(error => this.context.setError(error))
  }

  render() {
    const studentsToSort = this.context.students.filter(student => student.order !== 0)
    const sortedStudents = studentsToSort.sort(((a, b) => (a.order > b.order) ? 1 : -1))

    const studentsToList = this.context.students.filter(student => student.order === 0)

    const allStudents = [...sortedStudents, ...studentsToList]
    
    const students = allStudents.map((student, index) => {
      return (
        <li key={index} className={student.alert === true ? 'alert' : ''}>
                <h4>{student.name}</h4>
                <p>Goal: {student.goal}</p>
                <p>Priority: {student.priority}</p>
                <button onClick={e => this.context.toggleExpand(student.id)}>{student.expand === true ? 'Cancel' : 'Check In'}</button>
                <div className={student.expand === false ? "hidden" : "show"}>
                  <form onSubmit={e => (this.context.handleUpdateGoal(e, student.id))}>
                    <div>
                      <label htmlFor="new-goal">New Goal:</label>
                      <input 
                      placeholder="New Mini-Goal" 
                      name="new-goal" 
                      id="new-goal" 
                      type="text"
                      value={this.context.minigoal}
                      onChange={e => this.context.updateMiniGoal(e.target.value)}
                      required
                      />
                    </div>
                    <div>
                      <input type="radio" value="0" id="high" name="priority" onChange={e => this.context.updatePriority('high')} />
                      <label htmlFor="high">High</label>
                      <input type="radio" value="1" id="medium" name="priority" onChange={e => this.context.updatePriority('medium')} />
                      <label htmlFor="medium">Medium</label>
                      <input type="radio" value="3" id="low" name="priority" onChange={e => this.context.updatePriority('low')} />
                      <label htmlFor="low">Low</label>
                    </div>
                    <button type="submit">Update</button>
                  </form>
                </div>
              </li>
      )
    })
    return (
      <div className="Main">
        <main>
          <header>
            <h2>Welcome back, {this.context.username}!</h2>
          </header>
          <section>
            <h3>Student List</h3>
            <button onClick={e => this.context.handleReset(e)}>Reset</button>
            <ul>
              {students}
            </ul>
          </section>
        </main>
      </div>
    );
  }
  }
  

export default Main;
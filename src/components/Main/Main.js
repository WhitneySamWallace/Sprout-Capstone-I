import React from 'react';
import './Main.css';
import Context from '../../context/Context';

class Main extends React.Component {
  static contextType = Context;

  render() {
    const students = this.context.students.map((student, index) => {
      return (
        <li key={index}>
                <h4>{student.name}</h4>
                <p>{student.goal}</p>
                <p>{student.priority}</p>
                <button onClick={e => this.context.toggleExpand(student.id)}>Check In</button>
                {/* UPON CLICKING CHECK IN, EXPAND THE FOLLOWING DIV */}
                <div className="hidden">
                  <form >
                    <div>
                      <label htmlFor="new-goal">New Goal:</label>
                      <input placeholder="New Mini-Goal" name="new-goal" id="new-goal" type="text"/>
                    </div>
                    <div>
                      <input type="radio" value="0" id="high" />
                      <label htmlFor="high">High</label>
                      <input type="radio" value="1" id="medium" />
                      <label htmlFor="medium">Medium</label>
                      <input type="radio" value="3" id="low" />
                      <label htmlFor="low">Low</label>
                    </div>
                    <button>Update</button>
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
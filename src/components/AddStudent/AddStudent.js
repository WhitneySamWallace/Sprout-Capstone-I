import React from 'react';
import './AddStudent.css';
import Context from '../../context/Context';

class AddStudent extends React.Component {
  static contextType = Context;

  render() {
    return (
      <div className="Add-Student">
        <main>
          <header>
            <h2>Add Students</h2>
          </header>
          <form onSubmit={e => this.context.handleAddStudentSubmit(e)}>
            <div>
              <label htmlFor="student-name">Student Name</label>
              <input placeholder="Student Name" type="text" name="student-name" id="student-name" 
              onChange={e => this.context.handleAddStudent(e.target.value)}/>
            </div>
            <button type="submit">Add</button>
          </form>
        </main>
      </div>
    );
  }

}

export default AddStudent;
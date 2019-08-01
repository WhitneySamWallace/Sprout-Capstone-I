import React from 'react';
import './AddStudent.css';

function AddStudent() {
  return (
    <div className="Add-Student">
      <main>
        <header>
          <h2>Add Students</h2>
        </header>
        <form>
          <div>
            <label for="student-name">Student Name</label>
            <input placeholder="Student Name" type="text" name="student-name" id="student-name" />
          </div>
          <button>Add</button>
        </form>
      </main>
    </div>
  );
}

export default AddStudent;
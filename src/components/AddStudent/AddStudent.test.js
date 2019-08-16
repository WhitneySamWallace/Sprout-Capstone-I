import React from 'react';
import ReactDOM from 'react-dom';
import AddStudent from './AddStudent';
import Context from '../../context/Context';

it('renders without crashing', () => {

  const div = document.createElement('div');
  ReactDOM.render(
  <Context.Provider
    value={{
      students: [
        { id: 1,
          name: 'Dwight Schrute', 
          goal: 'Research beets', 
          priority: 'high', 
          sprout_user_id: 1},
      {id: 2,
        name: 'Olivia Duhnham', 
        goal: 'Research the alternate universe', 
        priority: 'low', 
        sprout_user_id: 1},
      {id: 3,
        name: 'Walter Bishop', 
        goal: 'Eat banana pudding', 
        priority: 'medium', 
        sprout_user_id: 1},
      ],
      clearError: () => {},
      setStudents: () => {},
      setError: () => {},
      handleDeleteStudent: () => {},
      handleAddStudentSubmit: () => {},
      newStudentName: () => {},
      updateNewStudentName: () => {},
    }}>
    <AddStudent />
  </Context.Provider>, 
  div
);
  ReactDOM.unmountComponentAtNode(div);
});
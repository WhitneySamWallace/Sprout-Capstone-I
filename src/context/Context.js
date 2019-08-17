import React from "react";

const Context = React.createContext({
  students: [],
  hasError: false,
  error: null,
  username: '',
  user_id: null,
  minigoal: '',
  priority: '',
  loggedIn: false,
  newStudentName: '',
  handleAddStudent: () => {},
  handleAddStudentSubmit: () => {},
  handleDeleteStudent: () => {},
  toggleExpand: () => {},
  updateMiniGoal: () => {},
  updatePriority: () => {},
  handleUpdateGoal: () => {},
  updateNewStudentName: () => {},
  updateConfirmPassword: () => {},
  updatePassword: () => {},
  updateEmail: () => {},
  updateUsername: () => {},
  updatedLoggedIn: () => {},
  updateUserId: () => {},
  handleSignUpSubmit: () => {},
  handleReset: () => {},
  setError: () => {},
  clearError: () => {},
  setStudents: () => {}
});

export default Context;

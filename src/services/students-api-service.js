import config from '../config';

const StudentsApiService = {
  getStudents() {
    return fetch(`${config.API_ENDPOINT}/students`, {
      method: 'GET',
      headers: {
        'authorization': `bearer ${config.API_KEY}`
      },
    })
    .then(res => {
      return (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    })
  },

  postStudent(name) {
    return fetch(`${config.API_ENDPOINT}/students`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${config.API_KEY}`
      },
      body: JSON.stringify({
        name
      }),
    })
    .then(res => {
      return (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    })
  },

  deleteStudent(id) {
    return fetch(`${config.API_ENDPOINT}/students/${id}`, {
      method: 'DELETE',
      headers: {
        'authorization': `bearer ${config.API_KEY}`
      },
    })
    .then(res => {
      return (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    })
  },

  updateStudent(id, data) {
    return fetch(`${config.API_ENDPOINT}/students/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${config.API_KEY}`
      },
    })
    .then(res => {
      return (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    })
  },
}

export default StudentsApiService;
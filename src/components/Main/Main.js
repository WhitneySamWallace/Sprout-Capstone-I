import React from 'react';
import './Main.css';

function Main() {
  return (
    <div className="Main">
      <main>
        <header>
          <h2>Welcome back, username!</h2>
        </header>
        <section>
          <h3>Student List</h3>
          <ul>
            <li>
              <h4>Student Name</h4>
              <p>Student Goal</p>
              <p>Student Priority</p>
              <button>Check In</button>
              {/* UPON CLICKING CHECK IN */}
              <form>
                <div>
                  <label for="new-goal">New Goal:</label>
                  <input placeholder="New Mini-Goal" name="new-goal" id="new-goal" type="text"/>
                </div>
                <div>
                  <input type="radio" value="0" id="high" />
                  <label for="high">High</label>
                  <input type="radio" value="1" id="medium" />
                  <label for="medium">Medium</label>
                  <input type="radio" value="3" id="low" />
                  <label for="low">Low</label>
                </div>
                <button>Update</button>
              </form>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Main;
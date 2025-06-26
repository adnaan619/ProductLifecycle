import { useState } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Management App</h1>
        {user ? (
          <p>Welcome, {user.name}!</p>
        ) : (
          <p>Please log in to manage your tasks</p>
        )}
      </header>
      
      <main className="App-main">
        {!user ? (
          <div className="auth-container">
            <h2>Login / Register</h2>
            {/* Auth forms will go here */}
            <button>Login (placeholder)</button>
            <button>Register (placeholder)</button>
          </div>
        ) : (
          <div className="dashboard-container">
            <div className="task-list-container">
              <h2>Your Tasks</h2>
              {/* Task list will go here */}
              <ul className="task-list">
                {tasks.length === 0 ? (
                  <p>No tasks yet. Create your first task!</p>
                ) : (
                  tasks.map(task => (
                    <li key={task.id} className={`task-item ${task.status}`}>
                      <h3>{task.title}</h3>
                      <p>{task.description}</p>
                      <p>Status: {task.status}</p>
                      <p>Priority: {task.priority}</p>
                      {/* Task actions will go here */}
                    </li>
                  ))
                )}
              </ul>
              <button className="add-task-btn">Add New Task</button>
            </div>
            
            <div className="analytics-container">
              <h2>Task Analytics</h2>
              {/* Analytics charts will go here */}
              <div className="stats-placeholder">
                <div>To-Do: 0</div>
                <div>In Progress: 0</div>
                <div>Completed: 0</div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

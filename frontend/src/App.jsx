import { useState } from 'react';
import { mockTasks } from './mockData';

function App() {
  // 1. Tell React to remember our list of tasks
  const [tasks, setTasks] = useState(mockTasks);
  
  // 2. Tell React to remember what the user types in the form
  const [newTask, setNewTask] = useState({
    title: '',
    subject: '',
    deadline: '',
    estimatedMinutes: '',
    priority: 'low'
  });

  // 3. Update the form memory when the user types
  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  // 4. Add the task to the list when the button is clicked
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the page from refreshing
    const taskToAdd = {
      ...newTask,
      id: Date.now().toString(), // Creates a unique ID
    };
    
    setTasks([...tasks, taskToAdd]); // Adds the new task to our existing list
    setNewTask({ title: '', subject: '', deadline: '', estimatedMinutes: '', priority: 'low' }); // Clears the form
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>StudySync Task Dashboard</h1>
      
      {/* THE ADD TASK FORM */}
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #666', borderRadius: '5px' }}>
        <h3>Add New Task</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input type="text" name="title" placeholder="Task Title" value={newTask.title} onChange={handleInputChange} required />
          <input type="text" name="subject" placeholder="Subject" value={newTask.subject} onChange={handleInputChange} required />
          <input type="date" name="deadline" value={newTask.deadline} onChange={handleInputChange} required />
          <input type="number" name="estimatedMinutes" placeholder="Minutes" value={newTask.estimatedMinutes} onChange={handleInputChange} required />
          <select name="priority" value={newTask.priority} onChange={handleInputChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button type="submit">Add Task</button>
        </form>
      </div>

      {/* THE TASK LIST */}
      {tasks.length === 0 ? (
        <p>No tasks available. You are all caught up!</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {tasks.map((task) => (
            <li key={task.id} style={{ marginBottom: '15px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
              <strong>{task.title}</strong> ({task.subject})<br />
              Deadline: {task.deadline} | Time: {task.estimatedMinutes} mins | Priority: {task.priority}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
import { useState } from 'react';
import { mockTasks } from './mockData';

const initialTasks = mockTasks.map(task => ({ ...task, completed: false }));

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  
  const [newTask, setNewTask] = useState({
    title: '',
    subject: '',
    deadline: '',
    estimatedMinutes: '',
    priority: 'low'
  });

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskToAdd = {
      ...newTask,
      id: Date.now().toString(),
      completed: false
    };
    setTasks([...tasks, taskToAdd]);
    setNewTask({ title: '', subject: '', deadline: '', estimatedMinutes: '', priority: 'low' });
  };

  const handleDelete = (idToRemove) => {
    const updatedTasks = tasks.filter(task => task.id !== idToRemove);
    setTasks(updatedTasks);
  };

  const handleToggleComplete = (idToToggle) => {
    const updatedTasks = tasks.map(task => 
      task.id === idToToggle ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // NEW: Calculate progress statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const remainingTasks = totalTasks - completedTasks;
  const completionPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>StudySync Task Dashboard</h1>
      
      {/* THE ADD TASK FORM */}
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #666', borderRadius: '5px', backgroundColor: '#f9f9f9', color: '#333' }}>
        <h3 style={{ marginTop: 0 }}>Add New Task</h3>
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
          <button type="submit" style={{ cursor: 'pointer' }}>Add Task</button>
        </form>
      </div>

      {/* NEW: THE PROGRESS TRACKER */}
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#eef', borderRadius: '5px', color: '#333' }}>
        <h3 style={{ marginTop: 0 }}>Your Progress</h3>
        <p style={{ margin: '5px 0' }}>
          <strong>Total:</strong> {totalTasks} | <strong>Completed:</strong> {completedTasks} | <strong>Remaining:</strong> {remainingTasks}
        </p>
        <div style={{ width: '100%', backgroundColor: '#ccc', borderRadius: '5px', height: '20px', marginTop: '10px' }}>
          <div style={{ 
            width: `${completionPercentage}%`, 
            backgroundColor: '#4caf50', 
            height: '100%', 
            borderRadius: '5px',
            transition: 'width 0.3s ease-in-out'
          }}></div>
        </div>
        <p style={{ margin: '5px 0', textAlign: 'right', fontSize: '12px' }}>{completionPercentage}% Complete</p>
      </div>

      {/* THE TASK LIST */}
      {tasks.length === 0 ? (
        <p>No tasks available. You are all caught up!</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {tasks.map((task) => (
            <li key={task.id} style={{ 
              marginBottom: '15px', 
              border: '1px solid #ccc', 
              padding: '15px', 
              borderRadius: '5px',
              backgroundColor: task.completed ? '#e0ffe0' : 'transparent',
              textDecoration: task.completed ? 'line-through' : 'none'
            }}>
              <strong>{task.title}</strong> ({task.subject})<br />
              <span style={{ color: '#555' }}>Deadline: {task.deadline} | Time: {task.estimatedMinutes} mins | Priority: {task.priority}</span>
              
              <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                <button onClick={() => handleToggleComplete(task.id)} style={{ cursor: 'pointer' }}>
                  {task.completed ? 'Undo' : 'Mark as Done'}
                </button>
                <button onClick={() => handleDelete(task.id)} style={{ cursor: 'pointer', backgroundColor: '#ffcccc', border: '1px solid red' }}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
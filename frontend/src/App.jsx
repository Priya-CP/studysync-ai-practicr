import { useState } from 'react';
import { mockTasks } from './mockData';

const initialTasks = mockTasks.map(task => ({ ...task, completed: false }));

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [availableMinutes, setAvailableMinutes] = useState(180);
  const [studyPlan, setStudyPlan] = useState(null);
  
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
    const taskToAdd = { ...newTask, id: Date.now().toString(), completed: false };
    setTasks([...tasks, taskToAdd]);
    setNewTask({ title: '', subject: '', deadline: '', estimatedMinutes: '', priority: 'low' });
  };

  const handleDelete = (idToRemove) => setTasks(tasks.filter(task => task.id !== idToRemove));
  
  const handleToggleComplete = (idToToggle) => {
    setTasks(tasks.map(task => task.id === idToToggle ? { ...task, completed: !task.completed } : task));
  };

  // NEW: Fake API call for the Study Plan
  const handleGeneratePlan = () => {
    // In the future, this will be a real fetch() call to POST /api/study-plan
    // For now, we use the exact mock response from your API Contract
    const mockResponse = {
      plan: [
        {
          task: "Java OOP assignment",
          durationMinutes: 90,
          reason: "High-priority task"
        },
        {
          task: "DMS revision",
          durationMinutes: 60,
          reason: "Prepare for the upcoming test"
        }
      ],
      totalMinutes: 150
    };
    setStudyPlan(mockResponse);
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const remainingTasks = totalTasks - completedTasks;
  const completionPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>StudySync Task Dashboard</h1>
      
      {/* ADD TASK FORM */}
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

      {/* PROGRESS TRACKER */}
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#eef', borderRadius: '5px', color: '#333' }}>
        <h3 style={{ marginTop: 0 }}>Your Progress</h3>
        <p style={{ margin: '5px 0' }}>
          <strong>Total:</strong> {totalTasks} | <strong>Completed:</strong> {completedTasks} | <strong>Remaining:</strong> {remainingTasks}
        </p>
        <div style={{ width: '100%', backgroundColor: '#ccc', borderRadius: '5px', height: '20px', marginTop: '10px' }}>
          <div style={{ width: `${completionPercentage}%`, backgroundColor: '#4caf50', height: '100%', borderRadius: '5px', transition: 'width 0.3s ease-in-out' }}></div>
        </div>
      </div>

      {/* TASK LIST */}
      {tasks.length === 0 ? (
        <p>No tasks available. You are all caught up!</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {tasks.map((task) => (
            <li key={task.id} style={{ 
              marginBottom: '15px', border: '1px solid #ccc', padding: '15px', borderRadius: '5px',
              backgroundColor: task.completed ? '#e0ffe0' : 'transparent', textDecoration: task.completed ? 'line-through' : 'none'
            }}>
              <strong>{task.title}</strong> ({task.subject})<br />
              <span style={{ color: '#555' }}>Deadline: {task.deadline} | Time: {task.estimatedMinutes} mins | Priority: {task.priority}</span>
              <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                <button onClick={() => handleToggleComplete(task.id)} style={{ cursor: 'pointer' }}>{task.completed ? 'Undo' : 'Mark as Done'}</button>
                <button onClick={() => handleDelete(task.id)} style={{ cursor: 'pointer', backgroundColor: '#ffcccc', border: '1px solid red' }}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* NEW: STUDY PLAN GENERATOR */}
      <div style={{ marginTop: '30px', padding: '20px', border: '2px dashed #007bff', borderRadius: '5px' }}>
        <h2 style={{ marginTop: 0, color: '#007bff' }}>AI Study Planner</h2>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '15px' }}>
          <label>Available Study Time (minutes):</label>
          <input 
            type="number" 
            value={availableMinutes} 
            onChange={(e) => setAvailableMinutes(e.target.value)} 
            style={{ width: '80px', padding: '5px' }}
          />
          <button onClick={handleGeneratePlan} style={{ padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
            Generate Plan
          </button>
        </div>

        {studyPlan && (
          <div style={{ backgroundColor: '#f0f8ff', padding: '15px', borderRadius: '5px' }}>
            <h3>Recommended Schedule (Total: {studyPlan.totalMinutes} mins)</h3>
            <ol style={{ paddingLeft: '20px' }}>
              {studyPlan.plan.map((item, index) => (
                <li key={index} style={{ marginBottom: '10px' }}>
                  <strong>{item.task}</strong> - {item.durationMinutes} mins<br/>
                  <em style={{ color: '#666', fontSize: '14px' }}>Reason: {item.reason}</em>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

    </div>
  );
}

export default App;
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

  const handleGeneratePlan = () => {
    const mockResponse = {
      plan: [
        { task: "Java OOP assignment", durationMinutes: 90, reason: "High-priority task" },
        { task: "DMS revision", durationMinutes: 60, reason: "Prepare for the upcoming test" }
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
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto', color: '#ffffff' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>StudySync Task Dashboard</h1>
      
      {/* UPDATED: ADD TASK FORM */}
      <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #444', borderRadius: '8px', backgroundColor: '#1a1a1a' }}>
        <h3 style={{ marginTop: 0, borderBottom: '1px solid #333', paddingBottom: '10px' }}>Add New Task</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input type="text" name="title" placeholder="Task Title" value={newTask.title} onChange={handleInputChange} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: 'white' }} />
          <input type="text" name="subject" placeholder="Subject" value={newTask.subject} onChange={handleInputChange} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: 'white' }} />
          <input type="date" name="deadline" value={newTask.deadline} onChange={handleInputChange} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: 'white' }} />
          <input type="number" name="estimatedMinutes" placeholder="Minutes" value={newTask.estimatedMinutes} onChange={handleInputChange} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: 'white' }} />
          <select name="priority" value={newTask.priority} onChange={handleInputChange} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: 'white' }}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button type="submit" style={{ cursor: 'pointer', padding: '8px 15px', backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>Add Task</button>
        </form>
      </div>

      {/* UPDATED: PROGRESS TRACKER */}
      <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #444', borderRadius: '8px', backgroundColor: '#1a1a1a' }}>
        <h3 style={{ marginTop: 0, borderBottom: '1px solid #333', paddingBottom: '10px' }}>Your Progress</h3>
        <p style={{ margin: '10px 0' }}>
          <strong>Total:</strong> {totalTasks} | <strong>Completed:</strong> {completedTasks} | <strong>Remaining:</strong> {remainingTasks}
        </p>
        <div style={{ width: '100%', backgroundColor: '#333', borderRadius: '5px', height: '20px', marginTop: '10px' }}>
          <div style={{ width: `${completionPercentage}%`, backgroundColor: '#4caf50', height: '100%', borderRadius: '5px', transition: 'width 0.3s ease-in-out' }}></div>
        </div>
      </div>

      {/* TASK LIST */}
      {tasks.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>No tasks available. You are all caught up!</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {tasks.map((task) => (
            <li key={task.id} style={{ 
              marginBottom: '15px', border: '1px solid #444', padding: '15px', borderRadius: '8px',
              backgroundColor: task.completed ? 'rgba(76, 175, 80, 0.1)' : 'transparent', 
              textDecoration: task.completed ? 'line-through' : 'none',
              opacity: task.completed ? 0.6 : 1
            }}>
              <strong style={{ fontSize: '18px' }}>{task.title}</strong> <span style={{ color: '#aaa' }}>({task.subject})</span><br />
              <div style={{ color: '#ccc', margin: '8px 0' }}>Deadline: {task.deadline} | Time: {task.estimatedMinutes} mins | Priority: {task.priority}</div>
              <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                <button onClick={() => handleToggleComplete(task.id)} style={{ cursor: 'pointer', padding: '5px 10px', backgroundColor: task.completed ? '#555' : '#4caf50', color: 'white', border: 'none', borderRadius: '4px' }}>
                  {task.completed ? 'Undo' : 'Mark as Done'}
                </button>
                <button onClick={() => handleDelete(task.id)} style={{ cursor: 'pointer', padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* UPDATED: STUDY PLAN GENERATOR */}
      <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #007bff', borderRadius: '8px', backgroundColor: 'rgba(0, 123, 255, 0.05)' }}>
        <h2 style={{ marginTop: 0, color: '#66b0ff', borderBottom: '1px solid rgba(0, 123, 255, 0.2)', paddingBottom: '10px' }}>AI Study Planner</h2>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px' }}>
          <label>Available Study Time (minutes):</label>
          <input type="number" value={availableMinutes} onChange={(e) => setAvailableMinutes(e.target.value)} style={{ width: '80px', padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: 'white' }} />
          <button onClick={handleGeneratePlan} style={{ padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Generate Plan
          </button>
        </div>

        {studyPlan && (
          <div style={{ backgroundColor: '#1a1a1a', padding: '15px', borderRadius: '8px', border: '1px solid #333' }}>
            <h3 style={{ marginTop: 0, color: '#fff' }}>Recommended Schedule (Total: {studyPlan.totalMinutes} mins)</h3>
            <ol style={{ paddingLeft: '20px', color: '#ddd' }}>
              {studyPlan.plan.map((item, index) => (
                <li key={index} style={{ marginBottom: '15px' }}>
                  <strong style={{ color: '#fff', fontSize: '16px' }}>{item.task}</strong> - {item.durationMinutes} mins<br/>
                  <em style={{ color: '#aaa', fontSize: '14px' }}>Reason: {item.reason}</em>
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
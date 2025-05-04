import React, { useState, useEffect } from 'react';
import { firestore } from './firebase-config';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  // Real-time listener to fetch tasks
  useEffect(() => {
    const unsubscribe = firestore.collection('tasks').onSnapshot(snapshot => {
      const newTasks = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(newTasks);
    });

    return () => unsubscribe();
  }, []); // Only run on mount

  // Add a new task
  const addTask = async () => {
    if (taskName.trim()) {
      await firestore.collection('tasks').add({
        name: taskName,
        status: 'not-started', // Default status
      });
      setTaskName('');
    }
  };

  // Edit a task
  const editTask = async (taskId) => {
    if (editingTask) {
      await firestore.collection('tasks').doc(taskId).update({
        name: editingTask,
      });
      setEditingTask(null);
    }
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    await firestore.collection('tasks').doc(taskId).delete();
  };

  // Task count for each category
  const taskCounts = {
    notStarted: tasks.filter(task => task.status === 'not-started').length,
    ongoing: tasks.filter(task => task.status === 'ongoing').length,
    completed: tasks.filter(task => task.status === 'completed').length,
  };

  // Handle task status change
  const updateTaskStatus = async (taskId, status) => {
    await firestore.collection('tasks').doc(taskId).update({ status });
  };

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <h1>Task Management</h1>
        <div style={styles.counts}>
          <div
            style={styles.countCard}
            onMouseEnter={() => alert(`Not Started: ${taskCounts.notStarted}`)}
          >
            <h3>Not Started</h3>
            <p>{taskCounts.notStarted}</p>
          </div>
          <div
            style={styles.countCard}
            onMouseEnter={() => alert(`Ongoing: ${taskCounts.ongoing}`)}
          >
            <h3>Ongoing</h3>
            <p>{taskCounts.ongoing}</p>
          </div>
          <div
            style={styles.countCard}
            onMouseEnter={() => alert(`Completed: ${taskCounts.completed}`)}
          >
            <h3>Completed</h3>
            <p>{taskCounts.completed}</p>
          </div>
        </div>
      </nav>

      <div style={styles.taskForm}>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter task name"
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div style={styles.taskList}>
        {tasks.map((task) => (
          <div key={task.id} style={styles.taskItem}>
            {editingTask === task.id ? (
              <div>
                <input
                  type="text"
                  value={taskName}
                  onChange={(e) => setEditingTask(e.target.value)}
                />
                <button onClick={() => editTask(task.id)}>Save</button>
              </div>
            ) : (
              <div>
                <h4>{task.name}</h4>
                <p>Status: {task.status}</p>
                <button onClick={() => setEditingTask(task.id)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
                <button onClick={() => updateTaskStatus(task.id, 'completed')}>Mark as Completed</button>
                <button onClick={() => updateTaskStatus(task.id, 'ongoing')}>Mark as Ongoing</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
  },
  navbar: {
    backgroundColor: '#282c34',
    color: 'white',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  counts: {
    display: 'flex',
    gap: '1rem',
  },
  countCard: {
    backgroundColor: '#444',
    padding: '1rem',
    color: 'white',
    borderRadius: '8px',
    cursor: 'pointer',
    textAlign: 'center',
  },
  taskForm: {
    margin: '2rem',
    display: 'flex',
    gap: '1rem',
  },
  taskList: {
    margin: '2rem',
  },
  taskItem: {
    backgroundColor: '#f0f0f0',
    padding: '1rem',
    marginBottom: '1rem',
    borderRadius: '8px',
  },
};

export default App;

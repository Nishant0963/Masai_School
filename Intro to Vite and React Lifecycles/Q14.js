import React, { useState, useEffect } from 'react';
import { firestore } from './firebase-config'; // Assume correct config here.

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Real-time listener for task updates
    const unsubscribe = firestore.collection('tasks').onSnapshot(snapshot => {
      const newTasks = snapshot.docs.map(doc => doc.data());
      setTasks(newTasks);
    });

    // Cleanup listener when component unmounts
    return () => unsubscribe();
  }, []); // Empty array to run effect only once

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;

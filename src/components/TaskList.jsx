import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import styles from './TaskList.module.css'; 

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [searchId, setSearchId] = useState('');
    const [foundTask, setFoundTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/tasks/${id}`);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleEdit = (task) => {
        setEditingTask(task);
    };

    const handleFormSubmit = async (task) => {
        try {
            if (task.id) {
                await axios.put(`/tasks/${task.id}`, task);
            } else {
                await axios.post('/tasks', task);
            }
            setEditingTask(null);
            fetchTasks();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleTaskClick = async (id) => {
        try {
            const response = await axios.get(`/tasks/${id}`);
            setEditingTask(response.data);
            setSearchId('');
        } catch (error) {
            console.error('Error fetching task:', error);
        }
    };

    const handleSearchById = async () => {
        try {
            const response = await axios.get(`/tasks/${searchId}`);
            setFoundTask(response.data);
            setSearchId('');
        } catch (error) {
            console.error('Error fetching task:', error);
            setFoundTask(null);
        }
    };


    return (
        <div className={styles.taskList}>
            <h1>Task List</h1>
            <TaskForm onSubmit={handleFormSubmit} editingTask={editingTask} />
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder="Enter Task ID"
                    className={styles.inputText}
                />
                <button className={styles.button} onClick={handleSearchById}>
                    Search
                </button>
            </div>
            {foundTask && (
                <div className={styles.foundTask}>
                    <h2>Found Task</h2>
                    <TaskItem
                        task={foundTask}
                        onDelete={() => handleDelete(foundTask.id)}
                        onEdit={() => handleEdit(foundTask)}
                        onClick={() => setFoundTask(null)}
                    />
                </div>
            )}
            <ul>
                {tasks.map((task) => (
                    <li key={task.id} className={styles.listItem}>
                        <TaskItem
                            task={task}
                            onDelete={() => handleDelete(task.id)}
                            onEdit={() => handleEdit(task)}
                            onClick={() => handleTaskClick(task.id)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;








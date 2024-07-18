import React, { useState, useEffect } from 'react';
import styles from './TaskForm.module.css'; 

const TaskForm = ({ onSubmit, editingTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description);
        } else {
            setTitle('');
            setDescription('');
        }
    }, [editingTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title) {
            alert('Title is required');
            return;
        }
        onSubmit({ id: editingTask?.id, title, description });
        setTitle('');
        setDescription('');
    };

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <label>Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <button type="submit">{editingTask ? 'Update' : 'Create'} Task</button>
        </form>
    );
};

export default TaskForm;








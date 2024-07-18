import React, { useState, useEffect } from 'react';
import styles from './TaskForm.module.css';

const TaskForm = ({ onSubmit, editingTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description);
        } else {
            setTitle('');
            setDescription('');
        }
    }, [editingTask]);

    const validateForm = () => {
        const errors = {};

        if (!title.trim()) {
            errors.title = 'Title is required';
        }

        if (!description.trim()) {
            errors.description = 'Description is required';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            onSubmit({ id: editingTask?.id, title, description });
            setTitle('');
            setDescription('');
            setErrors({});
        }
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
                {errors.title && <span className={styles.error}>{errors.title}</span>}
            </div>
            <div>
                <label>Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {errors.description && <span className={styles.error}>{errors.description}</span>}
            </div>
            <button type="submit">{editingTask ? 'Update' : 'Create'} Task</button>
        </form>
    );
};

export default TaskForm;









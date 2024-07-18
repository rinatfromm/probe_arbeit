import styles from './TaskItem.module.css'
import React from 'react';


const TaskItem = ({ task, onDelete, onEdit, onClick }) => {
    return (
        <li onClick={onClick}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button className={styles.button} onClick={onEdit}>
                Edit
            </button>
            <button className={styles.button} onClick={onDelete}>
                Delete
            </button>
        </li>
    );
};

export default TaskItem;







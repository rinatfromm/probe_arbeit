import styles from "./App.module.css";
import React from "react";
import TaskList from "./components/TaskList";

const App = () => {
  return (
    <div className={styles.App}>
      <TaskList />
    </div>
  );
};

export default App;

import React from "react";
import ToggleButton from '@mui/material/ToggleButton';
import Task from "./Task";

export default function StatusLine(props) {
  const { status, tasks, addTask, deleteTask, addEmptyTask, moveTask, editTask } = props;
  let taskList, tasksForStatus;

  function handleAddEmpty() {
    addEmptyTask(status);
  }

  if (tasks) {
    tasksForStatus = tasks.filter((task) => {
      return task.status === status;
    });
  }

  if (tasksForStatus) {
    const statusTask = tasksForStatus.filter((value, index) => {
      const _value = JSON.stringify(value);
      return index === tasksForStatus.findIndex(obj => {
        return JSON.stringify(obj) === _value;
      });
    });

    taskList = statusTask.map((task) => {
      return (
        <Task
          addTask={(task) => addTask(task)}
          deleteTask={(id) => deleteTask(id)}
          moveTask={(id, status) => moveTask(id, status)}
          key={task.id}
          task={task}
          editTask={()=> editTask()}
        />
      );
    });
  }

  return (
    <div className="statusLine">
      <h3>{status}</h3>
      {taskList}
      <center>
      {status !== 'Done' ?
         <ToggleButton
         value="check"
         onClick={handleAddEmpty}
         style={{ 
           height:"50px", 
           width:"50px", 
           color:"black", 
           backgroundColor: "#c1c2c7", 
           marginLeft:"-70px", 
           borderRadius: "24px",
           marginTop:"20px"
          }}
       >
        <h2>&#43;</h2>
       </ToggleButton>
        : null}
        </center>
    </div>
  );
}

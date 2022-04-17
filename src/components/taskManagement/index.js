import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector } from 'react-redux'
import StatusLine from "./StatusLine";
import TaskForm from "../form/Task";

function taskManagement() {
    const task = useSelector((state) => state.task)
    const [open, setOpen] = useState(false);
    const [taskStatus, setTaskStatus] = useState();
    const [allTask, setAllTask] = useState({});
    const [editable, setEditable] = useState({});
    
    useEffect(()=>{
        setAllTask(task.allTask);
    },[task])

    const addEmptyTask = (status) => {
        setEditable(false)
        setTaskStatus(status)
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const setModalStatus = () =>{
        setEditable(true)
        setOpen(false);
    }

    return (
        <React.Fragment>
            <Grid container spacing={2} >
                <Grid item xs={12}>
                   <h2>Task Management</h2>
                </Grid>
                <Grid item xs={4}>
                    <StatusLine
                        tasks={allTask.Backlog}
                        addEmptyTask={() => addEmptyTask('Backlog')}
                        editTask={()=> setOpen(true)}
                        status="Backlog"
                    />
                </Grid>
                <Grid item xs={4}>
                    <StatusLine
                        tasks={allTask.InProgress}
                        addEmptyTask={() => addEmptyTask('InProgress')}
                        editTask={()=> setOpen(true)}
                        status="InProgress"
                    />
                </Grid>
                <Grid item xs={4}>
                    <StatusLine
                        tasks={allTask.Done}
                        addEmptyTask={() => addEmptyTask('Done')}
                        editTask={()=> setOpen(true)}
                        status="Done"
                    />
                </Grid>
            </Grid>

            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>{ editable ? `Update` : `Create` } Task</DialogTitle>
                <DialogContent>
                  <TaskForm modalStatus={setModalStatus} taskStatus={taskStatus} />
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}

export default taskManagement;

import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import moment from "moment";
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { useDispatch } from "react-redux";
import { moveTask, editableTask } from "../../store/actions/task";
import Clock from "./Clock";

export default function Task(props) {
  const dispatch = useDispatch();
  const { task } = props;

  function handleMoveLeft() {
    let newStatus = "";
    if (task.status === "InProgress") {
      newStatus = "Backlog";
    } else if (task.status === "Done") {
      newStatus = "InProgress";
    }
    dispatch(moveTask({ taskId: task.id, newStatus, oldStatus: task.status }));
  }

  function handleMoveRight() {
    let newStatus = "";
    if (task.status === "Backlog") {
      newStatus = "InProgress";
    } else if (task.status === "InProgress") {
      newStatus = "Done";
    }

    var currentDateTime = moment(new Date());
    var TaskCreateTime = moment(task.curruntDate);

    const spendTime = `${('0' + currentDateTime.diff(TaskCreateTime, 'days')).slice(-2)} Days ${('0' + currentDateTime.diff(TaskCreateTime, 'hours'))}:${('0' + currentDateTime.diff(TaskCreateTime, 'minutes'))}`
    dispatch(moveTask({ taskId: task.id, newStatus, oldStatus: task.status, spendTime }));
  }

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: task.priority === 'Low' ?
        '#2e7d32' :
        task.priority === 'Medium' ?
          '#44b700' :
          task.priority === 'High' ? '#ffc107' : null,
      color: task.priority === 'Low' ?
        '#2e7d32' :
        task.priority === 'Medium' ?
          '#44b700' :
          task.priority === 'High' ? '#ffc107' : null,

      boxShadow: `0 0 0 2px`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));

  const editTask = () => {
    props.editTask()
    dispatch(editableTask(task))
  }

  return (
    <Grid xs={10} mb={2}>
      <Card variant="outlined" style={{ backgroundColor: "#333747", color: "white" }}>
        <CardContent>
          <Grid xs={12} style={{ display: "flex", justifyContent: "flex-end", paddingTop: "10px" }} >
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            />
          </Grid>
          <Grid container mt={1}>
            <Grid xs={10}>
              <Typography variant="h5" component="div">
                {task.name}
              </Typography>
            </Grid>

          </Grid>
          <Typography color="white" >
            {task.description}
          </Typography>
          <Typography variant="h6" component="div">
            {
              task.status === "Done" ?
                `Total Spend Time: ${task.spendTime}`
                :
                <Clock deadline={task.endDate} />
            }
          </Typography>
        </CardContent>
        {
          task.status === 'InProgress' ?
            <Grid container>
              <Grid xs={5} mb={1} style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button style={{ backgroundColor: "#fa0139", color: "white" }} onClick={handleMoveLeft} variant="contained" >
                  Backlog
                </Button></Grid>
              <Grid xs={2} ml={2} mb={1} style={{ display: "flex", justifyContent: "flex-start" }} >
                <Button style={{ backgroundColor: "#fa0139", color: "white" }} onClick={handleMoveRight} variant="contained" >
                  Done
                </Button>
              </Grid>
              <Grid xs={4} mb={1} style={{ display: "flex", justifyContent: "flex-start" }} >
                <Button style={{ backgroundColor: "#fa0139", color: "white" }} onClick={() => editTask()} variant="contained" >
                  Edit
                </Button>
              </Grid>

            </Grid>
            : task.status === 'Backlog' ?
              <Grid container>
                <Grid xs={6} style={{ display: "flex", justifyContent: "flex-end" }} mr={1} mb={1}>
                  <Button style={{ backgroundColor: "#fa0139", color: "white" }} onClick={handleMoveRight} variant="contained" >
                    In Progress
                  </Button>
                </Grid>
                <Grid xs={5} mb={1} style={{ display: "flex", justifyContent: "flex-start" }} >
                  <Button style={{ backgroundColor: "#fa0139", color: "white" }} onClick={() => editTask()} variant="contained" >
                    Edit
                  </Button>
                </Grid> </Grid> : null
        }
      </Card>
    </Grid>
  );
}

import React, { useState, useEffect } from 'react';
import { Formik, Form } from "formik";
import * as yup from 'yup';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useDispatch, useSelector } from "react-redux";
import { create, update } from "../../store/actions/task";
import moment from 'moment';

const validationSchema = yup.object({
  name: yup
    .string('Enter Task Name')
    .max(100, 'Task Name should be of maximum 20 characters length')
    .required('Enter Task Name'),
  description: yup
    .string('Enter Task Description')
    .max(200, 'Task Description should be of maximum 200 characters length')
    .required('Enter Task Description'),
  priority: yup.string(),
  dateTime: yup.date().required('Enter Date and Time')
});

const Task = (props) => {
  const [defaultValues, setDefaultValues] = useState({
    name: '',
    description: '',
    priority: 'Medium',
    dateTime: moment()
  });
  const [editableId, setEditableId] = useState();
  const dispatch = useDispatch();
  const task = useSelector((state) => state.task)

  useEffect(() => {
    if (task.editableTask) {
      task.editableTask.dateTime = task.editableTask.endDate;
      setEditableId(task.editableTask.id)
      setDefaultValues(task.editableTask)
    }
  }, [task.editableTask])

  const saveChanges = (values) => {
    const { name, description, priority, dateTime } = values;
    if (editableId) {
      dispatch(
        update(
          editableId,
          {
            id: editableId,
            name,
            description,
            priority,
            endDate: moment(dateTime).format('MM/DD/YYYY HH:mm'),
            curruntDate: defaultValues.curruntDate,
            status: props.taskStatus,
          }
        )
      );
    } else {
      dispatch(
        create(
          {
            id: (Math.random() + 1).toString(36).substring(7),
            name,
            description,
            priority,
            endDate: moment(dateTime).format('MM/DD/YYYY HH:mm'),
            curruntDate: moment().format('MM/DD/YYYY HH:mm'),
            status: props.taskStatus,
          }
        )
      );
    }

    props.modalStatus()
  }

  return (
    <Formik
      enableReinitialize
      initialValues={defaultValues}
      validationSchema={validationSchema}
      onSubmit={(values) => saveChanges(values)}
    >
      {
        ({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          setFieldValue
        }) => (
          <Form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              id="name"
              variant="standard"
              name="name"
              label="Task Name"
              autoComplete='off'
              value={values.name}
              onChange={handleChange}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            /><br /><br />
            <TextField
              fullWidth
              id="description"
              variant="standard"
              name="description"
              label="Task Description"
              autoComplete='off'
              value={values.description}
              onChange={handleChange}
              error={touched.description && Boolean(errors.description)}
              helperText={touched.description && errors.description}
            /><br /><br />
            <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">Priority</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                name="priority"
                value={values.priority}
                label="Priority"
                onChange={(e) => setFieldValue(e.target.name, e.target.value)}
              >
                <MenuItem value='Low'>Low</MenuItem>
                <MenuItem value='Medium'>Medium</MenuItem>
                <MenuItem value='High'>High</MenuItem>
              </Select>
            </FormControl><br /><br />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <DateTimePicker
                  name="dateTime"
                  value={values.dateTime}
                  minDate={new Date()}
                  label="Add Time"
                  onChange={(dateTime) => setFieldValue('dateTime', dateTime)}
                  renderInput={(params) => <TextField {...params}
                    error={touched.dateTime && Boolean(errors.dateTime)}
                    helperText={touched.dateTime && errors.dateTime}
                  />}
                />
              </Stack>
            </LocalizationProvider><br />
            <Button style={{ backgroundColor:"#00b440" }} variant="contained" fullWidth type="submit">
              Save
            </Button>
          </Form>
        )
      }
    </Formik>
  );
};
export default Task;
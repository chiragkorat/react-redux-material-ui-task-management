import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TaskManagement from "./taskManagement";

export default function Task(props) {
  const card = (
    <React.Fragment>
      <CardContent>
        <TaskManagement />
      </CardContent>
    </React.Fragment>
  );

  return (<div >
    <Box sx={{ minWidth: 275 }} >
      <Card variant="outlined" style={{ backgroundColor: '#21242e', color: '#c1c2c7'}}>
        {card}
      </Card>
    </Box>
  </div>
  );
}

import React from 'react';
import { BrowserRouter, Switch} from 'react-router-dom';
import Task from '../components/Task';
import PublicRoute from './PublicRouter';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <PublicRoute path="/" component={Task} exact={true} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
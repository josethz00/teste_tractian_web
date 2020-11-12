import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CreateRecords from '../pages/CreateRecords';
import Home from '../pages/Home';


const Routes: React.FC = () => (

  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/create-records' component={CreateRecords} />
    </Switch>
  </BrowserRouter>

);

export default Routes;

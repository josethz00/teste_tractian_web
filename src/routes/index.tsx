import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CreateRecords from '../pages/CreateRecords';
import Home from '../pages/Home';


const Routes: React.FC = () => {

  return (

    <BrowserRouter>
      <Switch>
        <Route path='/' component={Home} />
        <Route path='create-records' component={CreateRecords} />
      </Switch>
    </BrowserRouter>

  );

};

export default Routes;

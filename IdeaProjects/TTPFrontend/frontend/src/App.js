import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Main from './pages/Main/mainPage.js';
import TrialPlot from './pages/TrialPlot/createTrialPage.js';
import EditTrialPage from './pages/TrialPlot/editTrialPage.js';
import {appRoutes} from './globalVariables.js';
import MainTrialPlot from './pages/TrialPlot/mainTrialPlot';

function App() {
  return (
   <Router>
      <Switch>
        <Redirect exact from="/" to="/main" />
        <Route path="/main" component={Main}/>
        <Route path="/trial-plot" component={TrialPlot}/>
        <Route path={"/editTrial/:id"} component={EditTrialPage} />
        <Route path="/trialPlot/:id" component={MainTrialPlot}/>
      </Switch>
   </Router>
   
  );
}

export default App;

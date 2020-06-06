import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import Main from './pages/Main/mainPage.js';
import TrialPlot from './pages/TrialPlot/trialPage.js';

function App() {
  return (
   <Router>
      <Redirect exact from="/" to="/main" />
      <Route path="/main" component={Main}/>
      <Route path="/trial-plot" component={TrialPlot}/>
   </Router>
  );
}

export default App;

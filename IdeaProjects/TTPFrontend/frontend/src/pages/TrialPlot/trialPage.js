import React from 'react';
import Header from '../../components/Header/header.js';
import TrialPlotService from '../../services/TrialPlotService';

class TrialPlot extends React.Component {
    state = {
        rayons: []
    }

    componentWillMount() {
        const rayons = TrialPlotService.getAllRayons();

        this.setState(rayons);
    }

    render() {
        return(
            <Header />
        )
    }
}

export default TrialPlot;
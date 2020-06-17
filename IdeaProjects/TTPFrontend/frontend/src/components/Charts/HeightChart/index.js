import React from 'react';
import { ScatterChart } from './ScatterSeries';
import SplineChart from './SplineChart';


class HeightChart extends React.Component {

    render() {
        const {scatterChartData, splineChartData} = this.props;

        const scatterDots = [];
        const splineDots = [];
        //argument - x
        //value - y
        scatterChartData.forEach(item => {
            scatterDots.push({
                arg1: item.diameter,
                val1: item.height
            });
        });

        splineChartData.forEach(item => {
            splineDots.push({
                height: item.height,
                diameter: item.stupen
            });
        })

        return(
            <>
                <ScatterChart data={scatterDots}/>
                <div className="spline-chart">
                    <SplineChart data={splineDots}/>
                </div>
           </>
        )
    }
}

export default HeightChart;
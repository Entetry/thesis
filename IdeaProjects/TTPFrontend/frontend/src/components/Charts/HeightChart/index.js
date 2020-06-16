import React from 'react';
import { ScatterChart } from './ScatterSeries';


class HeightChart extends React.Component {

    render() {
        const {data} = this.props;

        const scatterDots = [];
        //argument - x
        //value - y
        data.forEach(item => {
            scatterDots.push({
                arg1: item.diameter,
                val1: item.height
            })
        });

        return(
           <ScatterChart data={scatterDots}/>
        )
    }
}

export default HeightChart;
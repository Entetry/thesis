import React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
  ScatterSeries,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';

export const ScatterChart = props => {
    return(
        <Paper>
            <Chart data={props.data}>
                <ArgumentAxis />
                <ValueAxis />
                <ScatterSeries
                    valueField="val1"
                    argumentField="arg1"
                    color="green"
                    point={{size: 10}}
                />
                <Animation />
            </Chart>
        </Paper>
    )
}
import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { ArgumentScale, Animation } from '@devexpress/dx-react-chart';
import {
  curveCatmullRom,
  line,
} from 'd3-shape';
import { scalePoint } from 'd3-scale';

const Line = props => (
  <LineSeries.Path
    {...props}
    path={line()
      .x(({ arg }) => arg)
      .y(({ val }) => val)
      .curve(curveCatmullRom)}
  />
);


class SplineChart extends React.PureComponent {

    render() {

    return (
      <Paper>
        <Chart
          data={this.props.data}
        >
          {/* <ArgumentScale factory={scalePoint} /> */}
          <ArgumentAxis />
          <ValueAxis/>

          <LineSeries
            // name="Hydro-electric"
            valueField="height"
            argumentField="diameter"
            seriesComponent={Line}
          />
          {/* <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} />
          <Legend position="left" rootComponent={Root} itemComponent={Item} labelComponent={Label} />
          <Title
            text="Energy Consumption in 2004\n(Millions of Tons, Oil Equivalent)"
            textComponent={Text}
          /> */}
          <Animation />
        </Chart>
      </Paper>
    );
  }
}

export default SplineChart;
import React, {forwardRef} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const columns = [
    {title: 'Номер пробной площади', field: 'id', type: 'numeric'},
    {title: 'Область', field: 'yarus'},
    {title: 'Район', field: 'pokolenie', type: 'numeric'},
    {title: 'Лесхоз', field: 'sostavCoeficient', type: 'numeric'},
    {title: 'Лесничество', field: 'averageAge', type: 'numeric'},
    {title: 'Основная порода', field: 'averageHeight', type: 'numeric'},
];

class SearchResultTable extends React.Component {


    rowClick = id => {
        console.log('PROPS', this.props);
        const {props} = this.props;
        props.history.push(`/trialPlot/${id}`);
    }

    render() {
        const {data} = this.props;

        return(
            <TableContainer component={Paper}>
                <Table className="" aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        {columns.map(column => {
                            return(
                                <TableCell align="left">{column.title}</TableCell>
                            );
                        })}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, i) => {
                            return(
                                // <div onClick={() => this.rowClick(item.id)}>
                                    <TableRow key={i}>
                                        <TableCell onClick={() => this.rowClick(item.id)} component="th" scope="row">
                                            {item.id}
                                        </TableCell>
                                        <TableCell onClick={() => this.rowClick(item.id)} align="left">{item.region.name}</TableCell>
                                        <TableCell onClick={() => this.rowClick(item.id)} align="left">{item.rayon.name}</TableCell>
                                        <TableCell onClick={() => this.rowClick(item.id)} align="left">{item.leshoz.name}</TableCell>
                                        <TableCell onClick={() => this.rowClick(item.id)} align="left">{item.lesnichestvo.name}</TableCell>
                                        <TableCell onClick={() => this.rowClick(item.id)} align="left">{item.porodaInfo == null ? 'нету' : item.porodaInfo.name}</TableCell>
                                    </TableRow>
                                // </div>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}

export default SearchResultTable;
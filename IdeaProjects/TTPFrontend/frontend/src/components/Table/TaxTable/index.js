import React, {forwardRef} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const columns = [
    {title: 'Порода', field: 'poroda', type: 'numeric'},
    {title: 'Ярус', field: 'yarus'},
    {title: 'Поколение', field: 'pokolenie', type: 'numeric'},
    {title: 'Коэффиц.состава', field: 'sostavCoeficient', type: 'numeric'},
    {title: 'Возраст', field: 'averageAge', type: 'numeric'},
    {title: 'Средняя высота, м', field: 'averageHeight', type: 'numeric'},
    {title: 'Диаметр, см', field: 'averageDiameter', type: 'numeric'},
    {title: 'Количество деловых', field: 'amoutDelovih', type: 'numeric'},
    {title: (<p>Сумма площадей сечения, м<sup>2</sup></p>), field: 'summPloshSech', type: 'numeric'},
    {title: 'Полнота', field: 'polnota', type: 'numeric'},
    {title: 'Класс бонитета', field: 'bonitetClass', type: 'numeric'},
    {title: (<p>Запас растущих, м<sup>3</sup></p>), field: 'rastStock', type: 'numeric'},
    {title: (<p>Запас деловых, м<sup>3</sup></p>), field: 'delStock', type: 'numeric'},
    {title: (<p>Запас сухостойных, м<sup>3</sup></p>), field: 'suhStock', type: 'numeric'},
    {title: '% выхода деловой древесины', field: 'yieldPercentage', type: 'numeric'},
];

class TaxTable extends React.Component {
    render() {
        const {data} = this.props;

        return(
            <TableContainer component={Paper}>
                <Table className="" aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        {columns.map(column => {
                            return(
                                <TableCell align="right">{column.title}</TableCell>
                            );
                        })}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, i) => {
                            const {
                                poroda,
                                yarus,
                                pokolenie,
                                sostavCoeficient,
                                averageAge,
                                averageHeight,
                                averageDiameter,
                                amoutDelovih,
                                summPloshSech,
                                polnota,
                                bonitetClass,
                                rastStock,
                                delStock,
                                suhStock,
                                yieldPercentage
                            } = item;
                            return(
                                <>
                                    <TableRow key={i}>
                                        <TableCell component="th" scope="row">
                                            {poroda.name}
                                        </TableCell>
                                        <TableCell align="center">{yarus}</TableCell>
                                        <TableCell align="center">{pokolenie}</TableCell>
                                        <TableCell align="center">{sostavCoeficient}</TableCell>
                                        <TableCell align="center">{averageAge}</TableCell>
                                        <TableCell align="center">{averageHeight}</TableCell>
                                        <TableCell align="center">{averageDiameter}</TableCell>
                                        <TableCell align="center">{amoutDelovih}</TableCell>
                                        <TableCell align="center">{summPloshSech}</TableCell>
                                        <TableCell align="center">{polnota}</TableCell>
                                        <TableCell align="center">{bonitetClass}</TableCell>
                                        <TableCell align="center">{rastStock}</TableCell>
                                        <TableCell align="center">{delStock}</TableCell>
                                        <TableCell align="center">{suhStock}</TableCell>
                                        <TableCell align="center">{yieldPercentage}</TableCell>
                                    </TableRow>
                                </>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}

export default TaxTable;
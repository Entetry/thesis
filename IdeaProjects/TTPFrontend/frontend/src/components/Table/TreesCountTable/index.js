import React, {forwardRef} from 'react';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import PerechetService from '../../../services/PerechetService';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const columns = [
    {title: 'Ступень толщины', field: 'stupen', type: 'numeric'},
    {title: 'Деловых', field: 'delovyh', type: 'numeric'},
    {title: 'Дровяных', field: 'drovyanyh', type: 'numeric'},
    {title: 'Сухостойных', field: 'suhostoynyh', type: 'numeric'},
];

class TreesCountTable extends React.Component {
    state = {
        perechetData: [],
    }

    componentWillReceiveProps = props => {
        const {perechetData} = this.state;
        const {poroda} = props;
        
        this.setState({perechetData: [...poroda.perechetList]})
    }

    componentDidMount = () => {
        const {perechetData} = this.state;
        const {poroda} = this.props;
        this.setState({perechetData: [...poroda.perechetList]})
    }

render(){
    const {perechetData} = this.state;
    
    return (
        <MaterialTable
            icons={tableIcons}
            title="Перечёт растущих и сухостойных деревьев"
            columns={columns}
            data={perechetData}
            editable={{
                onRowAdd: (data) => new Promise((resolve, reject) => {
                    if (data.delovyh.toString() == "" ) {
                        data.delovyh = 0;
                    }
                    
                    if (data.delovyh.toString().endsWith(',')) {
                        alert('Неправильно введённое число');
                        reject();
                        return;
                    }

                    if (data.stupen.toString() == "" || data.stupen.toString().endsWith(',')) {
                        alert('Неправильно введённое число');
                        reject();
                        return;
                    }

                    if (data.drovyanyh.toString() == "") {
                        data.drovyanyh = 0;
                    }

                    if (data.drovyanyh.toString().endsWith(',')) {
                        alert('Неправильно введённое число');
                        reject();
                        return;
                    }

                    if (data.suhostoynyh.toString() == "") {
                        data.suhostoynyh = 0;
                    }

                    if (data.suhostoynyh.toString().endsWith(',')) {
                        alert('Неправильно введённое число');
                        reject();
                        return;
                    }

                    if (+data.suhostoynyh < 0) {
                        alert('Количество сухостойных не может быть отрицательным');
                        reject();
                        return;
                    }

                    if (+data.drovyanyh < 0) {
                        alert('Количество дровяных не может быть отрицательным');
                        reject();
                        return;
                    }

                    if (+data.stupen < 0) {
                        alert('Ступень не может быть отрицательным');
                        reject();
                        return;
                    }

                    if (+data.delovyh < 0) {
                        alert('Количество деловых не может быть отрицательным');
                        reject();
                        return;
                    }

                    data.porodaId = this.props.poroda.id;
                    PerechetService.savePerechet(data).then(response => {
                        resolve();
                        this.setState({perechetData: [...perechetData, response]});
                    }).catch(err => {
                        if (err.status == 500) {
                            reject();
                            alert('Вы ввели некорректные данные');
                            return;
                        }
                    });;
                }),
                onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
                    if (newData.delovyh.toString() == "" || newData.delovyh.toString().endsWith(',')) {
                        alert('Неправильно введённое число');
                        reject();
                        return;
                    }

                    if (newData.stupen.toString() == "" || newData.stupen.toString().endsWith(',')) {
                        alert('Неправильно введённое число');
                        reject();
                        return;
                    }

                    if (newData.drovyanyh.toString() == "" || newData.drovyanyh.toString().endsWith(',')) {
                        alert('Неправильно введённое число');
                        reject();
                        return;
                    }

                    if (newData.suhostoynyh.toString() == "" || newData.suhostoynyh.toString().endsWith(',')) {
                        alert('Неправильно введённое число');
                        reject();
                        return;
                    }

                    newData.porodaId = this.props.poroda.id;
                    PerechetService.editPerechet(newData).then(response => {
                        resolve();
                        let t = [...perechetData];
                        perechetData.forEach((x, i) => {
                            if(x.id == newData.id) {
                                t[i] = newData;
                                this.setState({perechetData: t})
                            }
                        })
                    })
                }),
                onRowDelete: (oldData) => new Promise((resolve) => {
                        PerechetService.deletePerechet(oldData.id).then(response => {
                            resolve();
                            let t = [...perechetData];
                            perechetData.forEach((x, i) => {
                            if(x.id == oldData.id){
                                t.splice(i, 1);
                                this.setState({perechetData: t});
                            }
                        });
                        })
                }),
            }}
            options={{
                filtering: true,
                search: false,
            }}
        />
    );
}
}

export default TreesCountTable;
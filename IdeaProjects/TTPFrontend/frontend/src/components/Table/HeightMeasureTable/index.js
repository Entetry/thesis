import React, {forwardRef} from 'react'
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
import HeightMeasureService from '../../../services/HeightMeasureService';

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
    {title: 'Диаметр', field: 'diameter', type: 'numeric'},
    {title: 'Высота', field: 'height', type: 'numeric'},
];

class HeightMeasureTable extends React.Component {
    state = {
        heightMeasureData: [],
    }

    componentWillReceiveProps = props => {
        const {heightMeasureData} = this.state;
        const {poroda, toRemoveTableState} = props;
        
        // if(toRemoveTableState){
        //     this.setState({heightMeasureData: []});
        //     return;
        // }

        this.setState({heightMeasureData: [...poroda.heightMeasureList]})
        
    }

    componentWillUnmount = () => {
        console.log('UNMOUNT');
        this.setState({heightMeasureData: []});
    }

    componentDidMount = () => {
        // console.log('BEEEEEEEEEEP', this.props.poroda);
        const {heightMeasureData} = this.state;
        const {poroda, toRemoveTableState} = this.props;

        // if(toRemoveTableState){
        //     this.setState({heightMeasureData: []});
        //     return;
        // }

        console.log('DID MOUNT', poroda);

        this.setState({heightMeasureData: [...poroda.heightMeasureList]})
    }


    render() {
        const {heightMeasureData} = this.state;
        const {poroda} = this.props;

        return (
            <MaterialTable
            icons={tableIcons}
            title="Результаты замеров высот"
            columns={columns}
            data={heightMeasureData}
            editable={{
                onRowAdd: (data) => new Promise((resolve, reject) => {
                    if (data.height == undefined ||
                        data.height == null || data.diameter == null ||
                        data.diameter == undefined) {
                        alert('Вы ввели не все поля!');
                        reject();
                        return;
                    }

                    if (data.height == "") {
                        data.height = 0;
                    }

                    if (data.diameter == "") {
                        data.diameter = 0;
                    }

                    if (data.height < 0 || data.diameter < 0) {
                        alert('Значение не может быть отрицательным');
                        reject();
                        return;
                    }

                    if (data.height.toString().endsWith(',')) {
                        alert('Неправильно введённое число', data.height);
                        reject();
                        return;
                    }

                    if (data.diameter.toString().endsWith(',')) {
                        alert('Неправильно введённое число', data.diameter);
                        reject();
                        return;
                    }

                    if(JSON.stringify(data) == "{}"){
                        alert('Пустые данные');
                        reject();
                        return;
                    }

                    data.poroda = poroda.id;
                    HeightMeasureService.saveHeightMeasure(data).then(response => {
                        resolve();
                        this.setState({heightMeasureData: [...heightMeasureData, response]});
                    }).catch(err => {
                        if (err.status == 500) {
                            reject();
                            alert('Вы ввели некорректные данные');
                            return;
                        }
                    });
                }),
                onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
                    if (oldData.diameter == newData.diameter && oldData.height == newData.height) {
                        reject();
                        return;
                    }

                    if (newData.height == "" || newData.height == undefined ||
                        newData.height == null || newData.diameter == "" ||
                        newData.diameter == null || newData.diameter == undefined) {
                        alert('Вы ввели не все поля!');
                        reject();
                        return;
                    }
                    if (newData.height.toString().endsWith(',') || newData.height == "") {
                        alert('Неправильно введённое число', newData.height);
                        reject();
                        return;
                    }

                    if (newData.diameter.toString().endsWith(',') || newData.diameter == "") {
                        alert('Неправильно введённое число', newData.diameter);
                        reject();
                        return;
                    }

                    if(JSON.stringify(newData) == "{}"){
                        alert('Пустые данные');
                        reject();
                        return;
                    }

                    HeightMeasureService.editHeightMeasure(newData).then(response => {
                        resolve();
                        let t = [...heightMeasureData];
                        heightMeasureData.forEach((x, i) => {
                            if(x.id == newData.id){
                                t[i] = newData;
                                this.setState({heightMeasureData: t})
                            }
                        })
                    })
                }),
                onRowDelete: (oldData) => new Promise((resolve) => {
                    HeightMeasureService.deleteHeightMeasure(oldData.id).then(response => {
                        resolve();
                        let t = [...heightMeasureData];
                        heightMeasureData.forEach((x, i) => {
                            if(x.id == oldData.id){
                                t.splice(i, 1);
                                this.setState({heightMeasureData: t});
                            }
                        });
                    })
                    resolve();
                }),
            }}
            options={{
                filtering: false,
                search: false,
            }}
        />
        );
    }
}

export default HeightMeasureTable;
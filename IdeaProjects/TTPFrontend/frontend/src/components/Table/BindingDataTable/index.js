import React, {forwardRef} from 'react';
import GeoDataService from '../../../services/GeoDataService/index.js';
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
    {title: 'Номер', field: 'number', type: 'numeric',},
    {title: 'X', field: 'x', type: 'numeric'},
    {title: 'Y', field: 'y', type: 'numeric'},
    {title: 'Угол направления', field: 'directionAngle', type: 'numeric'},
    {title: 'Горизонтальное расстояние', field: 'horizontalDistance', type: 'numeric'},
    {title: 'Внутренний угол', field: 'insideAngle', type: 'numeric'},
    // {title: 'Привязка', field: 'isBindingLine'},
    {title: 'Румб', field: 'rhumb', type: 'numeric'},
];

class BindingDataTable extends React.Component {
    state = {
        geoData: []
    }

    componentWillReceiveProps = (props) => {
        this.setState({geoData: props.geoData});
    }
    
render(){
    const {geoData} = this.state;
    const {trialPlotId} = this.props;
    return (
        <MaterialTable
            icons={tableIcons}
            title="Данные привязки"
            columns={columns}
            data={geoData}
            editable={{
                onRowAdd: (data) => new Promise((resolve, reject) => {
                    if(geoData.length == 4){
                        alert('Вы не можете добавить больше 4 точек')
                        reject();
                        return;
                    }
                    data.trialPlotId = trialPlotId;
                    GeoDataService.createGeoData(data).then(response => {
                        resolve();

                        if(geoData.length == 3) {
                            const fifthDot = geoData[0];
                            fifthDot.trialPlotId = trialPlotId;
                            GeoDataService.createGeoData(fifthDot).then(resp => {
                                this.setState({geoData: [...geoData, response, resp]});
                                return;
                            })
                        }

                        this.setState({geoData: [...geoData, response]});
                    });
                }),
                onRowUpdate: (newData, oldData) => new Promise((resolve) => {
                    GeoDataService.editGeoData(newData).then(resp => {
                        resolve();
                        let t = [...geoData];
                        geoData.forEach((x, i) => {
                            if(x.id == newData.id){
                                t[i] = newData;
                                this.setState({geoData: t})
                            }
                        });
                    })
                }),
                onRowDelete: (oldData) => new Promise((resolve) => {
                    GeoDataService.deleteGeoData(oldData.id).then(resp => {
                        resolve();
                        let t = [...geoData];
                        geoData.forEach((x, i) => {
                            if(x.id == oldData.id){
                                t.splice(i, 1);
                                this.setState({geoData: t});
                            }
                        });
                    })
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

export default BindingDataTable;


import React from 'react';
import Header from '../../components/Header/header.js';
import TrialPlotService from '../../services/TrialPlotService';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import './style.css';

class TrialPlot extends React.Component {
    state = {
        regions: [],
        lesHoses: [],
        lesnichestvas: [],
        selectedRegionName: '',
        selectedRayonName: '',
        selectedPLHOName: '',
        selectedLesHosName: '',
        selectedLesnichestvoName: '',
    }

    async componentDidMount() {
        const regions = await TrialPlotService.getAllRegions();
        const lesHoses = await TrialPlotService.getAllLesHoses();
        const lesnichestvas = await TrialPlotService.getAllLesnichestvas();  
        
        this.setState({regions: regions, lesHoses: lesHoses, lesnichestvas: lesnichestvas});
        console.log(this.state.regions);
    }

    regionOnChange = e => {
        this.setState({selectedRegionName: e.target.value});
    }

    rayonOnChange = e => {
        this.setState({selectedRayonName: e.target.value});
    }

    PLHOOnChange = e => {
        this.setState({selectedPLHOName: e.target.value});
    }

    lesHosOnChange = e => {
        this.setState({selectedLesHosName: e.target.value});
    }

    lesnichestvoOnChange = e => {
        this.setState({selectedLesnichestvoName: e.target.value});
    }

    render() {
        const {
            regions,
            selectedRegionName,
            selectedRayonName,
            selectedLesHosName,
            selectedLesnichestvoName,
            selectedPLHOName,
            lesHoses,
            lesnichestvas,
        } = this.state;

        

        return(
            <>
                <Header />
                <div id="container">
                    <div className="base-title title">
                        <p>Создание новой пробной площади</p>
                    </div>
                    <div className="base-title card-title">
                        <p>Карточка пробной площади</p>
                    </div>
                    <div className="plot-info">
                        <div className="info base-title">
                            <p>Область</p>
                            <p>Район</p>
                            <p>ПЛХО</p>
                            <p>Лесхоз</p>
                            <p>Лесничество</p>
                            <p>Выдел</p>
                            <p>Площадь пробы</p>
                            <p>Квартал</p>
                            <p>ТУМ</p>
                            <p>Покров</p>
                            <p>Положение и рельеф</p>
                            <p>Особенности древостоя</p>
                            <p>Тип леса</p>
                            <p>Почва</p>
                            <p>Исполнитель</p>
                        </div>
                        <div className="plot-dropdowns">
                            <Select className="dropdown" value={selectedRegionName} onChange={this.regionOnChange}>
                                {regions.map(x => {
                                    
                                    return <MenuItem className="base-title" value={x.id}>{x.name}</MenuItem>
                                })}
                            </Select>
                            <Select className="dropdown base-title" value={selectedRayonName} onChange={this.rayonOnChange}>
                                {regions.map(x => {
                                    return x.rayonList.map(y => 
                                        <MenuItem value={y.id}>{y.name}</MenuItem>
                                    )
                                })}
                            </Select>
                            <Select className="dropdown base-title" value={selectedPLHOName} onChange={this.PLHOOnChange}>
                                {regions.map(x => {
                                        return x.plhoList.map(y => 
                                            <MenuItem value={y.id}>{y.plhol}</MenuItem>
                                        )
                                    })}
                            </Select>
                            <Select className="dropdown base-title" value={selectedLesHosName} onChange={this.lesHosOnChange}>
                                {lesHoses.map(x => {
                                    return <MenuItem value={x.id}>{x.name}</MenuItem>
                                })}
                            </Select>
                            <Select className="dropdown base-title" value={selectedLesnichestvoName} onChange={this.lesnichestvoOnChange}>
                                {lesnichestvas.map(x => {
                                    return <MenuItem value={x.id}>{x.name}</MenuItem>
                                })}
                            </Select>
                            
                            <p>DROP</p>
                            <p>DROP</p>
                            <p>DROP</p>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default TrialPlot;
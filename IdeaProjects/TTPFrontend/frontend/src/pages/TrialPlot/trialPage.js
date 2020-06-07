import React from 'react';
import Header from '../../components/Header/header.js';
import TrialPlotService from '../../services/TrialPlotService';
import { Select, TextField, Button } from '@material-ui/core';

import MenuItem from '@material-ui/core/MenuItem';
import './style.css';

class TrialPlot extends React.Component {
    state = {
        regions: [],
        lesHoses: [],
        lesnichestvas: [],
        selectedRegionId: -1,
        selectedRayonName: '',
        selectedPLHOName: '',
        selectedLesHosName: '',
        selectedLesnichestvoName: '',

        trialPlotRequest: {
            region: 0,
            rayon: 0,
            plho: 0,
            leshos: 0,
            lesnichestvo: 0,
            videl: 0,
            ploshadProbi: 0,
            ispolnitel: '',
            pochva: '',
            tym: '',
            forestType: '',
            osobennostiDrev: '',
            pokrov: '',
            positionAndRelief: '',
        }
        
    }

    async componentDidMount() {
        const regions = await TrialPlotService.getAllRegions();
        const lesHoses = await TrialPlotService.getAllLesHoses();
        const lesnichestvas = await TrialPlotService.getAllLesnichestvas();  
        
        this.setState({regions: regions, lesHoses: lesHoses, lesnichestvas: lesnichestvas});
        console.log(this.state.regions);
    }

    handleSubmit = e => {
        e.preventDefault();

        const {trialPlotRequest} = this.state;

        this.sendRequest(trialPlotRequest);
    }

    regionOnChange = e => {
        e.preventDefault();
        this.setState({selectedRegionId: e.target.value,});
        
        this.setState(prevState => ({
            ...prevState,
            trialPlotRequest: {
                ...prevState.trialPlotRequest,
                region: e.target.value
            }
        }))
    }

    rayonOnChange = e => {
        e.preventDefault();
        this.setState({selectedRayonName: e.target.value});

        this.setState(prevState => ({
            ...prevState,
            trialPlotRequest: {
                ...prevState.trialPlotRequest,
                rayon: e.target.value
            }
        }))
    }

    PLHOOnChange = e => {
        e.preventDefault();
        this.setState({selectedPLHOName: e.target.value});

        this.setState(prevState => ({
            ...prevState,
            trialPlotRequest: {
                ...prevState.trialPlotRequest,
                plho: e.target.value
            }
        }))
    }

    lesHosOnChange = e => {
        e.preventDefault();
        this.setState({selectedLesHosName: e.target.value});

        this.setState(prevState => ({
            ...prevState,
            trialPlotRequest: {
                ...prevState.trialPlotRequest,
                leshos: e.target.value
            }
        }))
    }

    lesnichestvoOnChange = e => {
        e.preventDefault();
        this.setState({selectedLesnichestvoName: e.target.value});

        this.setState(prevState => ({
            ...prevState,
            trialPlotRequest: {
                ...prevState.trialPlotRequest,
                lesnichestvo: e.target.value
            }
        }))
    }

    sendRequest = data => {
        console.log('REQUEST DATA', data);
        TrialPlotService.createTrialPlot(data);
    }

    render() {
        const {
            regions,
            selectedRegionId,
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
                    <div id="padded-form">
                        <div className="base-title card-title">
                            <p>Карточка пробной площади</p>
                        </div>
                        <div className="plot-info">
                            <form id="trialForm" noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                                <div className="info base-title">
                                    <div className="inputs">
                                        <p>Область</p>
                                        <div className="inner-select">
                                        <Select className="dropdown" value={selectedRegionId} onChange={this.regionOnChange}>
                                            {regions.map(x => {
                                                
                                                return <MenuItem className="base-title" value={x.id}>{x.name}</MenuItem>
                                            })}
                                        </Select>
                                        </div>
                                    </div>
                                    <div className="inputs">
                                        <p>Район</p>
                                        <Select className="dropdown base-title" value={selectedRayonName} onChange={this.rayonOnChange}>
                                            {selectedRegionId == -1 ? null : regions.find(y => y.id == selectedRegionId).rayonList.map(y => 
                                                    <MenuItem value={y.id}>{y.name}</MenuItem>
                                                )
                                            }
                                        </Select>
                                    </div>
                                    <div className="inputs">
                                        <p>ПЛХО</p>
                                        <Select className="dropdown base-title" value={selectedPLHOName} onChange={this.PLHOOnChange}>
                                            {selectedRegionId == -1 ? null : regions.find(y => y.id == selectedRegionId).plhoList.map(y => 
                                                    <MenuItem value={y.id}>{y.plho}</MenuItem>
                                                )
                                            }
                                        </Select>
                                    </div>
                                    <div className="inputs">
                                        <p>Лесхоз</p>
                                        <Select className="dropdown base-title" value={selectedLesHosName} onChange={this.lesHosOnChange}>
                                            {lesHoses.map(x => {
                                                return <MenuItem value={x.id}>{x.name}</MenuItem>
                                            })}
                                        </Select>
                                    </div>
                                    <div className="inputs">
                                        <p>Лесничество</p>
                                        <Select className="dropdown base-title" value={selectedLesnichestvoName} onChange={this.lesnichestvoOnChange}>
                                            {lesnichestvas.map(x => {
                                                return <MenuItem value={x.id}>{x.name}</MenuItem>
                                            })}
                                        </Select>
                                    </div>
                                    <div className="inputs inner-inputs">
                                        <p>Выдел</p>
                                        <TextField id="standard-basic" label="Выдел" />
                                    </div>
                                    <div className="inputs inner-inputs">
                                        <p>Площадь пробы</p>
                                        <TextField id="filled-basic" label="Площадь пробы" />
                                    </div>
                                    <div className="inputs inner-inputs">
                                        <p>Квартал</p>
                                        <TextField id="outlined-basic" label="Квартал" />
                                    </div>
                                    <div className="inputs inner-inputs">
                                        <p>ТУМ</p>
                                        <TextField id="outlined-basic" label="ТУМ" />
                                    </div>
                                    <div className="inputs inner-inputs">
                                        <p>Покров</p>
                                        <TextField id="outlined-basic" label="Покров" />
                                    </div>
                                    <div className="inputs inner-inputs">
                                        <p>Положение и рельеф</p>
                                        <TextField id="outlined-basic" label="Положение и рельеф" />
                                    </div>
                                    <div className="inputs inner-inputs">
                                        <p>Особенности древостоя</p>
                                        <TextField id="outlined-basic" label="Особенности древостоя" />
                                    </div>
                                    <div className="inputs inner-inputs">
                                        <p>Тип леса</p> 
                                        <TextField id="outlined-basic" label="Тип леса" />
                                    </div>
                                    <div className="inputs inner-inputs">
                                        <p>Почва</p>
                                        <TextField id="outlined-basic" label="Почва" />
                                    </div>
                                    <div className="inputs inner-inputs">
                                        <p>Исполнитель</p>
                                        <TextField id="outlined-basic" label="Исполнитель" />
                                    </div>
                                </div>
                                <Button id="submit-trial-plot-btn" variant="contained" type="submit">
                                    Создать новую ПП
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default TrialPlot;
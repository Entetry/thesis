import React from 'react';
import {Redirect} from 'react-router-dom';
import Header from '../../components/Header/header.js';
import TrialPlotService from '../../services/TrialPlotService';
import { Select, TextField, Button } from '@material-ui/core';
// import history from 'history';
import MenuItem from '@material-ui/core/MenuItem';
import './style.css';
import {appRoutes} from '../../globalVariables.js';

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
            regionId: 0,
            rayonId: 0,
            plhoId: 0,
            leshosId: 0,
            lesnichestvo: 0,
            videl: 0,
            ploshadProbi: '',
            kvartal: '',
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
                regionId: e.target.value
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
                rayonId: e.target.value
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
                plhoId: e.target.value
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
                leshosId: e.target.value
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
                lesnichestvoId: e.target.value
            }
        }))
    }

    sendRequest = data => {
        const response = TrialPlotService.createTrialPlot(data).then(d =>
            {
                console.log('FUCKING D', d);
                this.setState(prevState => ({
                    ...prevState,
                    trialPlotRequest: d 
                }))
                this.props.history.push(appRoutes.editTrialPage, d);
                return d;
            });
        

        
        
        // return <Redirect
        // to={{
        //   pathname: appRoutes.editTrialPage,
        // //   search: "?utm=your+face",
        //   state: { trialPlotRequest: response }
        // }}
        // />
    }

    inputsOnChange = evt => {
        const value = evt.target.value;
        const state = this.state;
        this.setState({
            ...state,
            trialPlotRequest: {
                ...state.trialPlotRequest,
                [evt.target.name]: value
            },
        });
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
                                        <TextField
                                            id="standard-basic"
                                            label="Выдел"
                                            onChange={this.inputsOnChange}
                                            type="text"
                                            name="videl"
                                        />
                                    </div>
                                    <div className="inputs inner-inputs">
                                        <p>Площадь пробы</p>
                                        <TextField
                                            id="filled-basic"
                                            label="Площадь пробы"
                                            onChange={this.inputsOnChange}
                                            type="text"
                                            name="ploshadProbi"
                                        />
                                    </div>
                                    <div className="inputs inner-inputs">
                                        <p>Квартал</p>
                                        <TextField
                                            id="filled-basic"
                                            label="Квартал"
                                            onChange={this.inputsOnChange}
                                            type="text"
                                            name="kvartal"
                                        />
                                    </div>
                                    <div className="inputs inner-inputs">
                                        <p>ТУМ</p>
                                        <TextField
                                            id="filled-basic"
                                            label="TYM"
                                            onChange={this.inputsOnChange}
                                            type="text"
                                            name="tym"
                                        />
                                    </div>
                                    <div className="inputs inner-inputs">
                                        <p>Покров</p>
                                        <TextField
                                            id="filled-basic"
                                            label="pokrov"
                                            onChange={this.inputsOnChange}
                                            type="text"
                                            name="pokrov"
                                        />
                                    </div>
                                    <div className="inputs inner-inputs">
                                        <p>Положение и рельеф</p>
                                        <TextField
                                            id="filled-basic"
                                            label="Положение и рельеф"
                                            onChange={this.inputsOnChange}
                                            type="text"
                                            name="positionAndRelief"
                                        />
                                    </div>
                                    <div className="inputs inner-inputs">
                                        <p>Особенности древостоя</p>
                                        <TextField
                                            id="filled-basic"
                                            label="Особенности древостоя"
                                            onChange={this.inputsOnChange}
                                            type="text"
                                            name="osobennostiDrev"
                                        />
                                    </div>
                                    <div className="inputs inner-inputs">
                                        <p>Тип леса</p> 
                                        <TextField
                                            id="filled-basic"
                                            label="Тип леса"
                                            onChange={this.inputsOnChange}
                                            type="text"
                                            name="forestType"
                                        />
                                    </div>
                                    <div className="inputs inner-inputs">
                                        <p>Почва</p>
                                        <TextField
                                            id="filled-basic"
                                            label="Почва"
                                            onChange={this.inputsOnChange}
                                            type="text"
                                            name="pochva"
                                        />
                                    </div>
                                    <div className="inputs inner-inputs">
                                        <p>Исполнитель</p>
                                        <TextField
                                            id="filled-basic"
                                            label="Испольнитель"
                                            onChange={this.inputsOnChange}
                                            type="text"
                                            name="ispolnitel"
                                        />
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
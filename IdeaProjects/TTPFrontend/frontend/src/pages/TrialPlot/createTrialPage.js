import React from 'react';
import Header from '../../components/Header/header.js';
import TrialPlotService from '../../services/TrialPlotService';
import { TextField, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import './style.css';
import {appRoutes} from '../../globalVariables.js';


class TrialPlot extends React.Component {
    state = {
        regions: [],
        lesHoses: [],
        lesnichestvas: [],
        tyms: [],
        pokrovs: [],
        forestTypes: [],
        pochvas: [],
        selectedRegion: null,
        selectedRayonName: '',
        selectedPLHOName: '',
        selectedLesHosName: '',
        selectedLesnichestvoName: '',

        trialPlotRequest: {
            regionId: -1,
            rayonId: 0,
            plhoId: 0,
            leshosId: 0,
            lesnichestvo: 0,
            videl: 0,
            ploshadProbi: '',
            kvartal: '',
            ispolnitel: '',
            pochvaId: 0,
            tymId: 0,
            forestTypeId: 0,
            osobennostiDrev: '',
            pokrovId: 0,
            positionAndRelief: '',
        }
    }

    async componentDidMount() {
        const regions = await TrialPlotService.getAllRegions();
        const lesHoses = await TrialPlotService.getAllLesHoses();
        const lesnichestvas = await TrialPlotService.getAllLesnichestvas();
        const tyms = await TrialPlotService.getAllTyms();
        const pokrovs = await TrialPlotService.getAllPokrovs();
        const forestTypes = await TrialPlotService.getAllForestTypes();
        const pochvas = await TrialPlotService.getAllPochvas();
        
        this.setState({
            regions: regions,
            lesHoses: lesHoses,
            lesnichestvas: lesnichestvas,
            tyms: tyms,
            pokrovs: pokrovs,
            forestTypes: forestTypes,
            pochvas: pochvas,
        });
    }

    handleSubmit = e => {
        e.preventDefault();

        const {trialPlotRequest} = this.state;

        this.sendRequest(trialPlotRequest);
    }

    tymOnChange = (e, opt) => {
        if(opt != null && opt != undefined)
        this.setState(prevState => ({
            ...prevState,
            trialPlotRequest: {
                ...prevState.trialPlotRequest,
                tymId: opt.id
            }
        }))
    }

    pokrovOnChange = (e, opt) => {
        if(opt != null && opt != undefined)
        this.setState(prevState => ({
            ...prevState,
            trialPlotRequest: {
                ...prevState.trialPlotRequest,
                pokrovId: opt.id
            }
        }))
    }

    forestTypeOnChange = (e, opt) => {
        if(opt != null && opt != undefined)
        this.setState(prevState => ({
            ...prevState,
            trialPlotRequest: {
                ...prevState.trialPlotRequest,
                forestTypeId: opt.id
            }
        }))
    }

    pochvaOnChange = (e, opt) => {
        if(opt != null && opt != undefined)
        this.setState(prevState => ({
            ...prevState,
            trialPlotRequest: {
                ...prevState.trialPlotRequest,
                pochvaId: opt.id
            }
        }))
    } 

    regionOnChange = (e, opt) => {
        if(opt != null && opt != undefined)
        this.setState(prevState => ({
            ...prevState,
            trialPlotRequest: {
                ...prevState.trialPlotRequest,
                regionId: opt.id
            }
        }))
    }

    rayonOnChange = (e, opt) => {
        this.setState(prevState => ({
            ...prevState,
            trialPlotRequest: {
                ...prevState.trialPlotRequest,
                rayonId: opt.id
            }
        }))
    }

    PLHOOnChange = (e, opt) => {
        this.setState(prevState => ({
            ...prevState,
            trialPlotRequest: {
                ...prevState.trialPlotRequest,
                plhoId: opt.id
            }
        }))
    }

    lesHosOnChange = (e, opt) => {
        this.setState(prevState => ({
            ...prevState,
            trialPlotRequest: {
                ...prevState.trialPlotRequest,
                leshosId: opt.id
            }
        }))
    }

    lesnichestvoOnChange = (e, opt) => {
        this.setState(prevState => ({
            ...prevState,
            trialPlotRequest: {
                ...prevState.trialPlotRequest,
                lesnichestvoId: opt.id
            }
        }))
    }

    sendRequest = data => {
        TrialPlotService.createTrialPlot(data).then(response =>
        {
            this.props.history.push(`${appRoutes.editTrialPage}/${response.id}`, response);
            window.scroll(0, 0);
        });
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
            lesHoses,
            pokrovs,
            lesnichestvas,
            tyms,
            trialPlotRequest,
            forestTypes,
            pochvas
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
                                            <Autocomplete
                                                className="dropdown"
                                                options={regions}
                                                getOptionLabel={option => option.name}
                                                id="regions"
                                                onChange={this.regionOnChange}
                                                renderInput={params => 
                                                {
                                                    return <TextField
                                                    {...params}
                                                    id="filled-basic"
                                                    label="Области"
                                                    className="base-title"
                                                    type="text"
                                                    name="regions" />
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="inputs">
                                        <p>Район</p>
                                        <Autocomplete
                                                className="dropdown"
                                                options={trialPlotRequest.regionId == -1 ? [] : regions.find(y => y.id == trialPlotRequest.regionId).rayonList}
                                                getOptionLabel={option => option.name}
                                                id="rayon"
                                                onChange={this.rayonOnChange}
                                                renderInput={params => 
                                                {
                                                    return <TextField
                                                    {...params}
                                                    id="filled-basic"
                                                    label="Район"
                                                    className="base-title"
                                                    type="text"
                                                    name="rayons" />
                                                }}
                                        />
                                    </div>
                                    <div className="inputs">
                                        <p>ПЛХО</p>
                                        <Autocomplete
                                            className="dropdown"
                                            options={trialPlotRequest.regionId == -1 ? [] : regions.find(y => y.id == trialPlotRequest.regionId).plhoList}
                                            getOptionLabel={option => option.plho}
                                            id="plho"
                                            onChange={this.PLHOOnChange}
                                            renderInput={params => 
                                            {
                                                return <TextField
                                                {...params}
                                                id="filled-basic"
                                                label="ПЛХО"
                                                className="base-title"
                                                type="text"
                                                name="plho" />
                                            }}
                                        />
                                    </div>
                                    <div className="inputs">
                                        <p>Лесхоз</p>
                                        <Autocomplete
                                            className="dropdown"
                                            options={lesHoses}
                                            getOptionLabel={option => option.name}
                                            id="lesHoses"
                                            onChange={this.lesHosOnChange}
                                            renderInput={params => 
                                            {
                                                return <TextField
                                                {...params}
                                                id="filled-basic"
                                                label="Лесхоз"
                                                className="base-title"
                                                type="text"
                                                name="lesHoses" />
                                            }}
                                        />
                                    </div>
                                    <div className="inputs">
                                        <p>Лесничество</p>
                                        <Autocomplete
                                            className="dropdown"
                                            options={lesnichestvas}
                                            getOptionLabel={option => option.name == null || option.name == undefined ? '' : option.name}
                                            id="lesnichestvas"
                                            onChange={this.lesnichestvoOnChange}
                                            renderInput={params => 
                                            {
                                                return <TextField
                                                {...params}
                                                id="filled-basic"
                                                label="Лесничетсва"
                                                className="base-title"
                                                type="text"
                                                name="lesnichestvas" />
                                            }}
                                        />
                                    </div>
                                    <div className="inputs">
                                        <p>Выдел</p>
                                        <TextField
                                            className="tym"
                                            id="standard-basic"
                                            label="Выдел"
                                            onChange={this.inputsOnChange}
                                            type="text"
                                            name="videl"
                                        />
                                    </div>
                                    <div className="inputs">
                                        <p>Площадь пробы</p>
                                        <TextField
                                            className="tym"
                                            id="filled-basic"
                                            label="Площадь пробы"
                                            onChange={this.inputsOnChange}
                                            type="text"
                                            name="ploshadProbi"
                                        />
                                    </div>
                                    <div className="inputs">
                                        <p>Квартал</p>
                                        <TextField
                                            className="tym"
                                            id="filled-basic"
                                            label="Квартал"
                                            onChange={this.inputsOnChange}
                                            type="text"
                                            name="kvartal"
                                        />
                                    </div>
                                    <div className="inputs">
                                        <p>ТУМ</p>
                                        <Autocomplete
                                            className="tym"
                                            options={tyms}
                                            getOptionLabel={option => option.name}
                                            id="tym"
                                            onChange={this.tymOnChange}
                                            renderInput={params => 
                                            {
                                                return <TextField
                                                {...params}
                                                id="filled-basic"
                                                label="TYM"
                                                type="text"
                                                name="tym" />
                                            }}
                                        />
                                    </div>
                                    <div className="inputs">
                                        <p>Покров</p>
                                        <Autocomplete
                                            className="tym"
                                            options={pokrovs}
                                            getOptionLabel={option => option.name}
                                            id="pokrov"
                                            onChange={this.pokrovOnChange}
                                            renderInput={params => 
                                            {
                                                return <TextField
                                                {...params}
                                                id="filled-basic"
                                                label="Покров"
                                                type="text"
                                                name="pokrov" />
                                            }}
                                        />
                                    </div>
                                    <div className="inputs">
                                        <p>Положение и рельеф</p>
                                        <TextField
                                            className="tym"
                                            id="filled-basic"
                                            label="Положение и рельеф"
                                            onChange={this.inputsOnChange}
                                            type="text"
                                            name="positionAndRelief"
                                        />
                                    </div>
                                    <div className="inputs">
                                        <p>Особенности древостоя</p>
                                        <TextField
                                            className="tym"
                                            id="filled-basic"
                                            label="Особенности древостоя"
                                            onChange={this.inputsOnChange}
                                            type="text"
                                            name="osobennostiDrev"
                                        />
                                    </div>
                                    <div className="inputs">
                                        <p>Тип леса</p>
                                        <Autocomplete
                                            className="tym"
                                            options={forestTypes}
                                            getOptionLabel={option => option.name}
                                            id="pokrov"
                                            onChange={this.forestTypeOnChange}
                                            renderInput={params => 
                                            {
                                                return <TextField
                                                {...params}
                                                id="filled-basic"
                                                label="Тип леса"
                                                type="text"
                                                name="forestType" />
                                            }}
                                        />
                                    </div>
                                    <div className="inputs">
                                        <p>Почва</p>
                                        <Autocomplete
                                            className="tym"
                                            options={pochvas}
                                            getOptionLabel={option => option.name}
                                            id="pochva"
                                            onChange={this.pochvaOnChange}
                                            renderInput={params => 
                                            {
                                                return <TextField
                                                {...params}
                                                id="filled-basic"
                                                label="Почва"
                                                type="text"
                                                name="pochva" />
                                            }}
                                        />
                                    </div>
                                    <div className="inputs">
                                        <p>Исполнитель</p>
                                        <TextField
                                            className="tym"
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
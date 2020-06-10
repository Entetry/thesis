import React from 'react';
import Header from '../../components/Header/header.js';
import TrialPlotService from '../../services/TrialPlotService';
import { Select, TextField, Button, Input } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './style.css';

class EditTrialPlot extends React.Component {
    state = {
        isEditable: false,
        trialPlot: null,
        regions: [],
        lesHoses: [],
        lesnichestvas: [],
        tyms: [],
        pokrovs: [],
        forestTypes: [],
        pochvas: [],
    }

    async componentDidMount() {
        const localTrialPlot = await TrialPlotService.getById(this.props.location.state.id);

        this.setState({trialPlot: localTrialPlot});
    }

    editTrialPlot = () => {
        const {isEditable} = this.state;

        TrialPlotService.getAllRegions().then(regions => {
            TrialPlotService.getAllLesHoses().then(lesHoses => {
                TrialPlotService.getAllLesnichestvas().then(lesnichestvas => {
                    TrialPlotService.getAllTyms().then(tyms => {
                        TrialPlotService.getAllPokrovs().then(pokrovs => {
                            TrialPlotService.getAllForestTypes().then(forestTypes => {
                                TrialPlotService.getAllPochvas().then(pochvas => {
                                    this.setState({
                                        regions,
                                        lesHoses,
                                        lesnichestvas,
                                        tyms,
                                        pokrovs,
                                        forestTypes,
                                        pochvas,
                                        isEditable: !isEditable
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }

    inputsOnChange = e => {
        console.log('HYU', e.target, e.target.value);
        const state = this.state;

        this.setState({
            ...state,
            trialPlot: {
                ...state.trialPlot,
                [e.target.name]: e.target.value
            },
        });
    }

    updateTrialPlot = () => {
        const {trialPlot} = this.state;

        TrialPlotService.updateTrialPlot(trialPlot).then(response => {
            this.setState({trialPlot: trialPlot})            
        })
    }

    tymOnChange = (e, opt) => {
        if(opt != null && opt != undefined)
        this.setState(prevState => ({
            ...prevState,
            trialPlot: {
                ...prevState.trialPlot,
                tym: opt
            }
        }))
    }

    pokrovOnChange = (e, opt) => {
        if(opt != null && opt != undefined)
        this.setState(prevState => ({
            ...prevState,
            trialPlot: {
                ...prevState.trialPlot,
                pokrov: opt
            }
        }))
    }

    forestTypeOnChange = (e, opt) => {
        if(opt != null && opt != undefined)
        this.setState(prevState => ({
            ...prevState,
            trialPlotRequest: {
                ...prevState.trialPlotRequest,
                forestType: opt
            }
        }))
    }

    pochvaOnChange = (e, opt) => {
        if(opt != null && opt != undefined)
        this.setState(prevState => ({
            ...prevState,
            trialPlotRequest: {
                ...prevState.trialPlotRequest,
                pochva: opt
            }
        }))
    } 

    regionOnChange = (e, opt) => {
        if(opt != null && opt != undefined)
        this.setState(prevState => ({
            ...prevState,
            trialPlotRequest: {
                ...prevState.trialPlotRequest,
                region: opt
            }
        }))
    }

    rayonOnChange = (e, opt) => {
        this.setState(prevState => ({
            ...prevState,
            trialPlotRequest: {
                ...prevState.trialPlotRequest,
                rayon: opt
            }
        }))
    }

    PLHOOnChange = (e, opt) => {
        this.setState(prevState => ({
            ...prevState,
            trialPlotRequest: {
                ...prevState.trialPlotRequest,
                plho: opt
            }
        }))
    }

    lesHosOnChange = (e, opt) => {
        this.setState(prevState => ({
            ...prevState,
            trialPlotRequest: {
                ...prevState.trialPlotRequest,
                leshos: opt
            }
        }))
    }

    lesnichestvoOnChange = (e, opt) => {
        this.setState(prevState => ({
            ...prevState,
            trialPlotRequest: {
                ...prevState.trialPlotRequest,
                lesnichestvo: opt
            }
        }))
    }

    sasi = (evt, opt) => {
        console.log('SASSIISSIODJAISJHDOIASDHAISUDH', evt, opt);
        this.setState(prevState => ({
            ...prevState,
            trialPlot: {
                ...prevState.trialPlot,
                region: opt
            }
        }))
    }

    render() {
        const {
            isEditable,
            trialPlot,
            regions,
            rayons,
            lesHoses,
            lesnichestvas,
            tyms,
            pokrovs,
            forestTypes,
            pochvas
        } = this.state;

        console.log('REGIONIIII', regions);
        


        return(
            <>
                <Header />
                <div id="container">
                        <div style={isEditable ? {display: 'none'} : {}} id="padded-form">
                        <div className="base-title card-title">
                            <p>Карточка пробной площади</p>
                        </div>

                        <div className="plot-info">
                            <form id="trialForm" noValidate autoComplete="off">
                                <div className="info base-title">
                                    <div className="inputs">
                                        <p>Область</p>
                                        <div className="inner-select">
                                            <Autocomplete
                                                className="dropdown"
                                                options={[]}
                                                getOptionLabel={option => option.name}
                                                id="regions"
                                                inputValue={trialPlot == null ? '' : trialPlot.region.name}
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
                                                options={[]}
                                                getOptionLabel={option => option.name}
                                                inputValue={trialPlot == null ? '' : trialPlot.rayon.name}
                                                id="rayon"
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
                                            options={[]}
                                            getOptionLabel={option => option.name}
                                            inputValue={trialPlot == null ? '' : trialPlot.plho.plho}
                                            id="plho"
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
                                            options={[]}
                                            getOptionLabel={option => option.name}
                                            inputValue={trialPlot == null ? '' : trialPlot.leshos.name}
                                            id="lesHoses"
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
                                            options={[]}
                                            getOptionLabel={option => option.name == null || option.name == undefined ? '' : option.name}
                                            inputValue={trialPlot == null ? '' : trialPlot.lesnichestvo.name}
                                            id="lesnichestvas"
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
                                            type="text"
                                            name="videl"
                                            value={trialPlot == null ? '' : trialPlot.videl}
                                        />
                                    </div>
                                    <div className="inputs">
                                        <p>Площадь пробы</p>
                                        <TextField
                                            className="tym"
                                            id="filled-basic"
                                            label="Площадь пробы"
                                            type="text"
                                            name="ploshadProbi"
                                            value={trialPlot == null ? '' : trialPlot.ploshadProbi}
                                        />
                                    </div>
                                    <div className="inputs">
                                        <p>Квартал</p>
                                        <TextField
                                            className="tym"
                                            id="filled-basic"
                                            label="Квартал"
                                            type="text"
                                            name="kvartal"
                                            value={trialPlot == null ? '' : trialPlot.kvartal}
                                        />
                                    </div>
                                    <div className="inputs">
                                        <p>ТУМ</p>
                                        <Autocomplete
                                            className="tym"
                                            options={[]}
                                            getOptionLabel={option => option.name}
                                            id="tym"
                                            inputValue={trialPlot == null ? [] : trialPlot.tym.name}
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
                                            options={[]}
                                            getOptionLabel={option => option.name}
                                            inputValue={trialPlot == null ? [] : trialPlot.pokrov.name}
                                            id="pokrov"
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
                                            type="text"
                                            name="positionAndRelief"
                                            value={trialPlot == null ? '' : trialPlot.positionAndRelief}
                                        />
                                    </div>
                                    <div className="inputs">
                                        <p>Особенности древостоя</p>
                                        <TextField
                                            className="tym"
                                            id="filled-basic"
                                            label="Особенности древостоя"
                                            type="text"
                                            name="osobennostiDrev"
                                            value={trialPlot == null ? '' : trialPlot.osobennostiDrev}
                                        />
                                    </div>
                                    <div className="inputs">
                                        <p>Тип леса</p>
                                        <Autocomplete
                                            className="tym"
                                            options={[]}
                                            getOptionLabel={option => option.name}
                                            inputValue={trialPlot == null ? [] : trialPlot.forestType.name}
                                            id="pokrov"
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
                                            options={[]}
                                            getOptionLabel={option => option.name}
                                            inputValue={trialPlot == null ? [] : trialPlot.pochva.name}
                                            id="pochva"
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
                                            type="text"
                                            name="ispolnitel"
                                            value={trialPlot == null ? '' : trialPlot.ispolnitel}
                                        />
                                    </div>
                                </div>
                                <Button id="submit-trial-plot-btn" variant="contained" type="button" onClick={this.editTrialPlot}>
                                    Редактировать
                                </Button>
                            </form>
                        </div>
                    </div>
                    <div style={!isEditable ? {display: 'none'} : {}} id="padded-form">
                        <div className="base-title card-title">
                            <p>Карточка пробной площади</p>
                        </div>
                        <div className="plot-info">
                            <div className="info base-title">
                                <div className="inputs">
                                    <p>Область</p>
                                    <div className="inner-select">
                                        <Autocomplete
                                            className="dropdown"
                                            options={regions == [] ? [] : regions}
                                            getOptionLabel={option => option.name}
                                            id="regions"
                                            onChange={this.regionOnChange}
                                            inputValue={trialPlot == null ? '' : trialPlot.region.name}
                                            onInputChange={this.sasi}
                                            renderInput={params => 
                                            {
                                                return <TextField
                                                {...params}
                                                id="filled-basic"
                                                label="Области"
                                                className="base-title"
                                                type="text"
                                                name="regions"
                                                />
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="inputs">
                                    <p>Район</p>
                                    <Autocomplete
                                            className="dropdown"
                                            options={trialPlot == null ? [] : trialPlot.region.rayonList}
                                            getOptionLabel={option => option.name}
                                            inputValue={trialPlot == null ? '' : trialPlot.rayon.name}
                                            id="rayon"
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
                                        options={[]}
                                        getOptionLabel={option => option.name}
                                        inputValue={trialPlot == null ? '' : trialPlot.plho.plho}
                                        id="plho"
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
                                        options={[]}
                                        getOptionLabel={option => option.name}
                                        inputValue={trialPlot == null ? '' : trialPlot.leshos.name}
                                        id="lesHoses"
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
                                        options={[]}
                                        getOptionLabel={option => option.name == null || option.name == undefined ? '' : option.name}
                                        inputValue={trialPlot == null ? '' : trialPlot.lesnichestvo.name}
                                        id="lesnichestvas"
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
                                        type="text"
                                        name="videl"
                                        value={trialPlot == null ? '' : trialPlot.videl}
                                        onChange={this.inputsOnChange}
                                    />
                                </div>
                                <div className="inputs">
                                    <p>Площадь пробы</p>
                                    <TextField
                                        className="tym"
                                        id="filled-basic"
                                        label="Площадь пробы"
                                        type="text"
                                        name="ploshadProbi"
                                        value={trialPlot == null ? '' : trialPlot.ploshadProbi}
                                        onChange={this.inputsOnChange}
                                    />
                                </div>
                                <div className="inputs">
                                    <p>Квартал</p>
                                    <TextField
                                        className="tym"
                                        id="filled-basic"
                                        label="Квартал"
                                        type="text"
                                        name="kvartal"
                                        value={trialPlot == null ? '' : trialPlot.kvartal}
                                        onChange={this.inputsOnChange}
                                    />
                                </div>
                                <div className="inputs">
                                    <p>ТУМ</p>
                                    <Autocomplete
                                        className="tym"
                                        options={[]}
                                        getOptionLabel={option => option.name}
                                        id="tym"
                                        inputValue={trialPlot == null ? [] : trialPlot.tym.name}
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
                                        options={[]}
                                        getOptionLabel={option => option.name}
                                        inputValue={trialPlot == null ? [] : trialPlot.pokrov.name}
                                        id="pokrov"
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
                                        type="text"
                                        name="positionAndRelief"
                                        value={trialPlot == null ? '' : trialPlot.positionAndRelief}
                                        onChange={this.inputsOnChange}
                                    />
                                </div>
                                <div className="inputs">
                                    <p>Особенности древостоя</p>
                                    <TextField
                                        className="tym"
                                        id="filled-basic"
                                        label="Особенности древостоя"
                                        type="text"
                                        name="osobennostiDrev"
                                        value={trialPlot == null ? '' : trialPlot.osobennostiDrev}
                                        onChange={this.inputsOnChange}
                                    />
                                </div>
                                <div className="inputs">
                                    <p>Тип леса</p>
                                    <Autocomplete
                                        className="tym"
                                        options={[]}
                                        getOptionLabel={option => option.name}
                                        inputValue={trialPlot == null ? [] : trialPlot.forestType.name}
                                        id="pokrov"
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
                                        options={[]}
                                        getOptionLabel={option => option.name}
                                        inputValue={trialPlot == null ? [] : trialPlot.pochva.name}
                                        id="pochva"
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
                                        type="text"
                                        name="ispolnitel"
                                        value={trialPlot == null ? '' : trialPlot.ispolnitel}
                                        onChange={this.inputsOnChange}
                                    />
                                </div>
                            </div>
                            <Button id="submit-trial-plot-btn" variant="contained" type="button" onClick={this.updateTrialPlot}>
                                Сохранить
                            </Button>
                        </div>
                    </div>
                }
                </div>
            </>
        )
    }
}

export default EditTrialPlot;
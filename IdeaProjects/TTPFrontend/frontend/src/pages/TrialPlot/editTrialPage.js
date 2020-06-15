import React from 'react';
import Header from '../../components/Header/header.js';
import TrialPlotService from '../../services/TrialPlotService';
import PorodaService from '../../services/PorodaService';
import { Select, TextField, Button, Input } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import BindingDataTable from '../../components/Table/BindingDataTable/index.js';
import TreesCountTable from '../../components/Table/TreesCountTable';
import HeightMeasureTable from '../../components/Table/HeightMeasureTable';
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
        porodas: [],
        inputRegion: '',
        inputRayon: '',
        inputPlho: '',
        inputLeshos: '',
        inputLesnichestvo: '',
        inputTym: '',
        inputPokrov: '',
        inputForestType: '',
        inputPochva: '',
        inputPoroda: '',
        toRemoveTableState: true,
        isAddPoroda: false,
        poroda: {
            porodaId: 0,
            yarus: 0,
            pokolenie: 0,
            plotId: 0,
            averageAge: 0,
        },
        addInputPoroda: '',
        isHeightMeasureTableVisible: false,
    }

    fetchInitialData = () => {
        TrialPlotService.getById(this.props.match.params.id).then(x => {
            this.setState({
                trialPlot: x,
                inputRegion: x.region.name,
                inputRayon: x.rayon.name,
                inputPlho: x.plho.plho,
                inputLeshos: x.leshos.name,
                inputLesnichestvo: x.lesnichestvo.name,
                inputTym: x.tym.name,
                inputPokrov: x.pokrov.name,
                inputForestType: x.forestType.name,
                inputPochva: x.pochva.name,
                inputPoroda: x.porodaInfo.name,
            });
        }).catch(err => {
            if(err.status == 404){
                alert('Пробной площади с заданным Id не существует');
                this.props.history.push('/main');
            }
            else if(err.status == 500){
                alert('Непредвиденная ошибка. Обратитесь к Администратору');
                this.props.history.push('/main');
            }
        });

        TrialPlotService.getAllPoroda().then(porodas => {
            this.setState({
                porodas,
            });
        });
    }

    componentDidMount() {
        this.fetchInitialData();
    }

    porodaOnChangeField = e => {
        const state = this.state;

        this.setState({
            ...state,
            poroda: {
                ...state.poroda,
                [e.target.name]: e.target.value
            },
        });
    }

    editTrialPlot = () => {
        window.scroll(0, 0);
        const {isEditable} = this.state;

        TrialPlotService.getAllRegions().then(regions => {
            TrialPlotService.getAllLesHoses().then(lesHoses => {
                TrialPlotService.getAllLesnichestvas().then(lesnichestvas => {
                    TrialPlotService.getAllTyms().then(tyms => {
                        TrialPlotService.getAllPokrovs().then(pokrovs => {
                            TrialPlotService.getAllForestTypes().then(forestTypes => {
                                TrialPlotService.getAllPochvas().then(pochvas => {
                                    TrialPlotService.getAllPoroda().then(porodas => {
                                        this.setState({
                                            regions,
                                            lesHoses,
                                            lesnichestvas,
                                            tyms,
                                            pokrovs,
                                            forestTypes,
                                            pochvas,
                                            porodas,
                                            isEditable: !isEditable
                                        });
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
        const {trialPlot, isEditable} = this.state;

        TrialPlotService.updateTrialPlot(trialPlot).then(response => {
            this.setState({trialPlot: trialPlot, isEditable: !isEditable})   
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

        this.setState({inputTym: opt == undefined ? '' : opt.name});
    }

    porodaOnChange = (e, opt) => {
        if(opt != null && opt != undefined)
        this.setState(prevState => ({
            ...prevState,
            trialPlot: {
                ...prevState.trialPlot,
                porodaInfo: opt
            }
        }))

        this.setState({inputPoroda: opt == undefined ? '' : opt.name});
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

        this.setState({inputPokrov: opt == undefined ? '' : opt.name});
    }

    forestTypeOnChange = (e, opt) => {
        if(opt != null && opt != undefined)
        this.setState(prevState => ({
            ...prevState,
            trialPlot: {
                ...prevState.trialPlot,
                forestType: opt
            }
        }))

        this.setState({inputForestType: opt == undefined ? '' : opt.name});
    }

    pochvaOnChange = (e, opt) => {
        if(opt != null && opt != undefined)
        this.setState(prevState => ({
            ...prevState,
            trialPlot: {
                ...prevState.trialPlot,
                pochva: opt
            }
        }))
        
        this.setState({inputPochva: opt == undefined ? '' : opt.name});
    } 

    regionOnChange = (e, opt) => {
        if(opt != null && opt != undefined)
        this.setState(prevState => ({
            ...prevState,
            trialPlot: {
                ...prevState.trialPlot,
                region: opt
            }
        }))

        this.setState({inputRegion: opt == undefined ? '' : opt.name});
    }

    rayonOnChange = (e, opt) => {
        if(opt != null && opt != undefined)
        this.setState(prevState => ({
            ...prevState,
            trialPlot: {
                ...prevState.trialPlot,
                rayon: opt
            }
        }))

        this.setState({inputRayon: opt == undefined ? '' : opt.name});
    }

    PLHOOnChange = (e, opt) => {
        if(opt != null && opt != undefined)
        this.setState(prevState => ({
            ...prevState,
            trialPlot: {
                ...prevState.trialPlot,
                plho: opt
            }
        }))

        this.setState({inputPlho: opt == undefined ? '' : opt.plho})
    }

    lesHosOnChange = (e, opt) => {
        if(opt != null && opt != undefined)
        this.setState(prevState => ({
            ...prevState,
            trialPlot: {
                ...prevState.trialPlot,
                leshos: opt
            }
        }))

        this.setState({inputLeshos: opt == undefined ? '' : opt.name})
    }

    lesnichestvoOnChange = (e, opt) => {
        if(opt != null && opt != undefined)
        this.setState(prevState => ({
            ...prevState,
            trialPlot: {
                ...prevState.trialPlot,
                lesnichestvo: opt
            }
        }))

        this.setState({inputLesnichestvo: opt == undefined ? '' : opt.name})
    }

    porodaAddOnChange = (e, opt) => {
        if(opt != null && opt != undefined)
        this.setState(prevState => ({
            ...prevState,
            poroda: {
                ...prevState.poroda,
                porodaId: opt.id
            }
        }))

        this.setState({addInputPoroda: opt == undefined ? '' : opt.name})
    }

    regionInputChange = (evt, name) => {
        const {regions} = this.state;
        const region = regions.find(x => x.name === name);

        if(region !== undefined){
            this.setState(prevState => ({
                ...prevState,
                trialPlot: {
                    ...prevState.trialPlot,
                    region: name
                }
            }))
        }
        else{
            this.setState({
                inputRegion: name
            })
        }
    }

    rayonInputChange = (evt, name) => {
        const {regions, trialPlot} = this.state;
        
        const region = regions.find(x => x.name == trialPlot.region.name).rayonList.find(y => y.name == name);
        
        if(region !== undefined){
            this.setState(prevState => ({
                ...prevState,
                trialPlot: {
                    ...prevState.trialPlot,
                    rayon: name
                }
            }))
        }
        else{
            this.setState({
                inputRayon: name
            })
        }
    }

    plhoInputChange = (evt, name) => {
        const {regions, trialPlot} = this.state;
        
        const region = regions.find(x => x.name == trialPlot.region.name).plhoList.find(y => y.name == name);
        
        if(region !== undefined){
            this.setState(prevState => ({
                ...prevState,
                trialPlot: {
                    ...prevState.trialPlot,
                    plho: name
                }
            }))
        }
        else{
            this.setState({
                inputPlho: name
            })
        }
    }

    leshosInputChange = (evt, name) => {
        const {lesHoses} = this.state;
        const leshos = lesHoses.find(x => x.name === name);

        if(leshos !== undefined){
            this.setState(prevState => ({
                ...prevState,
                trialPlot: {
                    ...prevState.trialPlot,
                    leshos: name
                }
            }))
        }
        else{
            this.setState({
                inputLeshos: name
            })
        }
    }

    lesnichestvoInputChange = (evt, name) => {
        const {lesnichestvas} = this.state;
        const lesnichestvo = lesnichestvas.find(x => x.name === name);

        if(lesnichestvo !== undefined){
            this.setState(prevState => ({
                ...prevState,
                trialPlot: {
                    ...prevState.trialPlot,
                    lesnichestvo: name
                }
            }))
        }
        else{
            this.setState({
                inputLesnichestvo: name
            })
        }
    }

    tymInputChange = (evt, name) => {
        const {tyms} = this.state;
        const tym = tyms.find(x => x.name === name);

        if(tym !== undefined){
            this.setState(prevState => ({
                ...prevState,
                trialPlot: {
                    ...prevState.trialPlot,
                    tym: name
                }
            }))
        }
        else{
            this.setState({
                inputTym: name
            })
        }
    }

    pokrovInputChange = (evt, name) => {
        const {pokrovs} = this.state;
        const pokrov = pokrovs.find(x => x.name === name);

        if(pokrov !== undefined){
            this.setState(prevState => ({
                ...prevState,
                trialPlot: {
                    ...prevState.trialPlot,
                    pokrov: name
                }
            }))
        }
        else{
            this.setState({
                inputPokrov: name
            })
        }
    }

    forestTypeInputChange = (evt, name) => {
        const {forestTypes} = this.state;
        const forestType = forestTypes.find(x => x.name === name);

        if(forestType !== undefined){
            this.setState(prevState => ({
                ...prevState,
                trialPlot: {
                    ...prevState.trialPlot,
                    forestType: name
                }
            }))
        }
        else{
            this.setState({
                inputForestType: name
            })
        }
    }

    pochvaInputChange = (evt, name) => {
        const {pochvas} = this.state;
        const pochva = pochvas.find(x => x.name === name);

        if(pochva !== undefined){
            this.setState(prevState => ({
                ...prevState,
                trialPlot: {
                    ...prevState.trialPlot,
                    pochva: name
                }
            }))
        }
        else{
            this.setState({
                inputPochva: name
            })
        }
    }

    porodaInputChange = (evt, name) => {
        const {porodas} = this.state;
        const poroda = porodas.find(x => x.name === name);

        if(poroda !== undefined){
            this.setState(prevState => ({
                ...prevState,
                trialPlot: {
                    ...prevState.trialPlot,
                    porodaInfo: name
                }
            }))
        }
        else{
            this.setState({
                inputPoroda: name
            })
        }
    }

    porodaChange = () => {
        const {isAddPoroda} = this.state;
        this.setState({isAddPoroda: !isAddPoroda})
    }

    porodaAddInputChange = (evt, name) => {
        const {porodas} = this.state;
        const poroda = porodas.find(x => x.name === name);

        if(poroda !== undefined){
            this.setState(prevState => ({
                ...prevState,
                poroda: {
                    ...prevState.poroda,
                    porodaId: poroda.id
                }
            }))
        }
        else{
            this.setState({
                addInputPoroda: name
            })
        }
    }

    showHeightMeasureTable = () => {
        const {isHeightMeasureTableVisible, toRemoveTableState} = this.state;

        this.setState({isHeightMeasureTableVisible: !isHeightMeasureTableVisible, toRemoveTableState: !toRemoveTableState});
    }

    savePoroda = () => {
        const {poroda, trialPlot} = this.state;
        poroda.plotId = trialPlot.id;

        PorodaService.savePoroda(poroda).then(x => {
            const {isAddPoroda} = this.state;

            this.setState({isAddPoroda: !isAddPoroda});
            // window.location.reload(false);
            this.fetchInitialData();
        })
    }

    deletePoroda = poroda => {
        PorodaService.deletePoroda(poroda.id).then(response => {
            // window.location.reload(false);
            this.fetchInitialData();
        });
        
    }

    render() {
        const {
            isEditable,
            trialPlot,
            regions,
            lesHoses,
            lesnichestvas,
            tyms,
            pokrovs,
            forestTypes,
            pochvas,
            inputRegion,
            inputRayon,
            inputPlho,
            inputLeshos,
            inputLesnichestvo,
            inputTym,
            inputForestType,
            inputPokrov,
            inputPochva,
            inputPoroda,
            addInputPoroda,
            porodas,
            isAddPoroda,
            poroda,
            toRemoveTableState,
            isHeightMeasureTableVisible,
        } = this.state;

        return(
            <div className={isHeightMeasureTableVisible ? "faded" : ""}>
                <Header />
                <div id="container">
                    <div className="bordered">
                        <div style={isEditable ? {display: 'none'} : {}} id="padded-form">
                            <div className="base-title card-title">
                                <p>Карточка пробной площади</p>
                                <Button id="submit-trial-plot-btn" variant="contained" type="button" onClick={this.editTrialPlot}>
                                    Редактировать
                                </Button>
                            </div>
                            <div className="plot-info">
                                <form id="trialForm" noValidate autoComplete="off">
                                    <div id="g">
                                        <div className="info edit-font">
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
                                        </div>
                                        <div className="info edit-font">
                                            <div className="inputs">
                                                <p>ТУМ</p>
                                                <Autocomplete
                                                    className="tym"
                                                    options={[]}
                                                    getOptionLabel={option => option.name}
                                                    id="tym"
                                                    inputValue={trialPlot == null ? '' : trialPlot.tym.name}
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
                                                <p>Преобладающая<br />порода</p>
                                                <Autocomplete
                                                    className="tym"
                                                    options={[]}
                                                    getOptionLabel={option => option.name}
                                                    inputValue={trialPlot == null ? '' : trialPlot.porodaInfo.name}
                                                    id="poroda"
                                                    renderInput={params => 
                                                    {
                                                        return <TextField
                                                        {...params}
                                                        id="filled-basic"
                                                        label="Преобладающая порода"
                                                        type="text"
                                                        name="poroda" />
                                                    }}
                                                />
                                            </div>
                                            <div className="inputs">
                                                <p>Покров</p>
                                                <Autocomplete
                                                    className="tym"
                                                    options={[]}
                                                    getOptionLabel={option => option.name}
                                                    inputValue={trialPlot == null ? '' : trialPlot.pokrov.name}
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
                                                <p>Положение<br />и рельеф</p>
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
                                                <p>Особенности<br />древостоя</p>
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
                                                    inputValue={trialPlot == null ? '' : trialPlot.forestType.name}
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
                                                    inputValue={trialPlot == null ? '' : trialPlot.pochva.name}
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
                                    </div>
                                </form>
                            </div>

                        </div>

                        <div style={isEditable ? {display: 'none'} : {}} className="editable-table">
                            <BindingDataTable
                                trialPlotId={trialPlot == null ? '' : trialPlot.id}
                                geoData={trialPlot == null ? [] : trialPlot.geodataList}
                            />
                        </div>

                        <div style={isEditable ? {display: 'none'} : {}}>
                            {trialPlot == null ? null : trialPlot.porodaList.map((poroda, i) => {
                                return (
                                    <div key={i} className="editable-table">
                                        <div className="poroda-info">
                                            <div>
                                                <p className="poroda-info-title">Порода:</p>
                                                <p>{poroda.poroda.name}</p>
                                            </div>
                                            <div>
                                                <p className="poroda-info-title">Ярус:</p>
                                                <p>{poroda.yarus}</p>
                                            </div>
                                            <div>
                                                <p className="poroda-info-title">Поколение:</p>
                                                <p>{poroda.pokolenie}</p>
                                            </div>
                                            
                                            <Button className="delete-poroda-btn" id="submit-trial-plot-btn" variant="contained" type="button" onClick={() => this.deletePoroda(poroda)}>Удалить породу</Button>
                                        </div>
                                        <TreesCountTable poroda={poroda}/>
                                        <HeightMeasureTable poroda={poroda}/>
                                    </div>
                                )
                                }
                            )}

                            <Button id="submit-trial-plot-btn" variant="contained" type="button" onClick={this.porodaChange}>Добавить породу</Button>
                            <div style={!isAddPoroda ? {display: 'none'} : {}} className="info edit-font">
                                <div className="poroda-adding">
                                    <div className="inputs">
                                            <p>Порода</p>
                                            <Autocomplete
                                                className="dropdown"
                                                options={porodas}
                                                getOptionLabel={option => option.name}
                                                inputValue={addInputPoroda}
                                                onInputChange={this.porodaAddInputChange}
                                                onChange={this.porodaAddOnChange}
                                                id="addPoroda"
                                                renderInput={params => 
                                                {
                                                    return <TextField
                                                    {...params}
                                                    id="filled-basic"
                                                    label="Порода"
                                                    type="text"
                                                    name="addPoroda" />
                                                }}
                                            />
                                        </div>
                                    
                                    <div className="inputs">
                                        <p>Ярус</p>
                                        <TextField
                                            className="tym"
                                            id="filled-basic"
                                            label="Ярус"
                                            type="text"
                                            name="yarus"
                                            value={poroda.yarus}
                                            onChange={this.porodaOnChangeField}
                                        />
                                    </div>
                                    <div className="inputs">
                                        <p>Поколение</p>
                                        <TextField
                                            className="tym"
                                            id="filled-basic"
                                            label="Поколение"
                                            type="text"
                                            name="pokolenie"
                                            value={poroda.pokolenie}
                                            onChange={this.porodaOnChangeField}
                                        />
                                    </div>
                                    <div className="inputs">
                                        <p>Средний возраст</p>
                                        <TextField
                                            className="tym"
                                            id="filled-basic"
                                            label="Средний возраст"
                                            type="text"
                                            name="averageAge"
                                            value={poroda.averageAge}
                                            onChange={this.porodaOnChangeField}
                                        />
                                    </div>
                                </div>
                                <Button id="submit-trial-plot-btn" variant="contained" type="button" onClick={this.savePoroda}>Сохранить породу</Button>
                            </div>
                        </div>
                    </div>
                    <div style={!isEditable ? {display: 'none'} : {}} id="padded-form">
                        <div className="base-title card-title">
                            <p>Карточка пробной площади</p>
                            <Button id="submit-trial-plot-btn" variant="contained" type="button" onClick={this.updateTrialPlot}>
                                Сохранить
                            </Button>
                        </div>
                        <div className="plot-info">
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
                                            inputValue={inputRegion}
                                            onInputChange={this.regionInputChange}
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
                                    <div className="inner-select">
                                    <Autocomplete
                                            className="dropdown"
                                            options={trialPlot == null ? [] : trialPlot.region.rayonList}
                                            getOptionLabel={option => option.name}
                                            inputValue={inputRayon}
                                            onChange={this.rayonOnChange}
                                            onInputChange={this.rayonInputChange}
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
                                </div>
                                <div className="inputs">
                                    <p>ПЛХО</p>
                                    <Autocomplete
                                        className="dropdown"
                                        options={trialPlot == null ? [] : trialPlot.region.plhoList}
                                        getOptionLabel={option => option.plho}
                                        inputValue={inputPlho}
                                        onChange={this.PLHOOnChange}
                                        onInputChange={this.plhoInputChange}
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
                                        options={trialPlot == null ? [] : lesHoses}
                                        getOptionLabel={option => option.name}
                                        inputValue={inputLeshos}
                                        onChange={this.lesHosOnChange}
                                        onInputChange={this.leshosInputChange}
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
                                        options={trialPlot == null ? [] : lesnichestvas}
                                        getOptionLabel={option => option.name == null || option.name == undefined ? '' : option.name}
                                        inputValue={inputLesnichestvo}
                                        onChange={this.lesnichestvoOnChange}
                                        onInputChange={this.lesnichestvoInputChange}
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
                                <div className="info base-title">
                                    <div className="inputs">
                                        <p>ТУМ</p>
                                        <Autocomplete
                                            className="tym"
                                            options={tyms}
                                            getOptionLabel={option => option.name}
                                            id="tym"
                                            inputValue={inputTym}
                                            onChange={this.tymOnChange}
                                            onInputChange={this.tymInputChange}
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
                                        <p>Преобладающая<br />порода</p>
                                        <Autocomplete
                                            className="tym"
                                            options={porodas}
                                            getOptionLabel={option => option.name}
                                            id="poroda"
                                            inputValue={inputPoroda}
                                            onChange={this.porodaOnChange}
                                            onInputChange={this.porodaInputChange}
                                            renderInput={params => 
                                            {
                                                return <TextField
                                                {...params}
                                                id="filled-basic"
                                                label="Преобладающая порода"
                                                type="text"
                                                name="poroda" />
                                            }}
                                        />
                                    </div>
                                    <div className="inputs">
                                        <p>Покров</p>
                                        <Autocomplete
                                            className="tym"
                                            options={pokrovs}
                                            getOptionLabel={option => option.name}
                                            inputValue={inputPokrov}
                                            onChange={this.pokrovOnChange}
                                            onInputChange={this.pokrovInputChange}
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
                                        <p>Положение<br />и рельеф</p>
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
                                        <p>Особенности<br />древостоя</p>
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
                                            options={forestTypes}
                                            getOptionLabel={option => option.name}
                                            inputValue={inputForestType}
                                            onChange={this.forestTypeOnChange}
                                            onInputChange={this.forestTypeInputChange}
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
                                            options={pochvas}
                                            getOptionLabel={option => option.name}
                                            inputValue={inputPochva}
                                            onChange={this.pochvaOnChange}
                                            onInputChange={this.pochvaInputChange}
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditTrialPlot;
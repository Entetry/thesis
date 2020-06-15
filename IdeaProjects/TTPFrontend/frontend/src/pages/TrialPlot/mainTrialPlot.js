import React from 'react';
import { Select, TextField, Button, Input } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Header from '../../components/Header/header.js';
import TrialPlotService from '../../services/TrialPlotService/index.js';


class MainTrialPlot extends React.Component {
    state ={
        trialPlot: null,
    }

    componentDidMount = () => {
        TrialPlotService.getById(this.props.match.params.id).then(x => {
            this.setState({
                trialPlot: x,
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
    }

    editTrialPlot = () => {
        this.props.history.push(`/editTrial/${this.props.match.params.id}`);
    }

    render() {
        const {trialPlot} = this.state;
        return(
            <>
            <Header />
            <div id="padded-form">
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
            </>
        )
    }
}

export default MainTrialPlot;
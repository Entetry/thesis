import React from 'react';
import Header from '../../components/Header/header.js';
import TrialPlotService from '../../services/TrialPlotService';
import { Select, TextField, Button } from '@material-ui/core';

import MenuItem from '@material-ui/core/MenuItem';
import './style.css';

class EditTrialPlot extends React.Component {
    state = {
        
    }

    async componentDidMount() {
        console.log('DID MOUNT');
            
    }

    render() {
        console.log('STATE', this.state);
        console.log('PROPS', this.props);
        
        const trialPlotRequest = {
            ...this.props.location.trialPlotRequest
        };

        return(
            <>
                <Header />
                <div id="container">
                    <div id="padded-form">
                        <div className="base-title card-title">
                            <p>Карточка пробной площади</p>
                        </div>
                        <div className="plot-info">
                                <div className="info base-title">
                                    <div className="inputs inner-inputs">
                                        <p>Выдел</p>
                                        <TextField
                                            id="standard-basic"
                                            label="Выдел"
                                            type="text"
                                            value={trialPlotRequest.videl}
                                            name="videl"
                                        />
                                    </div>
                                    <div className="inputs inner-inputs">
                                        <p>Площадь пробы</p>
                                        <TextField
                                            id="filled-basic"
                                            label="Площадь пробы"
                                            type="text"
                                            name="ploshadProbi"
                                            value={trialPlotRequest.ploshadProbi}
                                        />
                                    </div>
                                    <div className="inputs inner-inputs">
                                        <p>Квартал</p>
                                        <TextField
                                            id="filled-basic"
                                            label="Квартал"
                                            type="text"
                                            name="kvartal"
                                            value={trialPlotRequest.kvartal}
                                        />
                                    </div>
                                    <div className="inputs inner-inputs">
                                        <p>ТУМ</p>
                                        <TextField
                                            id="filled-basic"
                                            label="TYM"
                                            type="text"
                                            name="tym"
                                            value={trialPlotRequest.tym}
                                        />
                                    </div>
                                    <div className="inputs inner-inputs">
                                        <p>Покров</p>
                                        <TextField
                                            id="filled-basic"
                                            label="pokrov"
                                            type="text"
                                            name="pokrov"
                                            value={trialPlotRequest.pokrov}
                                        />
                                    </div>
                                    <div className="inputs inner-inputs">
                                        <p>Положение и рельеф</p>
                                        <TextField
                                            id="filled-basic"
                                            label="Положение и рельеф"
                                            type="text"
                                            name="positionAndRelief"
                                            value={trialPlotRequest.positionAndRelief}
                                        />
                                    </div>
                                    <div className="inputs inner-inputs">
                                        <p>Особенности древостоя</p>
                                        <TextField
                                            id="filled-basic"
                                            label="Особенности древостоя"
                                            type="text"
                                            name="osobennostiDrev"
                                            value={trialPlotRequest.osobennostiDrev}
                                        />
                                    </div>
                                    <div className="inputs inner-inputs">
                                        <p>Тип леса</p> 
                                        <TextField
                                            id="filled-basic"
                                            label="Тип леса"
                                            type="text"
                                            name="forestType"
                                            value={trialPlotRequest.forestType}
                                        />
                                    </div>
                                    <div className="inputs inner-inputs">
                                        <p>Почва</p>
                                        <TextField
                                            id="filled-basic"
                                            label="Почва"
                                            type="text"
                                            name="pochva"
                                            value={trialPlotRequest.pochva}
                                        />
                                    </div>
                                    <div className="inputs inner-inputs">
                                        <p>Исполнитель</p>
                                        <TextField
                                            id="filled-basic"
                                            label="Испольнитель"
                                            type="text"
                                            name="ispolnitel"
                                            value={trialPlotRequest.ispolnitel}
                                        />
                                    </div>
                                    <Button id="submit-trial-plot-btn" variant="contained" type="button">
                                        Редактировать
                                    </Button>
                                </div>
                                <Button id="submit-trial-plot-btn" variant="contained" type="button">
                                    Добавить какую-то таблицу
                                </Button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default EditTrialPlot;
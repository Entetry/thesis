import React from 'react';
import Header from '../../components/Header/header.js';
import ActionBox from '../../components/ActionBox/actionBox.js';
import {appRoutes} from '../../globalVariables.js'
import './style.css';
import forest from './forest.jpg'

class Main extends React.Component {
    render() {
        return (
            <>
                <Header />
                <div className="container">
                    <ActionBox actionName={"Поиск в базе данных"} urlTo={appRoutes.search}/>
                    <ActionBox actionName={"Создать новую ПП"} urlTo={appRoutes.trialPlotPage}/>
                </div>
                <div id="forest">
                    <img src={forest}/>
                </div>
            </>
        );
    }
}

export default Main;
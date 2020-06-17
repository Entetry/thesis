import React from 'react';
import Header from '../../components/Header/header';
import './style.css';
import { TextField, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TrialPlotService from '../../services/TrialPlotService';
import SearchResultTable from '../../components/Table/SearchResultTable';

class SearchPage extends React.Component {
    state = {
        regions: [],
        lesHoses: [],
        lesnichestvas: [],

        trialPlotRequest: {
            regionId: -1,
            rayonId: -1,
            leshosId: -1,
            lesnichestvoId: -1,
        },

        searchResult: [],
    };

    async componentDidMount() {
        const regions = await TrialPlotService.getAllRegions();
        const lesHoses = await TrialPlotService.getAllLesHoses();
        const lesnichestvas = await TrialPlotService.getAllLesnichestvas();
        
        this.setState({
            regions: regions,
            lesHoses: lesHoses,
            lesnichestvas: lesnichestvas,
        });
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

    searchTrialPlots = obj => {
        const {trialPlotRequest} = this.state;
        TrialPlotService.searchTrialPlot(trialPlotRequest).then(response => {
            console.log('RESPONSE', response);
            this.setState({
                searchResult: response
            });
        });
    }

    render() {
        const {
            regions,
            lesHoses,
            lesnichestvas,
            trialPlotRequest,
            searchResult,
        } = this.state;

        return(
            <>
                <Header />
                <div>
                    <h1>Фильтры</h1>
                    <div className="bordered-search-form">
                        <div className="filters">
                            <div className="search-inputs">
                                <h1>Область</h1>
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
                            <Button className="search-btn" id="submit-trial-plot-btn" variant="contained" type="button" onClick={this.searchTrialPlots}>Поиск</Button>

                            </div>
                            <div className="search-inputs">
                                <h1>Район</h1>
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
                            <div className="search-inputs">
                                <h1>Лесхоз</h1>
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
                            <div className="search-inputs">
                                <h1>Лесничество</h1>
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
                            <div className="search-inputs">
                            </div>

                        </div>
                        <SearchResultTable props={this.props} data={searchResult}/>
                    </div>
                </div>
            </>
        )
    }
}

export default SearchPage;
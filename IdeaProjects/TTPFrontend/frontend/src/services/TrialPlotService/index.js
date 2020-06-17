import request from '../../http/http.js';

const createTrialPlot = data => {
    return request({
        method: 'POST',
        url: '/trialplots',
        data: data
    }).then(data => {
        return data;
    });
}

const getAllRayons = () => {
    return request({
        method: 'GET',
        url: '/baseInfo/rayons'
    }).then(data => data);
};

const getAllRegions = () => {
    return request({
        method: 'GET',
        url: '/baseInfo/regions'
    }).then(data => data);
}

const getAllLesHoses = () => {
    return request({
        method: 'GET',
        url: '/baseInfo/lesHoses'
    }).then(data => data);
}

const getAllLesnichestvas = () => {
    return request({
        method: 'GET',
        url: '/baseInfo/lesnichestvas'
    }).then(data => data);
}

const getAllTyms = () => {
    return request({
        method: 'GET',
        url: 'baseInfo/tyms'
    }).then(data => data);
}

const getAllPokrovs = () => {
    return request({
        method: 'GET',
        url: '/baseInfo/pokrovs'
    }).then(data => data)
}

const getAllForestTypes = () => {
    return request({
        method: 'GET',
        url: '/baseInfo/forestTypes'
    }).then(data => data);
}

const getAllPochvas = () => {
    return request({
        method: 'GET',
        url: '/baseInfo/pochvas'
    }).then(data => data);
}

const getById = id => {
    return request({
        method: 'GET',
        url: `/trialplots/${id}`
    });
}

const updateTrialPlot = requestData => {
    return request({
        method: 'PUT',
        url: '/trialplots',
        data: requestData
    }).then(response => response);
}

const getAllPoroda = () => {
    return request({
        method: 'GET',
        url: '/baseInfo/porodaInfo'
    });
}

const getCalculatedTrialPlot = id => {
    return request({
        method: 'GET',
        url: `trialplots/${id}/calculated`
    });
}

const searchTrialPlot = obj => {
    return request({
        method: 'GET',
        url: `/trialplots?search=Oblast:${obj.regionId},Rayon:${obj.rayonId},Leshoz:${obj.leshosId},Lesnichestvo:${obj.lesnichestvoId}`
    });
}

const TrialPlotService = {
    createTrialPlot,
    getAllRayons,
    getAllRegions,
    getAllLesHoses,
    getAllLesnichestvas,
    getAllTyms,
    getAllPokrovs,
    getAllForestTypes,
    getAllPochvas,
    getById,
    updateTrialPlot,
    getAllPoroda,
    getCalculatedTrialPlot,
    searchTrialPlot
}

export default TrialPlotService;
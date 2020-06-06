import request from '../../http/http.js';

const createTrialPlot = (data) => {
    alert("SOSAT + LEZHAT");
    request({
        method: 'POST',
        url: '/HEHE',
        data: data
    }).then(response => console.log(response))
}

const getAllRayons = () => {
    return request({
        method: 'GET',
        url: '/baseInfo/rayons'
    });
};

const getAllRegions = () => {
    return request({
        method: 'GET',
        url: '/baseInfo/regions'
    })
}

const getAllLesHoses = () => {
    return request({
        method: 'GET',
        url: '/baseInfo/lesHoses'
    })
}

const getAllLesnichestvas = () => {
    return request({
        method: 'GET',
        url: '/baseInfo/lesnichestvas'
    })
}

const TrialPlotService = {
    createTrialPlot,
    getAllRayons,
    getAllRegions,
    getAllLesHoses,
    getAllLesnichestvas
}

export default TrialPlotService;
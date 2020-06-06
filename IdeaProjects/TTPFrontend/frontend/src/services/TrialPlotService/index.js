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
    request({
        method: 'GET',
        url: '/baseInfo/rayons'
    }).then(response => console.log(response))
};

const TrialPlotService = {
    createTrialPlot,
    getAllRayons
}

export default TrialPlotService;
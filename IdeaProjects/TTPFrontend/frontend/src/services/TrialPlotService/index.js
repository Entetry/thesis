import request from '../../http/http.js';

const createTrialPlot = (data) => {
    alert("SOSAT + LEZHAT");
    request({
        method: 'POST',
        url: '/path',
        data: data
    }).then(response => console.log(response))
}

const TrialPlotService = {
    createTrialPlot
}

export default TrialPlotService;
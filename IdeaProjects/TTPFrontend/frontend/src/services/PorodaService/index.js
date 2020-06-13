import request from '../../http/http.js';

const savePoroda = data => {
    return request({
        method: 'POST',
        url: '/poroda',
        data: data
    });
}

const PorodaService = {
    savePoroda,
}

export default PorodaService;
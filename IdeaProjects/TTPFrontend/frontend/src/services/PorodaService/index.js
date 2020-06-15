import request from '../../http/http.js';

const savePoroda = data => {
    return request({
        method: 'POST',
        url: '/poroda',
        data: data
    });
}

const deletePoroda = id => {
    return request({
        method: 'DELETE',
        url: `/poroda/${id}`
    });
}

const PorodaService = {
    savePoroda,
    deletePoroda,
}

export default PorodaService;
import request from '../../http/http.js';

const createGeoData = data => {
    return request({
        method: 'POST',
        url: '/geodata',
        data: data
    });
}

const editGeoData = data => {
    return request({
        method: 'PUT',
        url: '/geodata',
        data: data
    });
}

const deleteGeoData = id => {
    return request({
        method: 'DELETE',
        url: `/geodata/${id}`,
    });
}

const GeoDataService = {
    createGeoData,
    editGeoData,
    deleteGeoData,
};

export default GeoDataService;
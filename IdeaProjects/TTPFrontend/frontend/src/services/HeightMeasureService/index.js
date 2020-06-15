import request from '../../http/http.js';

const saveHeightMeasure = data => {
    return request({
        method: 'POST',
        url: '/heightmeasure',
        data: data
    });
}

const deleteHeightMeasure = id => {
    return request({
        method: 'DELETE',
        url: `/heightmeasure/${id}`,
    })
};

const editHeightMeasure = data => {
    return request({
        method: 'PUT',
        url: '/heightmeasure',
        data: data
    })
}

const HeightMeasureService = {
    saveHeightMeasure,
    deleteHeightMeasure,
    editHeightMeasure,
}

export default HeightMeasureService;
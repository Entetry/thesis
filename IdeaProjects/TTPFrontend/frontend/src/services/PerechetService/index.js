import request from '../../http/http.js';

const savePerechet = data => {
    return request({
        method: 'POST',
        url: '/perechet',
        data: data
    });
}

const editPerechet = data => {
    return request({
        method: 'PUT',
        url: '/perechet',
        data: data
    })
}

const deletePerechet = id => {
    return request({
        method: 'DELETE',
        url: `/perechet/${id}`
    });
}

const PerechetService = {
    savePerechet,
    editPerechet,
    deletePerechet,
}

export default PerechetService;
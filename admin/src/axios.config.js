import axios from 'axios'
window.$axios = axios.create({
    headers: {
        'Content-Type': 'application/json;charset=UTF-8' ,
        'Cache-Control': "no-cache" 
    },
    transformRequest: [function (request) {
        return JSON.stringify(request)
    }],
    transformResponse: [function (response) {
        return response
    }]
});
window.$axios.interceptors.request.use(function (config) {
    if(config.method === 'get') {
        config.params = {
            TIMESTAMP: new Date().getTime(),
            ...config.params
        }
    }
    return config
})
window.$axios.interceptors.response
.use(function (response) {
    return response
    },function (error) {
        if ( error.message === 'Network Error' ){
            $app.$Modal.error({
                title: '操作提示',
                content: '服务器异常',
                onOk: () => {
                    window.location.reload()
                }
            })
        }
    }
)
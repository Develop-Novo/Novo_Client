// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    // app.use(
    //     '/member',
    //     createProxyMiddleware({
    //         target: 'http://35.216.72.222:8080', // 실제 API 서버 주소
    //         changeOrigin: true,
    //     })
    // );

    app.use(
        '/member',
        createProxyMiddleware({
            target: 'http://35.216.73.185:8080',
            changeOrigin: true,
        })
    );
};

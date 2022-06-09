const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(createProxyMiddleware('/apis', {
        logLevel: 'debug',
        //ip address or domain goes here (you will put your ip address in line 7)
        target: "http://138.68.252.84:8080",
        changeOrigin: true,
        secure: true,
    }))
}

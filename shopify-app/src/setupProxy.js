const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:3000', // Adjust this to match your backend URL
            changeOrigin: true,
        })
    );
};

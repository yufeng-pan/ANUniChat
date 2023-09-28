const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://anunichat.onrender.com",
      changeOrigin: true,
    })
  );
};

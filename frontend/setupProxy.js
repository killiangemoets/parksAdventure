const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // Define the proxy middleware for your Express.js backend
  app.use(
    "/api", // Change this to match the route you want to proxy
    createProxyMiddleware({
      target: "https://wild-teal-pelican-shoe.cyclic.cloud/api/v1",
      changeOrigin: true, // Enables cross-origin requests
    })
  );
};

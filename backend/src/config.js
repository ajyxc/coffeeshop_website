const config = {
  environment: process.env.NODE_ENV || 'development',
  server: {
    port: process.env.PORT || 8080
  }
};

module.exports = config;

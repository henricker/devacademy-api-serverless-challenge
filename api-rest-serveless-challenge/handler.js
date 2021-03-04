const awsServerlessExpress = require('aws-serverless-express');
const app = require('./src/app');

const server = awsServerlessExpress.createServer(app);

module.handler = async (event, context) => {
  return awsServerlessExpress.proxy(server, event, context);
}
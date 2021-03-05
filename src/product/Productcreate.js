'use strict'

const AWS = require('aws-sdk');
const uuid = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.createProduct = (event, context, callback) => {

    const datetime = new Date().toISOString();
    const product = JSON.parse(event.body);

    if( typeof product.name !== 'string' || typeof product.price !== 'number') {
        console.error('Product name or price value is not valid!');
        const response = {
            statusCode: 400,
            body: JSON.stringify({ "message":"Product name or price value is not valid!"})
        }

        return;
    }

    const params = {
        TableName: 'products-henrique',
        Item: {
            id: uuid.v1(),
            name: product.name,
            price: product.price,
            createdAt: datetime,
            updatedAt: datetime
        }
    };

    dynamoDb.put(params, (error, data) => {
        if(error) {
            console.error(error);
            callback(new Error(error));
            return;
        }

        const response = {
            statusCode: 201,
            body: JSON.stringify(data.Item)
        };

        callback(null, response);
    });
}
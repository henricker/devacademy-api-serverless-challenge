'use strict'

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.Clientupdate = (event, context, callback) => {

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
        Key: {
            id: event.pathParameters.id
        },
        ExpressionAttributeValues: {
            ':t': product.name,
            ':d': product.done,
            ':u': datetime
        },
        UpdateExpression: 'set name = :t, price = :d, updatedAt = :u'
    };

    dynamoDb.update(params, (error, product) => {
        if(error) {
            console.error(error);
            callback(new Error(error));
            return;
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify(product.Item)
        };

        callback(null, response);
    });
}
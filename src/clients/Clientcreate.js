'use strict'

const AWS = require('aws-sdk');
const uuid = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.Clientcreate = (event, context, callback) => {

    const datetime = new Date().toISOString();
    const client = JSON.parse(event.body);

    if( typeof client.name !== 'string' || typeof client.age !== 'number') {
        console.error('client name or age value is not valid!');
        const response = {
            statusCode: 400,
            body: JSON.stringify({ "message":"client name or age value is not valid!"})
        }

        return;
    }

    const params = {
        TableName: 'clients-henrique',
        Item: {
            id: uuid.v1(),
            name: client.name,
            age: client.price,
            createdAt: datetime,
            updatedAt: datetime
        }
    };

    dynamoDb.put(params, (error, client) => {
        if(error) {
            console.error(error);
            callback(new Error(error));
            return;
        }

        const response = {
            statusCode: 201,
            body: JSON.stringify(client.Item)
        };

        callback(null, response);
    });
}
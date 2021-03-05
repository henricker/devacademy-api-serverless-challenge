'use strict'

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.updateTodo = (event, context, callback) => {

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
        TableName: 'client-henrique',
        Key: {
            id: event.pathParameters.id
        },
        ExpressionAttributeValues: {
            ':t': client.name,
            ':d': client.age,
            ':u': datetime
        },
        UpdateExpression: 'set name = :t, age = :d, updatedAt = :u'
    };

    dynamoDb.update(params, (error, client) => {
        if(error) {
            console.error(error);
            callback(new Error(error));
            return;
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify(client.Item)
        };

        callback(null, response);
    });
}
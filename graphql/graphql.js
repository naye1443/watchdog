const { GraphQLClient, gql } = require('graphql-request');
const fs = require('fs');
const path = require('path');

const query = async (guid) => {
  const endpoint = 'https://api.newrelic.com/graphql';

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      'Api-Key': 'NRAK-VF1VLJF6GJB8WJQJA9SG6CWJKQQ',
    },
  });

  const schema = gql`
    {
      actor {
        entity(guid: "${guid}") {
          alertSeverity
          name
          guid
        }
      }
    }
  `

  return graphQLClient.request(schema);
}

const output = async () => {
  const guidList = JSON.parse(fs.readFileSync(path.resolve(__dirname, './guidlist.json'), 'utf-8'));
  const promises = [];
  const entity = {};

  for (const [key, value] of Object.entries(guidList)) {
    promises.push(query(value.guid));
  }

  await Promise.all(promises).then((values) => {
    for (const [key, value] of Object.entries(values)) {
      entity[key] = {
        guid: value.actor.entity.guid,
        name: guidList[key].name,
        status: value.actor.entity.alertSeverity,
      };
    }
  });
  return entity;
}

module.exports = output;
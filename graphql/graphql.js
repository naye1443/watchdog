const { GraphQLClient, gql } = require('graphql-request');
const fs = require('fs');
const path = require('path');

const main = async () => {
  const endpoint = 'https://api.newrelic.com/graphql';

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      'Api-Key': 'NRAK-VF1VLJF6GJB8WJQJA9SG6CWJKQQ',
    },
  });

  const guidList = JSON.parse(fs.readFileSync(path.resolve(__dirname, './guidlist.json'), 'utf-8'));
  const entity = {};
  for (const [key, value] of Object.entries(guidList)) {
    const query = gql`
      {
        actor {
          entity(guid: "${value.guid}") {
            alertSeverity
            name
            reporting
            entityType
            accountId
          }
        }
      }
    `
    const data = await graphQLClient.request(query);
    entity[key] = {
      guid: value.guid,
      name: value.name,
      status: data.actor.entity.alertSeverity,
    };
  }
  return entity;
}

main().catch((error) => console.error(error));

module.exports = main;
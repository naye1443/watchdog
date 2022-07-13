const { GraphQLClient, gql } = require('graphql-request');

const entity = {};

const main = async () => {
  const endpoint = 'https://api.newrelic.com/graphql';

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      'Api-Key': 'NRAK-VF1VLJF6GJB8WJQJA9SG6CWJKQQ',
    },
  });

  const guidList = [
    "MTI3NzU0MXxTWU5USHxNT05JVE9SfDNiN2MzYTViLTAyM2QtNGY4Mi1hMGZmLWVhZmMwOTA0N2NkMA",
    "MTI3NzU0MXxTWU5USHxNT05JVE9SfGRlZDRkNGEzLTVjNzktNDc5OC1hMjdkLWQ3ZWMyZWE1NWM5Nw",
    "MTI3NzU0MXxTWU5USHxNT05JVE9SfGJlNzA2ZjFmLTMzODQtNGIzMS05ZGNjLWViNDNjYjliZDEzOA",
    "MTI3NzU0MXxTWU5USHxNT05JVE9SfDA2Y2I4OGZjLTcyZDctNGE0Zi1hNGQyLWU0YTllODkzNzNlZA",
    "MTI3NzU0MXxTWU5USHxNT05JVE9SfDliNzQ2MThmLTA3ZDEtNDQxYi1hNjRmLWQzNzFmYjJiMDAwYg",
  ];

  for (let i = 0; i < guidList.length; i++) {
    const query = gql`
      {
        actor {
          entity(guid: "${guidList[i]}") {
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
    entity[i] = {
      guid: guidList[i],
      name: data.actor.entity.name,
      status: data.actor.entity.alertSeverity,
    };
  }
  return entity;
}

main().catch((error) => console.error(error));

module.exports = main;
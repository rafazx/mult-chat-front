import { ApolloClient, gql, InMemoryCache } from '@apollo/client';


const client = new ApolloClient({
  uri: 'http://localhost:3000',
  cache: new InMemoryCache()
});

client
  .query({
    query: gql`
    {
      getMessagesInRoom(page: 1, roomName: "Sala01") {
        text
      }
    }
    `
  })
  .then(result => console.log(result));

export default client;
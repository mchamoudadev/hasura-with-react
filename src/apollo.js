import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";

import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';




const httpsLink = new HttpLink({
    uri: import.meta.env.VITE_HASURA_URI,
    headers: {
        'x-hasura-admin-secret': import.meta.env.VITE_HASURA_ADMIN_SECRET
    }
});

const wsLink = new GraphQLWsLink(createClient({
    url: import.meta.env.VITE_HASURA_WS_URI,
    connectionParams: {
        headers: {
            'x-hasura-admin-secret': import.meta.env.VITE_HASURA_ADMIN_SECRET
        }
    }
}));

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpsLink,
);


export const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
});
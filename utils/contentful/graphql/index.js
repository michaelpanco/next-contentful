import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    ApolloLink
} from '@apollo/client';
import { contentful } from '../../../config';

const httpLink = new HttpLink({
    uri: `${contentful.apiBaseUrl}/content/v1/spaces/${contentful.contentSpace}`
});

const authLink = new ApolloLink((operation, forward) => {
    const token = contentful.CDAAccessToken;

    operation.setContext({
        headers: {
            authorization: `Bearer ${token}`
        }
    });

    return forward(operation);
});

const contentfulGQLClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    onError: ({ networkError, graphQLErrors }) => {
        console.log('graphQLErrors', graphQLErrors);
        console.log('networkError', networkError);
    }
});

export { contentfulGQLClient };

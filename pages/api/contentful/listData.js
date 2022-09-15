import {
    ApolloClient,
    InMemoryCache,
    gql,
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

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    onError: ({ networkError, graphQLErrors }) => {
        console.log('graphQLErrors', graphQLErrors);
        console.log('networkError', networkError);
    }
});

export default async function handler(req, res) {
    try {
        const { data } = await client.query({
            query: gql`
                query {
                    pageCollection {
                        items {
                            sys {
                                id
                                publishedAt
                            }
                            header
                            content
                            footer
                        }
                    }
                }
            `
        });

        const { items } = data.pageCollection;

        const collectionData = items.map((item) => {
            let { id } = item.sys;
            return {
                params: {
                    id: id,
                    header: item.header,
                    content: item.content,
                    footer: item.footer
                }
            };
        });

        res.status(200).json(collectionData);
    } catch (error) {
        console.log(error);
    }
}

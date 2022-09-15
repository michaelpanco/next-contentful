import { contentfulGQLClient } from '../../../../utils';
import { gql } from '@apollo/client';

export default async function handler(req, res) {
    const { id } = req.query;
    try {
        const { data } = await contentfulGQLClient.query({
            query: gql`
                query {
                    page(id: "${id}") {
                        sys {
                            id
                            publishedAt
                        }
                        header
                        content
                        footer
                    }
                }
            `
        });

        res.status(200).json(data.page);
    } catch (error) {
        console.log(error);
    }
}

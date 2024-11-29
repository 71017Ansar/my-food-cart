const MASTER_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
import { gql, request } from 'graphql-request';

const GetCategory = async () => {
  const Query = gql`
    query Categories {
      categories(first: 50) {
        id
        slug
        name
        icon {
          url
        }
      }
    }
  `;

  const result = await request(MASTER_URL, Query);
  return result; // Return the entire data object
};

export default GetCategory;


import { gql, request } from 'graphql-request';

const MASTER_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

// Function to get categories
export const GetCategory = async () => {
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

// Function to get businesses by category
export const GetBusiness = async (category) => {
  const Query = gql`
    query GetBusiness($category: String!) {
      restaurants {
        aboutUs
        address  // Fixed typo from 'aadress' to 'address'
        banner {
          url
        }
        id
        name
        restroType
        slug
      }
    }

  

  `;

  // Pass the category variable to the query
  const result = await request(MASTER_URL, Query, { category });
  return result;
};
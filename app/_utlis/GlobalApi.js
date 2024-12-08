

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
export const GetBusiness = async () => {
  const MASTER_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const Query = gql`
    query GetProducts {
  products (first: 30) {
    id
    name
    rating
    price
    picture {
      url
    }
    description
  }
}

  

  `;

 
  const result = await request(MASTER_URL, Query);

  return result;
};



export const GetProductsDetail = async (name) => {
  const MASTER_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  
  const Query = gql`
    query ProductDetail {
      products(where: { name: "${name}" }) {
        id
        picture {
          id
          url
        }
        rating
        description
        name
        menu {
          ... on Menu {
            category
            id
            menuItem {
              ... on MenuItem {
                id
                name
                price
                productImage {
                  url
                }
                description
              }
            }
          }
        }
      }
    }
  `;
  
  const result = await request(MASTER_URL, Query);
  return result;
};




// query MyQuery4 {
//   products(where: {name: "Pizza"}) {
//     id
//     picture {
//       id
//       url
//     }
//     rating
//     description
//     name
//     menu {
//       ... on Menu {
//         category
//         id
//         menuItem {
//           ... on MenuItem {
//             id
//             name
//             price
//             productImage {
//               url
//             }
//             description
//           }
//         }
//       }
//     }
//   }

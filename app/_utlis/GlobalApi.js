

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
              restaurantName
              restaurantLocation
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


//  export const AddToCart = async (data) => {
//   const MASTER_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
//   const Query = gql`mutation AddToCart {
//   createUserCart(
//     data: {email: " `+data?.email+`", price: `+ data?.price+`, productName: "`+ data?.name+`", productdescription: " `+data?.description+`", productimage:"` + data?.picture?.url+`"}
//   ) {
//     id
//   }
//   publishUserCart(where: {}, to: PUBLISHED) {
//     price
//   }
// }`;
// const result = await request(MASTER_URL, Query);
// return result;
// };







// 






 // Make sure you are using the correct request library
const BackEnd_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;;  // Replace with your actual GraphQL endpoint

 // Assuming you're using this or a similar library for GraphQL

 // Replace this with your actual GraphQL endpoint URL

export const AddToCart = async (data) => {
  const query = `
    mutation AddToCart(
      $email: String!, 
      $price: Float!, 
      $productName: String!, 
      $productdescription: String!
    ) {
      createUserCart(
        data: {
          email: $email,
          price: $price,
          productName: $productName,
          productdescription: $productdescription
        }
      ) {
        id
      }
      publishUserCart(where: {}, to: PUBLISHED) {
        price
      }
    }
  `;

  const variables = {
    email: data?.email || "",
    price: data?.price || 0.0,
    productName: data?.productName || "Unnamed Item",
    productdescription: data?.productdescription || "No description available",
  };

  try {
    const response = await request( BackEnd_URL, query, variables);
    console.log("Response from GraphQL:", response);
    return response;
  } catch (err) {
    console.error("Error making the GraphQL request:", err);
    throw new Error("Error adding to cart.");
  }
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

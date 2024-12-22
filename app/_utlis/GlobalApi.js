import { gql, request } from "graphql-request";

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
      products(first: 30) {
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
const BackEnd_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL; // Replace with your actual GraphQL endpoint

// Assuming you're using this or a similar library for GraphQL

// Replace this with your actual GraphQL endpoint URL
 export const AddToCart = async (data) => {
  const query = `
    mutation AddUserCart($email: String!, $productName: String!, $price: Float!, $productdescription: String! ) {
      createUserCart(
        data: {
          email: $email,
          productName: $productName,
          price: $price,
          productdescription: $productdescription
        }
      ) {
        id
        email
        productName
        price
        productdescription
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
    const response = await fetch(BackEnd_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};










export const GetUserCart = async (email) => {
  if (!MASTER_URL) {
    throw new Error("MASTER_URL is undefined. Check your environment variables.");
  }
  const QUERY = gql`
    query GetUserCart($email: String!) {
      userCarts(where: { email: $email }, first: 50) {
        id
        email
        productName
        price
        productdescription
      }
    }
  `;

  const variables = { email };
  console.log("Sending GraphQL request to:", MASTER_URL);
  console.log("Query variables:", variables);

  try {
    const data = await request(MASTER_URL, QUERY, variables);
    console.log("GraphQL Response:", data);

    if (!data || !data.userCarts) {
      console.error("Invalid response structure:", data);
      throw new Error("Invalid response structure");
    }

    return data;
  } catch (error) {
    console.error("GraphQL Error:", error.message, error.stack);
    throw error;
  }
};
//     export  const GetUserCart = async (email) => {
//   const QUERY = gql`
//   query GetUserCart {
//     userCarts(where: { email: $email }) {
//       id
//       email
//       productName
//       price
//       productdescription
//     }
//   }
// `;
// const data = await request(MASTER_URL, QUERY);
// console.log("Response with hardcoded email:", data);
//     }

      




 


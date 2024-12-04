// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { GetBusiness } from "../_utlis/GlobalApi"; // Use named import

// const BussinessList = () => {
//     const params = useSearchParams();
//     const [businesses, setBusinesses] = useState([]);
//     const [category, setCategory] = useState('all');

//     useEffect(() => {
//         if (params) {
//             const categoryParam = params.get('category');
//             if (categoryParam) {
//                 setCategory(categoryParam);
//                 console.log('Fetching businesses for category:', categoryParam); // Log category being fetched
//                 getBusinessList(categoryParam);
//             }
//         }
//     }, [params]); // Re-run useEffect when `params` changes

//     const getBusinessList = async (category) => {
//         try {
//             console.log('Fetching businesses for category:', category); // Log category being fetched
//             const response = await GetBusiness(category); // Call GetBusiness function here
//             console.log('API Response:', response); // Log the full response
            
//             if (response && response.restaurants) { // Check for proper response structure
//                 setBusinesses(response.restaurants);
//             } else {
//                 console.error('Invalid response format', response);
//             }
//         } catch (error) {
//             console.error("Error fetching business list:", error.response.errors || error.message || error); // Log detailed error message
//         }
//     };

//     return (
//         <div>
//             <h1>Businesses in Category: {category}</h1>
//             <ul>
//                 {businesses.map((business) => (
//                     <li key={business.id}>
//                         <h2>{business.name}</h2>
//                         <p>{business.aboutUs}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default BussinessList;
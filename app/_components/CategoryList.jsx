'use client';

import { useEffect, useRef, useState } from 'react';
import { GetCategory } from '../_utlis/GlobalApi'; // Use named import with curly braces
import Image from 'next/image';
import { ArrowRightCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function CategoryList({setSelectedCategory,selectedCategory}) {
    const [categoryList, setCategoryList] = useState([]);
     // Fixed initial state
    const listRef = useRef(null);

    const params = useSearchParams();
   console.log(selectedCategory)
 

    // useEffect(() => {
    //     const category = params.get('category');
    //     setSelectedCategory(category || 'all'); // Fallback to 'all' if no category is selected
    // }, [params]);

    useEffect(() => {
        const getCategoryList = async () => {
            try {
                const response = await GetCategory();
                if (response && response.categories) {
                    setCategoryList(response.categories);
                } else {
                    console.error('Invalid response format');
                }
            } catch (err) {
                console.error('Failed to load categories', err);
            }
        };
        getCategoryList();
    }, []);

    const scrollRightHandler = () => {
        if (listRef.current) {
            listRef.current.scrollBy({
                left: 200,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="relative bg-gray-50 p-4">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide" ref={listRef}>
                {categoryList.map((category, index) => (
                    <div
                        onClick={()=>{
                            setSelectedCategory(category.name)
                            
                        }}
                        key={index}
                        className={`flex flex-col items-center gap-2 p-4 bg-white rounded-lg shadow-xl hover:shadow-lg transform hover:scale-105 transition-transform min-w-[120px] w-32 `}
                    >
                        {category.icon && category.icon.url ? (
                            <Image src={category.icon.url} alt={category.name} width={50} height={50} className="rounded-md" />
                        ) : (
                            <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center">
                                <span className="text-sm text-gray-500">N/A</span>
                            </div>
                        )}
                        <h2 className="text-gray-800 text-sm font-medium text-center">{category.name}</h2>
                    </div>
                ))}
            </div>
            <ArrowRightCircle
                className="absolute top-1/2 -translate-y-1/2 right-4 bg-gray-500 rounded-full text-white p-1 cursor-pointer h-10 w-10 hover:bg-gray-600 transition"
                onClick={scrollRightHandler}
            />
        </div>
    );
}
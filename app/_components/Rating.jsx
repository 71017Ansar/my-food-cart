import { useState } from 'react';
import { Star } from 'lucide-react'; // For star icons

const Rating = ({ maxStars = 5, onRatingChange }) => {
    const [rating, setRating] = useState(0);

    const handleRating = (value) => {
        setRating(value);
        if (onRatingChange) {
            onRatingChange(value); // Notify parent component
        }
    };

    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: maxStars }, (_, index) => (
                <Star
                    key={index}
                    className={`h-6 w-6 cursor-pointer transition ${
                        index < rating ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                    onClick={() => handleRating(index + 1)}
                />
            ))}
        </div>
    );
};

export default Rating;

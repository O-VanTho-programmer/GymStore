'use client';
import ProductItem from "@/components/ProductItem/ProductItem";
import ProductReview from "@/components/ProductReview/ProductReview";
import { useUser } from "@/context/UserContext";
import getProductReviews from "@/utils/getProductReviews";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
    const { id } = useParams();

    const { currentUser, setCurrentUser } = useUser();
    const [ratingCounts, setRatingCounts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        const fetchReviews = async () => {
            const { averageRating, ratingCounts, reviews } = await getProductReviews(id);
            setReviews(reviews);
            setAverageRating(averageRating);
            setRatingCounts(ratingCounts);
        }
        fetchReviews();
    }, [id]);


    return (
        <div className="px-4 py-4 sm:px-8 sm:py-8 md:px-16 md:py-8 bg-gray-100 flex flex-col gap-6">
            <div>
                <ProductItem id={id} user={currentUser} rating={averageRating} />
            </div>
            {currentUser ? (
                <div className="bg-white">
                <ProductReview user={currentUser} productId={id} rating={averageRating} ratingCounts={ratingCounts} reviews={reviews} />
            </div>
            ) : (
                <div>
                    Loading...
                </div>
            )}
        </div>
    );
}

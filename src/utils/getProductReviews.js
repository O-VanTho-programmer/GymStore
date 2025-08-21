import axios from "axios";

async function getProductReviews(productId) {
    try {
        const res = await axios.get(`gymstore-production.up.railway.app/api/get_reviews/${productId}`);

        if (res.status !== 200) {
            throw new Error("Failed to fetch reviews");
        }

        const reviews = res.data.reviews;
        const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

        if (reviews.length === 0) {
            return {
                averageRating: 0,
                ratingCounts,
                reviews
            }
        }

        let totalRating = 0;

        for (let review of reviews) {
            ratingCounts[review.rating]++;
            totalRating += review.rating;
        }

        let averageRating = totalRating / reviews.length;

        return {
            averageRating: parseFloat(averageRating.toFixed(2)),
            ratingCounts,
            reviews
        };


    } catch (error) {
        console.error("Error fetching product reviews:", error);
        return { averageRating: 0, reviews: [] };
    }
}

export default getProductReviews;

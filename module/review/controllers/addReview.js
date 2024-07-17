const db = require('../../../model/mysql/index');
const Review = db.review;
const Product = db.products;

const addReview = async (req, res) => {
    const { userId, productId, rating } = req.body;

    if (rating < 1 || rating > 5) {
        return res.status(400).send({ message: 'Rating must be between 1 and 5' });
    }

    try {
        // Check if a review by the same user for the same product already exists
        let review = await Review.findOne({ where: { userId, productId } });

        if (review) {
            // Update the existing review
            review.rating = rating;
            await review.save();
        } else {
            // Create a new review
            review = await Review.create({ userId, productId, rating });
        }

        // Calculate the new average rating for the product
        const reviews = await Review.findAll({ where: { productId } });
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / reviews.length;

        // Update the product with the new average rating
        const product = await Product.findByPk(productId);
        if (product) {
            product.review = parseInt(averageRating);
            await product.save();
        }

        return res.status(200).send({ message: 'Review added or updated successfully', review });
    } catch (error) {
        console.error('Error adding or updating review:', error);
        return res.status(500).send({ message: 'Internal server error' });
    }
};

module.exports = addReview;
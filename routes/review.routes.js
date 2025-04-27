import { Router } from "express";
import { uploads } from "../controllers/review.controller.js";
import { createReview, deleteReview, getReview, getReviewByArea, getReviewByFood, getReviewByLocation, getReviewByUser, getReviews, updateReview } from "../controllers/review.controller.js";

const ReviewRouter = Router();

ReviewRouter.get('/', getReviews);

ReviewRouter.get('/:id',getReview);

ReviewRouter.post('/upload', uploads.single('image'), createReview);

ReviewRouter.put('/:id', updateReview);

ReviewRouter.delete('/:id', deleteReview);

ReviewRouter.get('/user/:id', getReviewByUser);

ReviewRouter.get('/search/food/:query', getReviewByFood);

ReviewRouter.get('/search/area/:query', getReviewByArea);

ReviewRouter.get('/search/location/:query', getReviewByLocation);


export default ReviewRouter;
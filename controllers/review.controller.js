import Review from "../models/review.model.js";
import User from "../models/user.models.js";
import { GridFSBucket } from "mongodb";
import { conn } from "../database/mongodb.js"
import multer from "multer";
import { Readable } from "stream";

const storage = multer.memoryStorage();
export const uploads = multer({storage});
// let bucket;
// if(conn){
//     bucket = new GridFSBucket(conn.db,{
//         bucketName: "uploads",
//     });
// };

export const getReviews = async (req, res, next) => {
    try{
        const reviews = await Review.find();

        res.status(200).json({
            success: true,
            data: reviews,
        });
    }
    catch(error){
        next(error);
    }
};

export const getReview = async (req, res, next) => {
    try{

        const review = await Review.findById(req.params.id);

        if(!review){
            const error = new Error('Review not found');
            error.statusCode =  404;
            throw error;
        }

        res.status(200).json({
            success:true,
            data: review,
        });
    }
    catch(error){
        next(error);
    }
};


export const updateReview = async (req, res, next) => {

    try{

        const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators:true,
        });

        if(!review){
            const error = new Error('Review not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: 'Review updated successfully',
            data: review,
        });

    } catch(error){
        next(error);
    }
};

export const deleteReview = async (req, res, next) => {

    try{

        const review = await Review.findByIdAndDelete(req.params.id);

        if(!review){
            const error = new Error('Review not found');
            error.statusCode= 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: 'Review deleted successfully',
        })
    }
    catch(error){
        next(error);
    }
};


export const createReview = async (req, res, next) => {
    const file = req.file;
    const { food, address, area, location, rating, comment, userId } = req.body;

    if (rating < 1 || rating > 5) {
        const error = new Error('Rating must be between 1 and 5');
        error.statusCode = 400;
        return next(error);
    }

    if (!file) {
        return res.status(400).json({
            success: false,
            message: 'No File Uploaded',
        });
    }

    try {
        const bucket = new GridFSBucket(conn.db, {
            bucketName: 'uploads',
        });

        const readableStream = new Readable();
        readableStream.push(file.buffer);
        readableStream.push(null);

        const uploadStream = bucket.openUploadStream(file.originalname, {
            contentType: file.mimetype,
        });

        readableStream.pipe(uploadStream);

        uploadStream.on('finish', async () => {
            try {
                const newReview = await Review.create({
                    food: food?.trim(),
                    image: uploadStream.id, // Save the uploaded file's ObjectId
                    address: address?.trim(),
                    area: area?.trim(),
                    location: location?.trim(),
                    rating,
                    comment: comment?.trim(),
                    userId,
                });

                return res.status(201).json({
                    success: true,
                    message: 'Review created successfully',
                    data: newReview,
                });

            } catch (error) {
                next(error);
            }
        });

        uploadStream.on('error', (err) => {
            next(err);
        });

    } catch (error) {
        next(error);
    }
};



export const getReviewByUser = async (req, res, next) => {

    try{

        const reviews = await Review.find({userId : req.params.id});

        if( reviews.length === 0){
            const error = new Error('Review not found');
            error.statusCode=404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: reviews,
        });

    }
    catch(error){
        next(error);
    }
};

export const getReviewByFood = async (req, res, next) => {

    try{
        const varr = req.params.query;
            console.log(varr)
            
        const reviews = await Review.find({food :varr},'food')
        console.log(reviews);

         res.status(200).json({
        success: true,
        data: reviews,
    });

    }
    catch(error){
        next(error);
    }
};

export const getReviewByArea = async (req, res, next) => {

    try{
        const varr = req.params.query;
            console.log(varr)
            
        const reviews = await Review.find({area :varr},'area')
        console.log(reviews);

         res.status(200).json({
        success: true,
        data: reviews,
    });

    }
    catch(error){
        next(error);
    }
};

export const getReviewByLocation = async (req, res, next) => {

    try{
        const varr = req.params.query;
            console.log(varr)
            
        const reviews = await Review.find({location :varr},'location')
        console.log(reviews);

         res.status(200).json({
        success: true,
        data: reviews,
    });

    }
    catch(error){
        next(error);
    }
};
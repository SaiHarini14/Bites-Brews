import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    food:{
        type : String,
        required : [true, 'User Name required'],
        trim: true,
        minLength: 2,
        maxLength: 50
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
      },
      address:{
        type : String,
        required : [true, 'Location of the restaurant is required'],
        trim: true,
        minLength: 2,
        maxLength: 500
    },

    area:{
        type : String,
        required : [true, 'Area required'],
        trim: true,
        minLength: 2,
        maxLength: 20
    },
    location:{
        type : String,
        required : [true, 'City required'],
        trim: true,
        minLength: 2,
        maxLength: 20
    },
    rating:{
        type : Number,
        required : true,
        trim: true,
    },
    comment:{
        type : String,
        required : [true, 'Cannot be empty' ],
        trim: true,
        minLength: 2,
        maxLength: 500
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {timestamps:true});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
import mongoose from 'mongoose';

const ProgressSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'People',
        required: true,
    },
    // each array for each lesson
    completed: {
        type: [String],///L1.1, Q1.1 etc
        default: []
    },
    ongoing: {
        type: [String],
        default: []
    },
    progressData: { //{Q1.1: {}, L1.1: {}} etc
        type: mongoose.Schema.Types.Mixed,
        default: {initialized: true},
    }
    // quiz each array for each lesson
   
},
    {
        timestamps: true,
    }
);

const CourseProgress = mongoose.model('CourseProgress', ProgressSchema);

export default CourseProgress;
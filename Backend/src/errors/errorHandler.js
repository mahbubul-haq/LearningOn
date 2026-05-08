const errorHandler = (err, req, res, next) => {

    const statusCode = err.statusCode || 500;

    const errorMessages = {
        USER_NOT_FOUND: "User not found",
        COURSE_NOT_FOUND: "Course not found",
        UPLOAD_FAILED: "Upload failed. Please try again",
        MISSING_PUBLIC_ID: "Upload failed. Please try again",
        FILE_MISSING: "No file uploaded"
    };

    console.log("from error handler", err);
    res.status(statusCode).json({
        success: false,
        message: errorMessages[err.message] || "Something went wrong"
    });
};

export default errorHandler;
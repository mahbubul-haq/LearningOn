import Course from "../../models/Course.js";
import Enrollment from "../../models/Enrollment.js";
import Follower from "../../models/Follower.js";
import Notification from "../../models/Notification.js";
import People from "../../models/People.js";

const searchUsers = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q || q.trim().length < 2) {
            return res.status(200).json({ success: true, users: [] });
        }

        // Escape special regex characters to prevent ReDoS attacks
        const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        const users = await People.find({
            $or: [
                { name: { $regex: escaped, $options: "i" } },
                { email: { $regex: escaped, $options: "i" } },
            ],
        })
            .select("name email avatar")
            .limit(10)
            .lean();

        res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await People.find().populate("courses").exec();
        res.status(200).json({
            success: true,
            users: users,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getUser = async (req, res) => {
    try {
        const { light } = req.query;
        if (light === "true") {
            const user = await People.findById(req.userId).select("name avatar email").lean();

            if (user) {
                const myCoursesCount = await Course.countDocuments({
                    $or: [
                        { owner: user._id },
                        { courseInstructors: user._id }
                    ]
                });
                user.myCoursesCount = myCoursesCount;
            }

            return res.status(200).json({
                success: true,
                user: user,
            });
        }
        let user = await People.findById(req.userId)
            .populate({
                path: "courses",
                select: "_id category courseTitle skillTags ratings courseThumbnail coursePrice courseStatus",
                populate: {
                    path: "owner",
                    select: "name _id",
                },
            })
            .populate({
                path: "enrolledCourses",
                populate: {
                    path: "courseId",
                    select: "_id category courseTitle skillTags ratings courseThumbnail coursePrice courseStatus",
                    populate: {
                        path: "owner",
                        select: "name _id"
                    }
                },
            })
            .exec();

        user = user._doc;

        user.courses = user.courses.map((course) => {
            return {
                ...course._doc,
                ratings: {
                    totalRating: course._doc.ratings.totalRating,
                    numberOfRatings: course._doc.ratings.numberOfRatings,
                },
            };
        });

        user.enrolledCourses = user.enrolledCourses?.map((course) => {
            if (!course._doc.courseId) return null;

            let modified = {
                ...course._doc,
                course: {
                    category: course._doc.courseId?.category,
                    coursePrice: course._doc.courseId?.coursePrice,
                    courseTitle: course._doc.courseId?.courseTitle,
                    skillTags: course._doc.courseId?.skillTags,
                    courseThumbnail: course._doc.courseId?.courseThumbnail,
                    courseStatus: course._doc.courseId?.courseStatus,
                    _id: course._doc.courseId?._id,

                    owner: {
                        _id: course._doc.courseId?.owner?._id,
                        name: course._doc.courseId?.owner?.name
                    },
                    ratings: {
                        totalRating: course._doc.courseId?.ratings?.totalRating,
                        numberOfRatings: course._doc.courseId?.ratings?.numberOfRatings
                    }
                }

            }
            delete modified.courseId;

            return modified;
        })

        user.enrolledCourses = user.enrolledCourses?.filter(user => user);

        res.status(200).json({
            success: true,
            user: user,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getUserById = async (req, res) => {
    try {
        console.log("this is user by id", req.params.userId);
        const { instructorCard } = req.query;
        let user;
        if (instructorCard) {
            //will optimize later
            user = await People.findById(req.params.userId).populate("courses").lean();
        }
        else {
            user = await People.findById(req.params.userId)
                .populate("courses")
                .lean();
        }

        // Check if the current user (from optional auth) is following this user
        if (req.userId && req.params.userId !== req.userId) {
            const isFollowing = await Follower.exists({
                followerId: req.userId,
                followingId: req.params.userId,
            });
            user.isFollowing = !!isFollowing;
        }

        //console.log(user);
        res.status(200).json({
            success: true,
            user: user,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const follow = async (req, res) => {
    const userId = req.params.userId;

    try {
        if (userId === req.userId) {
            return res.status(400).json({
                success: false,
                message: "You cannot follow yourself",
            });
        }

        const existingFollow = await Follower.findOne({
            followerId: req.userId,
            followingId: userId,
        });

        if (!existingFollow) {
            // Follow: create the relationship and increment counts
            await Follower.create({
                followerId: req.userId,
                followingId: userId,
            });
            await People.updateOne({ _id: userId }, { $inc: { followersCount: 1 } });
            await People.updateOne({ _id: req.userId }, { $inc: { followingCount: 1 } });

            res.status(200).json({
                success: true,
                followed: true,
            });
        } else {
            // Unfollow: remove the relationship and decrement counts
            await Follower.deleteOne({ _id: existingFollow._id });
            await People.updateOne({ _id: userId }, { $inc: { followersCount: -1 } });
            await People.updateOne({ _id: req.userId }, { $inc: { followingCount: -1 } });

            res.status(200).json({
                success: true,
                followed: false,
            });
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getFollowersData = async (req, res) => {
    try {
        const { userId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const totalCount = await Follower.countDocuments({ followingId: userId });

        const followers = await Follower.find({ followingId: userId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate({
                path: "followerId",
                select: "name email avatar",
            })
            .lean();

        // Check if current user follows the queried user
        let isFollowingQueriedUser = false;
        if (req.userId) {
            const exists = await Follower.exists({
                followerId: req.userId,
                followingId: userId,
            });
            isFollowingQueriedUser = !!exists;
        }

        const result = followers
            .filter((f) => f.followerId) // filter out deleted users
            .map((f) => ({
                ...f.followerId,
                followedAt: f.createdAt,
            }));

        res.status(200).json({
            success: true,
            followers: result,
            isFollowingQueriedUser,
            totalCount,
            page,
            totalPages: Math.ceil(totalCount / limit),
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getFollowingData = async (req, res) => {
    try {
        const { userId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const totalCount = await Follower.countDocuments({ followerId: userId });

        const following = await Follower.find({ followerId: userId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate({
                path: "followingId",
                select: "name email avatar",
            })
            .lean();

        const result = following
            .filter((f) => f.followingId) // filter out deleted users
            .map((f) => ({
                ...f.followingId,
                followedAt: f.createdAt,
            }));

        res.status(200).json({
            success: true,
            following: result,
            totalCount,
            page,
            totalPages: Math.ceil(totalCount / limit),
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const updateUser = async (req, res) => {
    const userId = req.userId;
    // console.log(req.body);
    try {
        const user = await People.findByIdAndUpdate(
            userId,
            {
                $set: req.body,
            },
            { new: true }
        ).lean();


        res.status(200).json({
            success: true,
            user: user,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getUserEnrolledCourses = async (req, res) => {

    let courses = await Enrollment.find({ userId: req.userId })
        .populate({
            path: "courseId",
            select: "_id courseTitle category courseThumbnail courseStatus coursePrice skillTags owner",
            populate: {
                path: "owner",
                select: "name _id"
            }
        }).sort({ createdAt: -1 }).lean();

    courses = courses.map((course) => {
        return {
            ...course.courseId
        }
    })

    return res.json({
        success: true,
        courses
    })
};

export { follow, getAllUsers, getUser, getUserById, searchUsers, updateUser, getUserEnrolledCourses, getFollowersData, getFollowingData };

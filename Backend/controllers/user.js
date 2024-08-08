import Notification from "../models/Notification.js";
import People from "../models/People.js";

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
        let user = await People.findById(req.userId)
            .populate("followers following")
            .populate({
                path: "courses",
                select: "_id category courseTitle skillTags ratings courseThumbnail coursePrice",
                populate: {
                    path: "owner",
                    select: "name _id",
                },
            })
            .populate({
                path: "learning",
                populate: {
                    path: "courseId",
                    select: "_id category courseTitle skillTags ratings courseThumbnail coursePrice",
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

        user.learning = user.learning.map((course) => {
          if (!course._doc.courseId) return null;

          let modified = {
            ...course._doc,
            course: {
              category: course._doc.courseId?.category,
              coursePrice: course._doc.courseId?.coursePrice,
              courseTitle: course._doc.courseId?.courseTitle,
              skillTags: course._doc.courseId?.skillTags,
              courseThumbnail: course._doc.courseId?.courseThumbnail,
              _id: course._doc.courseId?._id,
              ratings: {
                totalRating: course._doc.courseId?.ratings?.totalRating,
                numberOfRatings: course._doc.courseId?.ratings?.numberOfRatings
              }
            }
            
          }
          delete modified.courseId;

          return modified;
        })

        user.learning = user.learning.filter(user => user);
        
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
        const user = await People.findById(req.params.userId)
            .populate("courses followers following")
            .exec();
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
    //console.log("following user id: " + userId);

    try {
        const user = await People.findById(userId);
        const currentUser = await People.findById(req.userId);

        if (!user.followers.includes(req.userId)) {
            const user = await People.findById(userId);
            const currentUser = await People.findById(req.userId);

            user.followers.push(req.userId);
            currentUser.following.push(userId);

            await user.save();
            await currentUser.save();

            res.status(200).json({
                success: true,
                user: user,
                follwer: currentUser,
            });
        } else {
            await user.updateOne({ $pull: { followers: req.userId } });
            await currentUser.updateOne({ $pull: { following: userId } });

            res.status(200).json({
                success: true,
                user: user,
                follwer: currentUser,
            });
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const updateUser = async (req, res) => {
    const userId = req.userId;
    console.log(req.body);
    try {
        const user = await People.findByIdAndUpdate(
            userId,
            {
                $set: req.body,
            },
            { new: true }
        ).exec();

        if (req.body.picturePath) {
            const updatedNotifications = await Notification.updateMany(
                {
                    userFrom: user._id,
                },
                {
                    $set: { imageLink: req.body.picturePath },
                }
            );
        }

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

export { follow, getAllUsers, getUser, getUserById, updateUser };


import mongoose from "mongoose";

const FollowerSchema = new mongoose.Schema(
    {
        followerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "People",
            required: [true, "Follower ID is required"],
        },
        followingId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "People",
            required: [true, "Following ID is required"],
        },
    },
    {
        timestamps: true,
    }
);

// A user can only follow another user once
FollowerSchema.index({ followerId: 1, followingId: 1 }, { unique: true });

// Index for efficient queries: get all followers of a user, get all users a user is following
FollowerSchema.index({ followingId: 1 });
FollowerSchema.index({ followerId: 1 });

const Follower = mongoose.model("Follower", FollowerSchema);

export default Follower;

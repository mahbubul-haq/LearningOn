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
    const user = await People.findById(req.userId)
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

export { getAllUsers, getUser, getUserById, follow, updateUser };

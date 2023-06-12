const { add } = require("../models/Reaction.js");
const User = require("../models/User.js");
const Thought = require("../models/Thought.js");

const userController = {
  // Get all users
  getAllUser(req, res) {
    console.log("getAllUser");
    User.find({})
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
        //return res.status(500).json(err);
      });
  },

  // Get a single user by ID
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .select("-__v")
      .populate("thoughts")
      .populate("friends")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // Create a user
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  // Delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        // Remove associated thoughts
        Thought.deleteMany({ username: dbUserData.username })
          .then(() => {
            res.json({ message: "User and associated thoughts deleted!" });
          })
          .catch((err) => res.status(500).json(err));
      })
      .catch((err) => res.status(500).json(err));
  },

  // Update a user by id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // /api/users/:userid/fiends/:friendId
  addFriend({ params }, res) {
    console.log("params", params);
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendsId } },
      { new: true }
    )
      .then((dbUserData) => {
        console.log("dbUserData", dbUserData);
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //addFriend(req, res) {
  //User.findOneAndUpdate(
  //{ _id: req.params.userId },
  //{ $addToSet: { friends: req.params.friendId } },
  //{ new: true }
  //)
  //.then((dbUserData) => {
  //if (!dbUserData) {
  //res.status(404).json({ message: "No user found with this id!" });
  //return;
  //}
  //res.json(dbUserData);
  //})
  //.catch((err) => res.status(400).json(err));
  //},

  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendsId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
};
module.exports = userController;

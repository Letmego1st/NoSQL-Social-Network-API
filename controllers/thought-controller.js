const { User, Thought } = require('../models');

const userController = {
    // Get all users
    getAllThought(req, res) {
      User.find({})
        .populate({
          path: "friends",
          select: "-__v",
        })
        .select("-__v")
        .sort({ _id: -1 })
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => {
          console.log(err);
          res.sendStatus(400);
           //return res.status(500).json(err);
        });
    },
    
    // Get a single user by ID
    getThoughtById({ params }, res) {
      Thought.findOne({ _id: params.id })
        .populate({
          path: "thoughts",
          select: "-__v",
        })
        .populate({
          path: "friends",
          select: "-__v",
        })
        .select("-__v")
        .then((dbThoughtData) => {
          if (!dbThoughtData) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    },
  
    // Create a user
    createThought({ body }, res) {
      Thought.create(body)
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
  
    // Update a user
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
  };
  
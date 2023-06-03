const { User, Thought } = require('../models');


const userController = {
  // Get all users
  getAllUser(req, res) {
    User.find({})
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 });
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
        //return res.status(500).json(err);
        });
    },
  
    // Get a single user by ID
  getUserById({ params }, res) {
    User.findOne({ _id: req.params.id })
    .populate({
        path: "thoughts",
        select: "-__v",
        })
    .populate({
        path: "friends",
        select: "-__v",
        })
    .select("-__v")
    .then((dbUserData) => {
        // If no user is found, send 404
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
  // Create a course
  createCourse(req, res) {
    Course.create(req.body)
      .then((course) => res.json(course))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a course
  deleteCourse(req, res) {
    Course.findOneAndDelete({ _id: req.params.courseId })
      .then((course) =>
        !course
          ? res.status(404).json({ message: 'No course with that ID' })
          : Student.deleteMany({ _id: { $in: course.students } })
      )
      .then(() => res.json({ message: 'Course and students deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a course
  updateCourse(req, res) {
    Course.findOneAndUpdate(
      { _id: req.params.courseId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((course) =>
        !course
          ? res.status(404).json({ message: 'No course with this id!' })
          : res.json(course)
      )
      .catch((err) => res.status(500).json(err));
  },
};

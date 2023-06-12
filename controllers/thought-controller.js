const  User = require("../models/User.js");
const  Thought = require("../models/Thought.js");

const thoughtController = {
    // Get all thoughts
    getAllThought(req, res) {
      Thought.find({})
        .populate({
          path: "reactions",
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
    
    // Get a single thought by ID
    getThoughtById({ params }, res) {
      Thought.findOne({ _id: params.id })
        .populate({
          path: "reactions",
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
  
    // Create a thought
    createThought({ body }, res) {
      Thought.create(body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.json(err));
    },
  
    // Delete a thought
    deleteThought(req, res) {
      Thought.findOneAndDelete({ _id: req.params.id })
        .then((dbThoughtData) => {
          if (!dbThoughtData) {
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
  
    // Update a thought
    updateThought({ params, body }, res) {
      Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbThoughtData => {
          if (!dbThoughtData) {
            res.status(404).json({ message: 'No thoughts found with that id!' });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
   
    // Update a thought
    //updateThought(req, res) {
      //Thought.findOneAndUpdate(
        //{ _id: req.params.id },
        //{ $set: req.body },
        //{ runValidators: true, new: true }
      //)
        //.then((dbThoughtData) => {
          //if (!dbThoughtData) {
            //res.status(404).json({ message: "No user found with this id!" });
            //return;
          //}
          //res.json(dbUserData);
        //})
        //.catch((err) => res.status(400).json(err));
   // },

   addReaction({params, body}, res) {
    Thought.findOneAndUpdate(
      console.log(body),
      {_id: params.thoughtId}, 
      { $addToSet: { reactions: params.reactionsId } },
      //{$push: {reactions: body}}, 
      {new: true, runValidators: true})
    .populate({path: 'reactions', select: '-__v'})
    .select('-__v')
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({message: 'No thoughts with this ID.'});
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err))
},

    // Add a reaction to a thought
    //addReaction(req, res) {
      //Thought.findOneAndUpdate(
        //{ _id: req.params.id },
        //{ $addToSet: { reactions: req.body } },
        //{ runValidators: true, new: true }
      //)
        //.then((dbThoughtData) => {
          //if (!dbThoughtData) {
            //res.status(404).json({ message: "No user found with this id!" });
            //return;
          //}
          //res.json(dbUserData);
        //})
        //.catch((err) => res.status(400).json(err));
    //},

    // Remove a reaction from a thought
    removeReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { reactions: { reactions: req.params.reactionsId } } },
        { runValidators: true, new: true }
      )
        .then((dbThoughtData) => {
          if (!dbThoughtData) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
          }
          res.json(dbUserData);
        })
        .catch((err) => res.status(400).json(err));
    },
  };

  module.exports = thoughtController;
  

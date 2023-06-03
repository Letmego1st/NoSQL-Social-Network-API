const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");  


// Schema to create a thought model
const reactionSchema = new Schema(
  {
    reactionId: {   
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    
    reactionBody: {
      type: String,
      required: true,
      // Must be less than 280 characters long
      maxlength: 280,
    },

    createdAt: {
      type: Date,
      default: Date.now(),
      get: (createdAtVal) => dateFormat(createdAtVal),
    },

    username: {
      type: String,
      required: true,
    },


  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);


module.exports = reactionSchema;

const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },

  options: [
    {
      type: String,
      required: true
    }
  ],

  required: {
    type: Boolean,
    default: false
  }
});

const pollSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    questions: [questionSchema],

    responseType: {
      type: String,
      enum: ["anonymous", "authenticated"],
      default: "anonymous"
    },

    expiresAt: {
      type: Date,
      required: true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    isPublished: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Poll", pollSchema);
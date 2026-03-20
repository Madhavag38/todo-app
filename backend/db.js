const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String
  },
  password: {
    type: String,
    required: true
  }
});
const todoSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
      ref: "user"
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    done: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);
const UserModel = mongoose.model("user", userSchema);
const TodoModel = mongoose.model("todos", todoSchema);
module.exports = {
  UserModel,
  TodoModel
};

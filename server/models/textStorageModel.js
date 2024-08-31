const { model, Schema } = require("mongoose");

const TextStorageSchema = new Schema(
  {
    hash: {
      type: String,
      required: true,
      index: true,
      unique: [
        true,
        "Hash already exists! Perhaps this text was already stored before",
      ],
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("TextStorage", TextStorageSchema);

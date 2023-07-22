const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  date: {
    type: Date,
    required: [true, "Set date of transaction"],
  },
  type: {
    type: String,
    required: [true, "Set type of transaction"],
  },
  category: {
    type: String,
    required: [true, "Set category of transaction"],
  },
  comment: {
    type: String,
  },
  sum: {
    type: Number,
    required: [true, "Set sum of transaction"],
  },
  // owner: {
  //   type: Schema.Types.ObjectId,
  //   ref: "user",
  // },
});


const Transaction = mongoose.model("transaction", transactionSchema);

module.exports = Transaction;
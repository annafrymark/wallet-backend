const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
    required: [true, "Set date of transaction"],
  },
  type: {
    type: Boolean,
    // enum: ["-", "+"],
    required: [true, "Set type of transaction"], //Expense false,  Income true
  },
  category: {
    type: String,
    enum: [
      "Main expenses",
      "Products",
      "Car",
      "Self care",
      "Child care",
      "Household products",
      "Education",
      "Leisure",
      "Other expenses",
      "Income",
    ],
    default: "Income",
    // required: [true, "Set category of transaction"],
  },
  comment: {
    type: String,
    default: "-",
  },
  sum: {
    type: Number,
    default: 0,
    required: [true, "Set sum of transaction"],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  month: {
    type: Number,
  },
  year: {
    type: Number,
  },
},
{
  versionKey: false,
  timestamps: true,
});

transactionSchema.pre("save", function (next) {
  const date = new Date(this.date);
  this.month = date.getMonth() + 1;
  this.year = date.getFullYear();
  next();
});

const Transaction = mongoose.model("transaction", transactionSchema);

module.exports = Transaction;

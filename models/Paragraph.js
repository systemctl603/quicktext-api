const mongoose = require("mongoose");

const ParagraphSchema = new mongoose.Schema({
  author: String,
  paragraphText: String,
  upvotes: Number,
});

ParagraphSchema.methods.upvote = () => {
  this.upvotes++;
};

ParagraphSchema.methods.downvote = () => {
  this.upvotes--;
};
const Paragraph = mongoose.model("Paragraph", ParagraphSchema);

module.exports = Paragraph;

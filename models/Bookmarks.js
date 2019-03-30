const mongoose = require('mongoose');

const { Schema } = mongoose;

const BookmarksSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  url: {
    type: String,
    trim: true,
    required: true
  },
  schedule: {
    type: String,
    trim: true,
    required: false
  },
  last_visited_at: {
    type: Date,
    trim: true,
    required: false
  },
  next_visit_due_at: {
    type: Date,
    trim: true,
    required: false
  }
});

mongoose.model('Bookmarks', BookmarksSchema);
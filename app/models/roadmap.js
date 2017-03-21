var mongoose = require('mongoose');
var Checkpoint = require('../models/checkpoint');

var roadmapSchema = mongoose.Schema({
  name: String,
  category: String,
  estimatedTime: Number,
  creator: {},
  checkpoints: [{ type: mongoose.Schema.Types.ObjectId, ref: "Checkpoint"}]
})

roadmapSchema.statics = {
  getAll: function(id, cb) {
      return this
          .findById(id)
          .populate('checkpoints')
          .exec(cb);
  }
}

var Roadmap = mongoose.model('Roadmap', roadmapSchema);

module.exports = Roadmap;

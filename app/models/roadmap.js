var mongoose = require('mongoose');

var roadmapSchema = mongoose.Schema({
  name: String,
  checkpoints: [{ type: mongoose.Schema.Types.ObjectId, ref: "Checkpoint"}]
})

roadmapSchema.methods.addCheckpoint = function(checkpoint, cb) {
  this.checkpoints.push(checkpoint._id);
  checkpoint.save(function(err) {
    this.save();
  }).bind(this);
}

var Roadmap = mongoose.model('Roadmap', roadmapSchema);

module.exports = Roadmap;

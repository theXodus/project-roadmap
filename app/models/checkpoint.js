var mongoose = require('mongoose');

var checkpointSchema = mongoose.Schema({
  title: String,
  _roadmap: { type: mongoose.Schema.Types.ObjectId, ref: "Roadmap" }
})

var Checkpoint = mongoose.model('Checkpoint', checkpointSchema);

module.exports = Checkpoint;

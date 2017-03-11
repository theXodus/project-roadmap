var mongoose = require('mongoose');
var Roadmap = require('../models/roadmap');
var Checkpoint = require('../models/checkpoint');


exports.show = function(req, res) {
  Checkpoint.findById(req.params.id, function(err, checkpoint) {
    if (err)
      res.send(err)

    res.json(checkpoint);
  })
}

// Create Checkpoint
exports.create = function(req, res) {
  Roadmap.findById(req.params.roadmap_id, function(err, roadmap) {
    Checkpoint.create({
      title: req.body.title,
      _roadmap: req.params.roadmap_id
    }, function(err, checkpoint) {
      if (err)
        res.send(err)
      roadmap.checkpoints.push(checkpoint._id);
      roadmap.save();
      roadmap.populate('checkpoints', function(err, roadmap){
        res.send(roadmap.checkpoints)
      });
    })
  })

}
// Update Checkpoint
exports.update = function(req, res) {
  Checkpoint.findById(req.params.checkpoint_id, function(err, checkpoint){
    if (err)
      res.send(err);

    checkpoint.title = req.body.title
    checkpoint.save()

    Roadmap.getAll(checkpoint._roadmap, function(err, roadmap){
      res.json(roadmap.checkpoints)
    })
  })
}
// Delete Checkpoint
exports.delete = function(req, res) {
  Checkpoint.findById(req.params.checkpoint_id , function(err, checkpoint){
    var roadmapId = checkpoint._roadmap;
    var checkpointId = req.params.checkpoint_id

    checkpoint.remove({
      _id: req.params.checkpoint_id
    }, function(err, checkpoint) {
      if (err)
      res.send(err);
      Roadmap.getAll(roadmapId, function(err, roadmap) {
        roadmap.checkpoints.remove(checkpointId)
        roadmap.save();
        res.json(roadmap.checkpoints);
      })
    });
  });
}

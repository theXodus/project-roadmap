var mongoose = require('mongoose');
var Roadmap = require('../models/roadmap');
var Checkpoint = require('../models/checkpoint');


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
      roadmap.populate('checkpoints');
      res.json(roadmap.checkpoints);
    })
  })
}
// Update Checkpoint
exports.update = function(req, res) {
  Checkpoint.findById(req.params.checkpoint_id, function(err, checkpoint){
    if (err)
      res.send(err);

    checkpoint.title = req.body.title
    checkpoint.save(function(err){
      if (err)
        res.send(err);

      res.send({message: "Checkpoint Updated"});
    })
  })
}
// Delete Checkpoint
exports.delete = function(req, res) {
  Checkpoint.findById(req.params.checkpoint_id , function(err, checkpoint){
    checkpoint.remove({
      _id: req.params.checkpoint_id
    }, function(err, checkpoint) {
      if (err)
      res.send(err);

      res.json({message: "Checkpoint Deleted"});
    });

    Roadmap.findById(checkpoint._roadmap, function(err, roadmap){
      roadmap.checkpoints.remove(req.params.checkpoint_id)
      roadmap.save();
    })
  });
}

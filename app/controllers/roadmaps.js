var mongoose = require('mongoose');
var Roadmap = require('../models/roadmap');

// Get All Roadmaps
exports.index = function(req, res) {
  Roadmap.find(function(err, roadmaps) {
    if (err)
    res.send(err)

    res.json(roadmaps);
  });
}
// Get One Roadmap
exports.show = function(req, res) {
  Roadmap.findById(req.params.roadmap_id).populate('checkpoints').exec(function(err, roadmap) {
    if (err)
    res.send(err);

    res.json(roadmap);
  })
}
// Create Roadmap
exports.create = function(req, res) {
  Roadmap.create({
    name: req.body.name,
    done: false
  }, function(err, roadmap) {
    if (err)
    res.send(err);

    Roadmap.find(function(err, roadmaps) {
      if (err)
      res.send(err);

      res.json(roadmaps);
    });
  });
}
// Update Roadmap
exports.update = function(req, res) {
  Roadmap.findById(req.params.roadmap_id, function(err, roadmap){
    if (err)
    res.send(err);

    roadmap.name = req.body.name
    roadmap.save(function(err){
      if (err)
      res.send(err);

      res.send({message: "Roadmap Updated"});
    })
  })
}
// Delete Roadmap
exports.delete = function(req, res) {
  Roadmap.remove({
    _id: req.params.roadmap_id
  }, function(err, roadmap) {
    if (err)
    res.send(err);

    Roadmap.find(function(err, roadmaps) {
      if (err)
      res.send(err);
      res.json(roadmaps);
    });
  });
}

var Roadmap = require('./models/roadmap');
var Checkpoint = require('./models/checkpoint');

module.exports = function(app) {

  // -------------------------------------------
  // ROADMAP ROUTES
  // -------------------------------------------
  // Get all Roadmaps
  app.get('/api/roadmaps', function(req, res) {
    Roadmap.find(function(err, roadmaps) {
      if (err)
      res.send(err)

      res.json(roadmaps);
    });
  });
  // Get a single Roadmap
  app.get('/api/roadmaps/:roadmap_id', function(req, res) {
    Roadmap.findById(req.params.roadmap_id).populate('checkpoints').exec(function(err, roadmap) {
      if (err)
      res.send(err);

      res.json(roadmap);
    })
  });
  // Create Roadmap
  app.post('/api/roadmaps', function(req, res) {
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
  });
  // Edit Roadmap
  app.put('/api/roadmaps/:roadmap_id', function(req, res) {
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
  })
  // Delete Roadmap
  app.delete('/api/roadmaps/:roadmap_id', function(req, res) {
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
  });

  // -------------------------------------------
  // CHECKPOINT ROUTES
  // -------------------------------------------
  // Create Checkpoint
  app.post('/api/roadmaps/:roadmap_id/checkpoints', function(req, res) {
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
  });
  // Update Checkpoint
  app.put('/api/checkpoints/:checkpoint_id', function(req, res) {
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
  });
  // Delete Checkpoint
  app.delete('/api/checkpoints/:checkpoint_id', function(req, res) {
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
  });
}

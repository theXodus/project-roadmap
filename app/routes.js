var Checkpoint = require('./models/checkpoint');

module.exports = function(app) {

  // -------------------------------------------
  // ROADMAP ROUTES
  // -------------------------------------------
  var roadmaps = require('./controllers/roadmaps')
  app.get('/api/roadmaps', roadmaps.index); // Get all Roadmaps
  app.post('/api/roadmaps', roadmaps.create); // Create Roadmap
  app.get('/api/roadmaps/:roadmap_id', roadmaps.show); // Get a single Roadmap
  app.put('/api/roadmaps/:roadmap_id', roadmaps.update) // Update Roadmap
  app.delete('/api/roadmaps/:roadmap_id', roadmaps.delete); // Delete Roadmap

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

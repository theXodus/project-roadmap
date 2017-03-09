var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/test-roadmap');

app.use(bodyParser.json());

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

var checkpointSchema = mongoose.Schema({
  title: String,
  _roadmap: { type: mongoose.Schema.Types.ObjectId, ref: "Roadmap" }
})

checkpointSchema.pre('remove', function(next){
    var checkpoint = this;
    checkpoint.model('Roadmap').update(
      { checkpoint: checkpoint._id },
      { $pull: { checkpoints: checkpoint._id } },
      next
    );
});

// A mongoose model, or multiple
var Roadmap = mongoose.model('Roadmap', roadmapSchema);

var Checkpoint = mongoose.model('Checkpoint', checkpointSchema);

app.use(express.static(__dirname + '/public'));

// Create, read, update, delete routes ("/api/roadmaps")
// Get all Roadmaps
app.get('/api/roadmaps', function(req, res) {
  Roadmap.find(function(err, roadmaps) {
    if (err)
      res.send(err)

    res.json(roadmaps);
  });
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
// Get a single Roadmap
app.get('/api/roadmaps/:roadmap_id', function(req, res) {

  Roadmap.findById(req.params.roadmap_id).populate('checkpoints').exec(function(err, roadmap) {
    if (err)
      res.send(err);

    res.json(roadmap);
  })

  // Roadmap.findById(req.params.roadmap_id, function(err, roadmap) {
  //   if (err)
  //     res.send(err);
  //
  //   Checkpoint.find({ _roadmap: req.params.roadmap_id }, function(err, checkpoints) {
  //     if (err)
  //       res.send(err);
  //
  //     roadmap.checkpoints = checkpoints;
  //     res.json(checkpoints);
  //   });
  // })
});


// Checkpoint routes
// All Checkpoints, Dev Only
app.get('/api/checkpoints', function(req, res) {
  Checkpoint.find(function(err, checkpoints) {
    if (err)
      res.send(err)

    res.json(checkpoints);
  });
});
// Get checkpoints for roadmap
app.get('/api/roadmaps/:roadmap_id/checkpoints', function(req, res) {
  Checkpoint.findById(req.params.roadmap_id, function(err, checkpoints) {
    if (err)
      res.send(err)

    res.json(checkpoints)
  })
});
// Create checkpoints
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
      // .exec(function(err, roadmap) {
      //   if (err)
      //     res.send(err);
      //
      //   res.json(roadmap.checkpoints);
      // })
      // res.json(roadmap.checkpoints);
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

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})




// {
//   "errors": {
//     "_roadmap": {
//       "message": "Cast to Number failed for value \"58adcbd5ee3d8dd36d640879\" at path \"_roadmap\"",
//       "name": "CastError",
//       "stringValue": "\"58adcbd5ee3d8dd36d640879\"",
//       "kind": "Number",
//       "value": "58adcbd5ee3d8dd36d640879",
//       "path": "_roadmap",
//       "reason": {
//         "message": "Cast to number failed for value \"58adcbd5ee3d8dd36d640879\" at path \"_roadmap\"",
//         "name": "CastError",
//         "stringValue": "\"58adcbd5ee3d8dd36d640879\"",
//         "kind": "number",
//         "value": "58adcbd5ee3d8dd36d640879",
//         "path": "_roadmap"
//       }
//     }
//   },
//   "message": "Checkpoint validation failed",
//   "name": "ValidationError"
// }

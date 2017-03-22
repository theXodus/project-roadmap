var Checkpoint = require('./models/checkpoint');
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'nvwvrhycms',
  userProperty: 'payload'
});

module.exports = function(app) {

  // -------------------------------------------
  // ROADMAP ROUTES
  // -------------------------------------------
  var roadmaps = require('./controllers/roadmaps')
  app.get('/api/roadmaps', roadmaps.index); // Get all Roadmaps
  app.post('/api/roadmaps', auth, roadmaps.create); // Create Roadmap
  app.get('/api/roadmaps/:roadmap_id', roadmaps.show); // Get a single Roadmap
  app.put('/api/roadmaps/:roadmap_id', auth, roadmaps.update) // Update Roadmap
  app.delete('/api/roadmaps/:roadmap_id', auth, roadmaps.delete); // Delete Roadmap

  // -------------------------------------------
  // CHECKPOINT ROUTES
  // -------------------------------------------
  var checkpoints = require('./controllers/checkpoints')
  app.get('/api/checkpoints/:id', checkpoints.show); // get single checkpoint
  app.post('/api/roadmaps/:roadmap_id/checkpoints', checkpoints.create); // Create Checkpoint
  app.put('/api/checkpoints/:checkpoint_id', checkpoints.update); // Update Checkpoint
  app.delete('/api/checkpoints/:checkpoint_id', checkpoints.delete); // Delete Checkpoint

  // -------------------------------------------
  // USER ROUTES
  // -------------------------------------------
  var authentication = require('./controllers/auth')
  app.get('/api/users', authentication.index) // list all users
  app.post('/api/register', authentication.register) // create new user
  app.post('/api/login', authentication.login) // login
}

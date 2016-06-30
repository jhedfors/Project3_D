var user = require('../controllers/users.js')
var bid = require('../controllers/bids.js')


module.exports = function(){
  app.get('/users',user.index)
  app.get('/user/:name',user.show)
  app.get('/user_id/:id',user.show_id)

  app.post('/user', function(req, res){
    console.log('ROUTEs', req);
    user.create(req,res)
  })
  app.get('/bids',bid.index)
  app.post('/bid',bid.create)
  app.post('/reset',bid.reset)

  // app.post('/complete/:id', task.toggle_complete)

  // app.get('/question/:id',question.show)
  // app.get('/questions',question.index)
  // app.get('/tasks',task.index)

  // app.post('/answer',question.add_answer)
  //
  // app.post('/like/:question_id/:answer_id',question.like)

}

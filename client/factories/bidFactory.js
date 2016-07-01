myApp.factory('bidFactory', function($http,$location){
  var factory = {}
  var bids = []
  factory.index = function(callback){
    $http.get('/bids').success(function(questions_from_db){
      callback(questions_from_db)
      tasks = questions_from_db
    })
  }
  factory.create = function(bid_info, callback){
      console.log('bid_info', bid_info);
      $http.post('/bid', bid_info).success(function(response_from_server){
        console.log('response_from_server',response_from_server);
        callback()
      })
  }
  factory.reset = function(callback){
      console.log('in reset');
      $http.post('/reset').success(function(response_from_server){
        console.log('response_from_server',response_from_server);
        callback()
      })
  }
  return factory
})

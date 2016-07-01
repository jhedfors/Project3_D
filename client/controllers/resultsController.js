myApp.controller('resultsController',function(bidFactory,userFactory,$location,$filter){
  var self = this
  self.activeUser;
  self.bids_1
  self.bids_2
  self.bids_3
  var getActiveUser = function(){
    userFactory.getActiveUser(function(data){
      if (!data) {
        $location.url('/index')
      }
      self.activeUser = data
    })
    console.log(self.activeUser);
  };
  getActiveUser()
  var index = function(){
    self.bids_1 = [{amount:0}]
    self.bids_2 = [{amount:0}]
    self.bids_3 = [{amount:0}]
    bidFactory.index(function(bids_from_factory){
      bids_from_factory.sort(function(a, b) {
          return parseFloat(b.amount) - parseFloat(a.amount);
      });
      for (var i = 0; i < bids_from_factory.length; i++) {
        if (bids_from_factory[i].product == 1) {
          self.bids_1.push(bids_from_factory[i])
        }
        else if (bids_from_factory[i].product == 2) {
          self.bids_2.push(bids_from_factory[i])
        }
        else {
          self.bids_3.push(bids_from_factory[i])
        }
      }
    })
  }
  index()
  self.startBid = function(){
    console.log('start new bid');
    bidFactory.reset(function(){
      $location.url('/bids')
    })
  }
})

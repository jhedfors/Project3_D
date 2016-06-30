myApp.controller('resultsController',function(bidFactory,userFactory,$location,$filter){
  var self = this
  self.all_bids = []
  self.bids = []
  self.limit =1
  // self.users = []
  self.activeUser;
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
    bidFactory.index(function(bids_from_factory){
      self.all_bids = bids_from_factory
      self.all_bids.sort(function(a, b) {
          return parseFloat(b.amount) - parseFloat(a.amount);
      });
      var p1 = true
      var p2 = true
      var p3 = true
      for (var i = 0; i < self.all_bids.length; i++) {

        if (self.all_bids[i].product == 1 && p1) {
          self.bids.push(self.all_bids[i])
          console.log('first',self.all_bids[i]);
          p1=false
        }
        if (self.all_bids[i].product == 2 && p2) {
          self.bids.push(self.all_bids[i])

          console.log('first',self.all_bids[i]);
          p2=false
        }
        if (self.all_bids[i].product == 3 && p3) {
          self.bids.push(self.all_bids[i])

          console.log('first',self.all_bids[i]);
          p3=false
        }
      }


      console.log('self.bids in controller',self.all_bids);
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

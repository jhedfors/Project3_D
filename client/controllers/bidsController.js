myApp.controller('bidsController',function(bidFactory,userFactory,$location,$filter){
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
  };
  getActiveUser()
  var index = function(){
    self.bids_1 = [{amount:0}]
    self.bids_2 = [{amount:0}]
    self.bids_3 = [{amount:0}]
    bidFactory.index(function(bids_from_factory){
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
  self.bid1 = function(bid){
    console.log(bid.amount);
    if (bid.amount > self.bids_1[self.bids_1.length-1].amount) {
      create_bid(bid.amount,1)
      bid.amount = ''
    }
    else{
      alert('Bid should be higher than the previous bid');
    }
  }
  self.bid2 = function(bid){
    if (bid.amount > self.bids_2[self.bids_2.length-1].amount) {
      create_bid(bid.amount,2)
      bid.amount = ''
    }
    else{
      alert('Bid should be higher than the previous bid');
    }
  }
  self.bid3 = function(bid){
    console.log(self.bids_3[self.bids_3.length-1].amount);
    if (bid.amount > self.bids_3[self.bids_3.length-1].amount) {
      create_bid(bid.amount,3)
      bid.amount = ''
    }
    else{
      alert('Bid should be higher than the previous bid');
    }
  }
  var create_bid = function(bid,product){
    var bid_info = {_bidder: self.activeUser, product:product, amount:bid}
    bidFactory.create(bid_info, function(){
      index()
    })
  }
  self.endBid = function(){
    if (self.bids_1.length > 1 && self.bids_2.length > 1 && self.bids_3.length > 1) {
      $location.url('/result')
    }
    else {
      alert('Cannot end the bid. All products must have bids.')
    }
  }
})

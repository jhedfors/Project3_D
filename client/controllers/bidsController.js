myApp.controller('bidsController',function(bidFactory,userFactory,$location,$filter){
  var self = this
  self.bids = []
  self.max_1;
  self.max_2;
  self.max_3;
  // self.users = []
  self.activeUser;
  self.all_bids =[]






  var getActiveUser = function(){
    userFactory.getActiveUser(function(data){
      if (!data) {
        $location.url('/index')
      }
      self.activeUser = data
    })
  };
  getActiveUser()

  var create_bid = function(bid,product){
    console.log(bid,product);
    var bid_info = {_bidder: self.activeUser, product:product, amount:bid}
    bidFactory.create(bid_info, function(){
      console.log("create controller");
      index()
    })

  }
  self.bid1 = function(bid){
    if (bid.amount > self.max_1 || self.max_1 == null) {
      self.max_1 = bid;
      console.log('max1',self.max_1);
      create_bid(bid.amount,1)
    }
    else{
      alert('Bid should be higher than the previous bid');
    }
  }
  self.bid2 = function(bid){
    if (bid.amount > self.max_2 || self.max_2 == null) {
      self.max_2 = bid;
      console.log('max1',self.max_2);
      create_bid(bid.amount,2)
    }
    else{
      alert('Bid should be higher than the previous bid');
    }
  }
  self.bid3 = function(bid){
    if (bid.amount > self.max_3 || self.max_3 == null) {
      self.max_3 = bid;
      console.log('max1',self.max_3);
      create_bid(bid.amount,3)
    }
    else{
      alert('Bid should be higher than the previous bid');
    }
  }
  var index = function(){
    bidFactory.index(function(bids_from_factory){
      self.bids = bids_from_factory
      self.bids.sort(function(a, b) {
          return parseFloat(b.amount) - parseFloat(a.amount);
      });
      console.log('self.bids in controller',self.bids);
    })
  }
  index()


  var max_bids = function(){
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
          self.max_1 = self.all_bids[i].amount
          console.log('self.max_1',self.max_1);
          p1=false
        }
        if (self.all_bids[i].product == 2 && p2) {
          self.max_2 = self.all_bids[i].amount

          console.log('first',self.all_bids[i]);
          p2=false
        }
        if (self.all_bids[i].product == 3 && p3) {
          self.max_3 = self.all_bids[i].amount

          console.log('first',self.all_bids[i]);
          p3=false
        }
      }


      console.log('self.bids in controller',self.all_bids);
    })
  }
  max_bids()










  self.endBid = function(){
    console.log('bid ended');
    console.log(self.max_1);
    if (self.max_2 > 0 && self.max_2 > 0 && self.max_3 > 0) {
      $location.url('/result')
    }
    else {
      alert('Cannot end the bid. All products must have bids.')
    }
  }

    //
    // var new_task = {creator: self.activeUser.name,_creator: self.activeUser._id, title: self.title, description: self.description, complete:false, tagged: self.tagged}
    // taskFactory.create(new_task,function(){
    //   self.title = ''
    //   self.description = ''
    //   self.tagged = ''
    //   getTasks(self.activeUser._id)
    // })
  // var getUsers = function(){
  //   userFactory.index(function(questions_from_factory){
  //     self.users = questions_from_factory.filter(function(item) {
  //         return item.name !== self.activeUser.name;
  //     })
  //   })
  // }
  // getUsers()
  // console.log(self.users);
  // self.toggle = function(id){
  //   taskFactory.toggle(id,function(){
  //     getTasks(self.activeUser._id)
  //   })
  // }
})

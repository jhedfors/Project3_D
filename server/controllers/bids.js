var Bid = mongoose.model('Bid')
var User = mongoose.model('User')
module.exports = (function(){
  return {
    index: function(request, response){
      Bid.find({}).populate('_bidder')
      .exec(function(err,all_bids){
        response.json(all_bids)
      })
    },
    create: function(request, response){
      console.log('create',request);
      var new_bid = new Bid(request.body)
      new_bid.save(function(err){
        if(err){
          console.log('err', err);
          response.json(err)
        }
        else {
          console.log('new_bid',new_bid);
          response.json({success:true})
        }
      })
    },
    reset: function(request, response){
      Bid.remove({},function(err){
        response.json({result:true})
      })
    },
  }
})()


var userSchema = mongoose.Schema({
  name:{type:String, required:true, minlength:2},
},{timestamps:true})
var user = mongoose.model('User', userSchema)

var bidSchema = mongoose.Schema({
  product:{type:String, required:true},
  _bidder:{type:mongoose.Schema.Types.ObjectId, ref: 'User'},
  amount:{type:Number, required:true},
},{timestamps:true})
var bid = mongoose.model('Bid', bidSchema)

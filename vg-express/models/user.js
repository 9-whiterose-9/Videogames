var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    username: {type: String, required: true},
    password: {type: String, required: true},
    items: [{type: Schema.Types.ObjectId, required : false, ref: "Item"}],
    following: [{type: Schema.Types.ObjectId, required : false, ref: "User"}],
    followers: [{type: Schema.Types.ObjectId, required: false, ref: "User"}] , 
    user_lists: [
      {
        list_name: {type: String},
        list_items: [{type: Schema.Types.ObjectId, required: false, ref: "Item"}]
      }
    ],
    profile_picture:{type: String, default: "https://thumbs.dreamstime.com/b/profile-placeholder-image-gray-silhouette-no-photo-123478397.jpg", description: "default profile picture"}
    
  },
);

UserSchema
.virtual('url')
.get(function () {
  return '/user/' + this.username;
});

module.exports = mongoose.model('User', UserSchema);
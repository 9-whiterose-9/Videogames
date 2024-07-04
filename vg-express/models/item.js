var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ItemSchema = new Schema(
  {
    type: {type: String, required: true},
    description: {type: String, required: true, maxlength: 1000},
    platform: {type: String, required: true},
    idioms: [{type: String, required: true}],
    price: {type: Number, required: true},
    globalClassification: {type: Number, min: 0, max: 10, required: true},
    reviews: [
      {
        username: {type: String},
        comment: {type: String},
        rating: {type: Number, min: 0, max: 10}
      }
    ],
    mainImage: {type: String, required: true}, // Changed to URL type
    secondaryImages: {
      type: [{
        type: String,
        
      }],
      validate: [validateMaxTwo, '{PATH} exceeds the limit of 2']
    },
    videoLink: {type: String}
  },
);

function validateMaxTwo(val) {
  return val.length <= 2;
}


ItemSchema
.virtual('url')
.get(function () {
  return '/item/' + this.designation;
});

module.exports = mongoose.model('Item', ItemSchema);
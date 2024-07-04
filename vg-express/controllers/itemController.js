const fs = require('fs');

const Item = require("../models/item");

/* Get All items on the dashboard (Shop Items) */
exports.items_list = function(req, res, next) {
    Item.find()
        .exec(function(err, list_items) {
            res.send(list_items)
        });
}

exports.getItemDetails = async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await Item.findById(id);
        if (!item) {
          return res.status(404).json({ message: 'Item not found' });
        }
    
        const itemDetails = {
          _id: item.id,
          type: item.type,
          description: item.description,
          platform: item.platform,
          idioms: item.idioms,
          price: item.price,
          globalClassification: item.globalClassification,
          reviews: item.reviews,
          mainImage: item.mainImage, 
          secondaryImages: item.secondaryImages, 
          videoLink: item.videoLink
        };
    
        res.status(200).json(itemDetails);
    } catch (error) {
    
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
};


  
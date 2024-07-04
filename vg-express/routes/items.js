var express = require('express');
var router = express.Router();

var itemController = require("../controllers/itemController");

/* GET items listing*/
router.get('/',itemController.items_list);


/* GET item details */
router.get('/:id/detail', itemController.getItemDetails);

module.exports = router;
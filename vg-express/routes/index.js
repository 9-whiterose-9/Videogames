var express = require('express');
var router = express.Router();


var user_controller = require("../controllers/userController");
var item_controller = require("../controllers/itemController");

router.post('/init', function(req, res) {
    user_controller.serverInit();
    res.send("Populated Database.")
  
})

router.delete('/deleteAll', function(req, res) {
    user_controller.deleteAllUsersAndItems();
    res.send("Cleared Database.")
    
})


/* USERS */ 

/* GET user list details */
router.get('/profile/:id/mylists/:list_name/detail', user_controller.getUserListDetails);

/* POST User */
router.post('/user', user_controller.user_create);



module.exports = router;

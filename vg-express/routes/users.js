var express = require('express');
var router = express.Router();

var user_controller = require("../controllers/userController");
var item_controller = require("../controllers/itemController");

/* GET users listing. */
router.get('/', user_controller.getUsers);

/* GET user  */
router.get('/:id',user_controller.getUser);

router.get('/name/:name',user_controller.getUserByName);


/* GET user followers list */
router.get('/:id/followers',user_controller.getUserFollowersById);

/* GET user following list. */
router.get('/:id/following',user_controller.getUserFollowingById);

/* GET user_lists  */
router.get('/:id/mylists',user_controller.getUserListsById);



router.post('/create', user_controller.createUser);
module.exports = router;



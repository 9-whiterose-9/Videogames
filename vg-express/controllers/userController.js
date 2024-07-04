const fs = require('fs');

var User = require("../models/user")
var Item = require("../models/item");

exports.user_create = function(req, res, next) {

    let newUser = new User(req.body);
    
    User.findOne({ username : newUser.username}, function(err, user) {
        if (err) { return next(err); }
        // Exists
        if (user) {
            res.send({success: false});
        } else {
            newUser.save(function(err, user) {
                if (err) { return next(err)};
                res.send(user);
            });

        }
    });

};

exports.createUser = (req,res,next) =>{
  //faço as verificações no frontend
  // console.log(req.body.username);
  // console.log(req.body.password);
  const user = new User({username: req.body.username, password: req.body.password} );
  // console.log(user);
  user.save((err, user)=>{
    if (err) {
      return next(err)
    }
    console.log(user.username);
    console.log(user._id);
    res.send(user);
  }
  )};


exports.getUsers = function(req, res, next) {

    User.find({}, function(err, users) {
      if (err) return next(err);

      res.send(users);
    });

}


exports.getUser = function(req, res, next) {
  console.log("I tried finding a user with id: " + req.params.id);
  console.log(req.params._id);
  User.findOne({ _id: req.params.id })
  .populate("items")
  .populate("following")
  .populate("followers")
  .populate("user_lists")
  .exec(function (err, user) {
    if (err) { return next(err); }
    res.send(user);
  });
};


exports.getUserByName=(req, res, next)=>{
  console.log("I tried finding a user");
  
  User.findOne({'username':req.params.name}, function(err, user){
    if(err){
      console.log("I detected a server error!");
      res.status(err.status).send("Server error: " + err.message)
    }
    else if (!user) {
      console.log("I couldn't find the specified user!");
      res.status(404).send("User not found");      
    }
    else{
      console.log("I found the user!");
      console.log(user);
    res.json(user);}
  });
}

exports.getUserFollowersById = function(req, res, next) {
  const userId = req.params.id;
  User.findOne({ _id: userId }, function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    User.find({ following: userId }, function(err, followers) {
      if (err) {
        return next(err);
      }
      res.send(followers);
    });
  });
};


exports.getUserFollowingById = function(req, res, next) {
  const userId = req.params.id;
  User.findOne({ _id: userId }, function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.send(user);
  });
};

exports.getUserListsById = function(req, res, next) {
  const userId = req.params.id;
  User.findOne({ _id: userId }, function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.send(user.user_lists);
  });
};

exports.getUserListDetails = async function(req, res, next) {
  try {
    const userId = req.params.id;
    const listName = req.params.list_name;

    const user = await User.findById(userId).populate({
      path: 'user_lists',
      match: { list_name: listName },
      populate: { path: 'list_items' }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userList = user.user_lists[0];

    if (!userList) {
      return res.status(404).json({ message: 'List not found' });
    }

    res.send(userList);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};




exports.serverInit = async function () {
  const users = await User.find();
  for (let i = 0; i < 4; i++) {
    const newUser = new User({
      username: `user00${i}`,
      password: "ABCDEFg1",
      items: [],
      following: [],
      followers: [],
      user_lists: [
        {
          list_name: "wishlist",
          list_items: []
        }
      ],profile_picture: "https://thumbs.dreamstime.com/b/profile-placeholder-image-gray-silhouette-no-photo-123478397.jpg"
    });
    await newUser.save();
    console.log(`User ${newUser.username} saved to the database.`);


    const newItem1 = new Item({
      type: "game",
      description: "Hogwarts Legacy",
      platform: "PS5",
      idioms: ["English","Português"],
      price:  69.99,
      globalClassification: 9,
      reviews: [
        { 
          username: "user003",
          comment: "Still pretty decent, lot of lore. Definitively lot more enjoyable if you like the HP universe (which is a cool one, even if you didn't read/watch HP that much, if you feel drawn by the universe, it's worth buying it, else wait for sale, it still a good game).",
          rating: 7
        }
      ],
      
      mainImage: "https://image.api.playstation.com/vulcan/ap/rnd/202208/1716/X268gSvVQVdqhVBMGYchCHah.png",
     
      secondaryImages: [
        "https://www.techspot.com/articles-info/2627/images/2023-02-14-image-16.jpg"],

      videoLink: "https://www.youtube.com/watch?v=1O6Qstncpnc"

    });


    await newItem1.save();
    console.log(`Item ${newItem1.type} saved to the database.`);
    newUser.items.push(newItem1);
    newUser.user_lists[0].list_items.push(newItem1);


    const newItem2 = new Item({
      type: "game",
      description: "Animal Crossing: New Horizons",
      platform: "Nintendo Switch",
      idioms: ["English", "Português"],
      price: 60,
      globalClassification: 9.5,
      reviews: [ 
        { 
          username: "user001",
          comment: "Animal Crossing: New Horizons é, sem dúvidas, um jogo para indicado para uma diversidade de perfis de jogadores. Diversos games trabalham com a ideia do sucesso e fracasso a partir de algumas mecânicas estabelecidas. Isso é comum e característico da cultura de videogames no geral. Animal Crossing New Horizons é contrário a tudo isso: ele respeita o tempo de aprendizado e desenvolvimento de qualquer um que se arrisque a construir sua própria ilha É claro que ele traz tudo aquilo que um bom título pode oferecer, como visual refinado, uma bela trilha sonora ou mecânicas interessantes. No entanto, são nos fundamentos que Animal Crossing: New Horizons se destaca como um jogo democrático e, principalmente, muito divertido para diferentes tipos de pessoas.",
          rating: 7
        }
      ],
      mainImage: "https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_switch_4/H2x1_NSwitch_AnimalCrossingNewHorizons_image1600w.jpg",
      secondaryImages: [],
      videoLink: "https://www.youtube.com/watch?v=_3YNL0OWio0"
    });


    await newItem2.save();
    console.log(`Item ${newItem2.type} saved to the database.`);

    newUser.items.push(newItem2);
    await newUser.save();

    newUser.user_lists[0].list_items.push(newItem1);
    await newUser.save();

    console.log(`User ${newUser.username} added to database.`);
  }
 

  const all_users = await User.find();
  const user0 = all_users.find(user => user.username === "user000");
  const user1 = all_users.find(user => user.username === "user001");
  const user2 = all_users.find(user => user.username === "user002");
  const user3 = all_users.find(user => user.username === "user003");
  
    user0.followers.push(user1);
    user0.followers.push(user2);
    user0.following.push(user2);
    user0.following.push(user3);

    user1.following.push(user0);
    user1.following.push(user2);

    user2.followers.push(user1);
    user2.followers.push(user0);
    user2.following.push(user0);

    user3.followers.push(user0);
  
    user3.following.push()
    await user0.save();
    await user1.save();
    
    console.log("newUser -> " + user0)

};


exports.deleteAllUsersAndItems = async function (req, res, next) {
  try {
    // Delete all items
    await Item.deleteMany({});
    console.log("All items deleted");

    // Delete all users
    const deletedUsers = await User.deleteMany({});
    console.log(`${deletedUsers.deletedCount} users deleted`);

    
  } catch (error) {
    console.error(error);
  }
};








  
  
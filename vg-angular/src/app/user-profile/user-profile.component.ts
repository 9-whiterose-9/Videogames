import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../services/item.service';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Item } from '../models/item';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  currentUser: User | undefined;
  items: Item[] = [];
  followers: User[] = [];
  following: User[] = [];
  user_lists: { list_name: string; list_items: Item[]; }[] = [];
  userId: string = "";
  profilePic: String = "";
  


  constructor(private route: ActivatedRoute, 
    private itemService: ItemService, private userService: UserService,
    private location: Location) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
          this.userId = params.get('userid') ?? '';
          // Use the user ID to fetch and display the user dashboard data      
        });

        this.fetchUserInfo(this.userId);
    
        // this.getUser(this.userId);
        // this.getFollowers(this.userId);
        // this.getFollowing(this.userId);
        // this.getUserLists(this.userId);
        // this.getProfilePic();
        
      
    }
  fetchUserInfo(userId: string) :void{
    this.userService.getUserById(userId).subscribe(
      user => {
        this.currentUser = user;
        this.profilePic = ''+this.currentUser.profile_picture;
        console.log("profile pic url: ",this.profilePic);
        this.getFollowers(this.userId);
        this.getFollowing(this.userId);
        this.getUserLists(this.userId);
    
  })}

  
    getFollowers(id : String): void{
      this.userService.getUserFollowersById(id)
        .subscribe(user => this.followers = user);
    }
  
    getFollowing(id : String): void{
      this.userService.getUserFollowingById(id)
        .subscribe(user => this.following = user);
    }
  
    getUserLists(id : String): void{
      this.userService.getUserListsById(id)
        .subscribe(list => this.user_lists = list);
    }

    goBack() : void{
      this.location.back();
    }

}

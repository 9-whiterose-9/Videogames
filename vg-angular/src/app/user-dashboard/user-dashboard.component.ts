import { Component, Input, OnInit } from '@angular/core';
import { User } from '../models/user';
import {Item} from '../models/item';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../services/item.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  currentUser: User | undefined;

  items: Item[] = [];
  followers: User[] = [];
  following: User[] = [];
  user_lists: { list_name: string; list_items: Item[]; }[] = [];
  userId: string = "";
  showLists: boolean = false;
//  userName: string="";

  constructor(private route: ActivatedRoute, private userService: UserService,
    private itemService: ItemService,
    private location: Location) {}

  /*
  constructor(private autService: AutenticationService) { 
    document.body.style.background = "white";
    this.currentUser = this.autService.currentUser;
  }
  */
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userid') ?? '';
      // Use the user ID to fetch and display the user dashboard data      
    });

    this.getUser(this.userId);
    this.getAllItems();
    this.getFollowers(this.userId);
    this.getFollowing(this.userId);
    this.getUserLists(this.userId);
  }

  getUser(id : String): void {
    this.userService.getUserById(id)
      .subscribe(user => this.currentUser = user);
  } 
 

  getAllItems(): void {
    this.itemService.getAllItems()
      .subscribe(items => this.items = items);
  }


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

  logOut():void{
    this.location.go('frontpage');
    this,this.currentUser = undefined;
    window.location.reload();

  }
}

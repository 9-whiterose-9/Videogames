import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Item } from '../models/item';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list-detail',
  templateUrl: './user-list-detail.component.html',
  styleUrls: ['./user-list-detail.component.css']
})
export class UserListDetailComponent implements OnInit {

  userlist: {
    list_name: string;
    list_items: Item[];
  } | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getUserListDetails();
  }

  getUserListDetails(): void {
    const listName = this.route.snapshot.paramMap.get('list_name');
    const userId = this.route.snapshot.paramMap.get('id');
    console.log("USER LIST DETAIL TS userId=" + userId + " listName="+ listName);
    if(userId && listName){
      this.userService.getUserListDetail(userId, listName).subscribe(userListDetail => {
        this.userlist = userListDetail;
      });
    }
  }
  
  goBack(): void {
    this.location.back();
  }
}

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  usersList : User[] = [];
  user: User | undefined;
  username: String = "";
  password: String = "";
  loginErrorMessage: string = 'Authentication failed. Please try again.';
  loginSucessfulMessage: string = 'Authentication Sucessfull!  Redirecting...';
  loginSucessful: boolean = false;
  loginFailed: boolean = false;

  

  constructor(private userService: UserService, private router: Router, private location: Location){
    this.getUsersList();
  }

  onSubmit(form: NgForm):void{
    console.log("username:"+ this.username + " password:"+ this.password) ;
    console.log("userList0: ", this.usersList);
    this.loginSucessful = false;
    this.loginFailed = false;
    if (form.invalid) {
      return;
    }

    const matchedUser: User | undefined = this.usersList.find(user => user.username === this.username);

        
        console.log("username used: ", this.username);
        console.log("password used: ", this.password);
        console.log("matchedUser: ", matchedUser);
        if (matchedUser) {
          // A user with the matching username was found
          console.log("User found: ", matchedUser);
          if(matchedUser.password === this.password){
            this.loginSucessful = true;
            console.log("Sign in sucessful.")
            this.router.navigate(['dashboard', matchedUser._id]);
          } else {
            console.log("Sign in attempt failed.")
            this.loginFailed = true;
          }
        } else {
          // No user with the matching username was found
          console.log("User not found!");
          this.loginFailed = true;
        }

  }

  getUsersList(): void {
    this.userService.getUsers()
      .subscribe(usersList => this.usersList = usersList); 
  }  

  goBack(): void {
    this.location.back();
  }
  
  
}

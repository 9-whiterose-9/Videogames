import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Observer, Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { NgSwitch, NgSwitchCase } from '@angular/common';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  username: String = "";
  password: String = "";
  isRegistered: Number = 0;
  //padrao que so aceita nomes com 3 ou mais caracteres e que sejam alfanumericos
  userNamePattern="^[a-zA-Z0-9]{3,}$";
  passwordPattern = "^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$";

  isValidFormSubmitted = false;


  constructor(private userService: UserService,
    private location: Location) {

  }


  onSubmit(form: NgForm): void {
    /*tive que usar um objeto observer porque na API do angular diz que a partir da v8, o subscribe ja nao suporta callbacks*/
    // console.log("username:"+ this.username + " password:"+ this.password) ;
    if (form.invalid) {
      return;
   }
   this.isValidFormSubmitted = true;
   const observer: Observer<User> = {
    next: (user: User)=>{
      console.log("entrei aqui");
      console.log(user);
      this.isRegistered=2;
    },
  error:(error: Error) =>{
    if (error) {
      console.log(("user does not exist. Creating a new user"));
      let defaultPic="https://thumbs.dreamstime.com/b/profile-placeholder-image-gray-silhouette-no-photo-123478397.jpg"
      let newUser: User = {_id: "0",username:this.username, password: this.password, items: [], followers:[], following:[], user_lists:[], profile_picture:defaultPic } as User;
      this.userService.addUser(newUser).subscribe(user=>console.log(user.username));
      this.isRegistered=1;
      // console.log(newUser);
    }
    else{
      console.log('An error occurred:', error);
    }
  },
  complete: () => {
    // Optional: Handle completion if necessary
  }}
   this.userService.getUser(this.username).subscribe(observer)}

  goBack(): void {
    this.location.back();
  }

  retry():void{
    this.isRegistered=0;
    // this.location.back();
  }

}




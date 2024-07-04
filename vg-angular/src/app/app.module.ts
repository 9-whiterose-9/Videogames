import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ItemComponent } from './item/item.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { MessagesComponent } from './messages/messages.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { UserListDetailComponent } from './user-list-detail/user-list-detail.component';
import { ItemSearchComponent } from './item-search/item-search.component';


@NgModule({
  declarations: [										
    AppComponent,
    UserDashboardComponent,
    UserProfileComponent,
      ItemComponent,
      ItemDetailComponent,
      FrontpageComponent,
      MessagesComponent,
      SignupComponent,
      SigninComponent,
      UserListDetailComponent,
      ItemSearchComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { SignupComponent } from './signup/signup.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { SigninComponent } from './signin/signin.component';
import { UserListDetailComponent } from './user-list-detail/user-list-detail.component';

const routes: Routes = [
  { path: "", redirectTo: '/frontpage', pathMatch: 'full' },
  { path: 'frontpage', component: FrontpageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component:SigninComponent },
  { path: 'dashboard/:userid', component: UserDashboardComponent },
  { path: "profile/:userid", component: UserProfileComponent },
  { path: "items/:id/detail", component: ItemDetailComponent},
  { path: "profile/:id/mylists/:list_name/detail", component: UserListDetailComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

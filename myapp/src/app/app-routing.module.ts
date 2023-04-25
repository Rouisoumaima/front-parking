import { ParkingComponent } from './Component/parking/parking.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { UserComponent } from './Component/user/user.component';
import { LoginComponent } from './login/login.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { PlaceParkingComponent } from './Component/parking/place-parking/place-parking.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'registration', component: RegistrationFormComponent },
  { path: 'dashboard' , component: DashboardComponent ,
  children : [
    {path:'user',component: UserComponent},
    {path:'parking', component: ParkingComponent},
    {path:'placeparking/:id', component: PlaceParkingComponent},


  ]},


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

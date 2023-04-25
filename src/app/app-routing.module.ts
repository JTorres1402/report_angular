import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { AuthUserGuard } from './guards/auth-user.guard';
import { LogGuard } from './guards/log.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'auth/login', component: LoginComponent, canActivate: [LogGuard]},
  {path: 'auth/register', component: RegisterComponent, canActivate: [LogGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthUserGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

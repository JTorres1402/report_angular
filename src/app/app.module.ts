import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableComponent } from './table/table.component';
import { NavbarDashboardComponent } from './navbar-dashboard/navbar-dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { NavbarUserComponent } from './navbar-user/navbar-user.component';
import { NewUserComponent } from './new-user/new-user.component';
import { EditUserComponent } from './edit-user/edit-user.component'; 

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    NavbarComponent,
    TableComponent,
    NavbarDashboardComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    NavbarUserComponent,
    NewUserComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SweetAlert2Module.forRoot(),
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

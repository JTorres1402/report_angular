import { Component } from '@angular/core';
import { Login, Usuario } from '../models/usuario';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { enviroment } from '../env/env';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  user: Usuario = new Usuario()
  login: any[] | undefined
  messa: any;
  Rol: any;
  id: any;

  constructor(private router: Router, private service: AuthService) { }

  encrypt = (data: string): string => {
    return CryptoJS.AES.encrypt(data,enviroment._key).toString();
  }

  decypt = (data: string | null ): string  => {
    return CryptoJS.AES.decrypt(data!,enviroment._key).toString(CryptoJS.enc.Utf8);
  }

  valite(){
    this.service.login(this.user).subscribe(data =>{
      this.login = Object.values(data);
      this.messa = this.login[4]
      if (this.login[0] == 'OK') {
        sessionStorage.setItem('token', this.login[1]);
        sessionStorage.setItem('id', this.encrypt(this.login[3].toString()))
        this.Rol = this.login[2].toString();
        if (this.Rol == 'admin' || this.Rol== 'policia' || this.Rol == 'bombero' || this.Rol == 'admin' || this.Rol == 'hospital') {
          sessionStorage.setItem('rol', this.encrypt(this.login[2]));
          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesion',
            text: this.messa,
            confirmButtonText: 'Ok',
          }).then((result) => {
            if (result.isConfirmed) { 
              this.router.navigate(['/dashboard']);
            } 
          })
        }else{
          sessionStorage.setItem('rol', this.encrypt(this.login[2]));
          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesion',
            text: this.messa,
            confirmButtonText: 'Ok',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/profile']);
            } 
          })
        }
      }else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: this.login[0],
        })
      }
    })
  }

}

import { Component } from '@angular/core';
import { enviroment } from '../env/env';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  rol!: string | null;

  constructor(){}

  encrypt = (data: string): string => {
    return CryptoJS.AES.encrypt(data,enviroment._key).toString();
  }

  decypt = (data: string | null): string  => {
    return CryptoJS.AES.decrypt(data!,enviroment._key).toString(CryptoJS.enc.Utf8);
  }

  ngOnInit() {
    if (sessionStorage.getItem('rol')) {
      this.rol = this.decypt(sessionStorage.getItem('rol'))
    }
  }

  session(): boolean {
    if (sessionStorage.getItem('token')) {
      return false
    }else{
      return true
    }
  }

  user(): boolean {
    if ( this.rol == 'user') {
      return true
    }else{
      return false
    }
  }

  admin(): boolean {
    if (this.rol == 'admin' || this.rol == 'policia' || this.rol == 'hospital' || this.rol == 'bombero') {
      return true
    }else{
      return false
    }
  }

}
